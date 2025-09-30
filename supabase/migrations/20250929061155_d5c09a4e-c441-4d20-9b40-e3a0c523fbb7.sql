-- Active: 1723381904495@@127.0.0.1@3306@waste
-- Create user roles enum
CREATE TYPE public.user_role AS ENUM ('admin', 'public_user', 'worker', 'supervisor');

-- Create department enum for workers
CREATE TYPE public.department_type AS ENUM (
  'collection', 
  'transportation', 
  'treatment', 
  'monitoring', 
  'facility', 
  'recycling'
);

-- Create training status enum
CREATE TYPE public.training_status AS ENUM ('not_started', 'in_progress', 'completed', 'expired');

-- Create public user profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  pincode TEXT,
  training_status training_status DEFAULT 'not_started',
  training_completed_at TIMESTAMPTZ,
  role user_role DEFAULT 'public_user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create worker profiles table
CREATE TABLE public.worker_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  worker_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  department department_type NOT NULL,
  supervisor_id UUID REFERENCES public.worker_profiles(id),
  certification_level INTEGER DEFAULT 1,
  role user_role DEFAULT 'worker',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- Create waste reports table
CREATE TABLE public.waste_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  address TEXT,
  image_url TEXT,
  status TEXT DEFAULT 'pending',
  assigned_worker_id UUID REFERENCES public.worker_profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create training modules table
CREATE TABLE public.training_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content_url TEXT,
  duration_minutes INTEGER DEFAULT 30,
  order_index INTEGER DEFAULT 0,
  is_mandatory BOOLEAN DEFAULT true,
  target_role user_role DEFAULT 'public_user',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create user training progress table
CREATE TABLE public.user_training_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.training_modules(id) ON DELETE CASCADE,
  status training_status DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  score INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, module_id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.worker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waste_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_training_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user_profiles
CREATE POLICY "Users can view their own profile" 
ON public.user_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.user_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for worker_profiles
CREATE POLICY "Workers can view their own profile" 
ON public.worker_profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Workers can view other workers in same department" 
ON public.worker_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.worker_profiles wp 
    WHERE wp.user_id = auth.uid() 
    AND wp.department = worker_profiles.department
  )
);

CREATE POLICY "Workers can create their own profile" 
ON public.worker_profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Workers can update their own profile" 
ON public.worker_profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for waste_reports
CREATE POLICY "Users can view their own reports" 
ON public.waste_reports 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Workers can view reports assigned to them" 
ON public.waste_reports 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.worker_profiles wp 
    WHERE wp.user_id = auth.uid() 
    AND wp.id = waste_reports.assigned_worker_id
  )
);

CREATE POLICY "Users can create waste reports" 
ON public.waste_reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports" 
ON public.waste_reports 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for training_modules
CREATE POLICY "Anyone can view training modules" 
ON public.training_modules 
FOR SELECT 
USING (true);

-- Create RLS policies for user_training_progress
CREATE POLICY "Users can view their own training progress" 
ON public.user_training_progress 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own training progress" 
ON public.user_training_progress 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own training progress" 
ON public.user_training_progress 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create a basic user profile for new users
  INSERT INTO public.user_profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to all tables
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_worker_profiles_updated_at
  BEFORE UPDATE ON public.worker_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_waste_reports_updated_at
  BEFORE UPDATE ON public.waste_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_training_modules_updated_at
  BEFORE UPDATE ON public.training_modules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_training_progress_updated_at
  BEFORE UPDATE ON public.user_training_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some default training modules
INSERT INTO public.training_modules (title, description, content_url, target_role, order_index) VALUES
('Waste Segregation Basics', 'Learn the fundamentals of proper waste segregation', '/training/waste-segregation', 'public_user', 1),
('Home Composting Guide', 'Complete guide to setting up home composting', '/training/home-composting', 'public_user', 2),
('Recycling Best Practices', 'Understanding recyclable materials and processes', '/training/recycling', 'public_user', 3),
('Collection Protocols', 'Standard operating procedures for waste collection', '/training/collection-protocols', 'worker', 1),
('Safety Procedures', 'Safety guidelines for waste management workers', '/training/safety-procedures', 'worker', 2),
('Equipment Maintenance', 'Proper maintenance of waste collection equipment', '/training/equipment-maintenance', 'worker', 3);