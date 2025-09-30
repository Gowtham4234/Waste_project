import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, HardHat, Mail, Lock, Badge } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import WorkerDashboard from "@/components/WorkerDashboard";

interface AuthenticatedWorkerLoginProps {
  onBack: () => void;
}

const AuthenticatedWorkerLogin = ({ onBack }: AuthenticatedWorkerLoginProps) => {
  const { user, signIn, signUp, signOut, createWorkerProfile } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [needsWorkerProfile, setNeedsWorkerProfile] = useState(false);
  const [workerProfile, setWorkerProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    workerId: "",
    department: ""
  });

  useEffect(() => {
    if (user) {
      checkWorkerProfile();
    }
  }, [user]);

  const checkWorkerProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('worker_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error && error.code === 'PGRST116') {
      // No profile found
      setNeedsWorkerProfile(true);
    } else if (data) {
      setWorkerProfile(data);
      setNeedsWorkerProfile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (!error) {
        // User will be redirected automatically due to auth state change
      }
    } else {
      const { error } = await signUp(formData.email, formData.password, {
        fullName: formData.fullName
      });
      if (!error) {
        setIsLogin(true);
      }
    }
  };

  const handleWorkerProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await createWorkerProfile({
      workerId: formData.workerId,
      department: formData.department,
      fullName: formData.fullName || user?.email
    });
    
    if (!error) {
      await checkWorkerProfile(); // Refresh profile data
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      department: value
    }));
  };

  if (user && workerProfile && !needsWorkerProfile) {
    return (
      <WorkerDashboard 
        workerId={workerProfile.worker_id} 
        department={workerProfile.department} 
        onLogout={signOut} 
      />
    );
  }

  if (user && needsWorkerProfile) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-elevated">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <HardHat className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Complete Worker Profile</CardTitle>
            <CardDescription>
              Please complete your worker profile to access the portal
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleWorkerProfileSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workerId">Worker ID</Label>
                <Input
                  id="workerId"
                  name="workerId"
                  type="text"
                  placeholder="Enter your worker ID"
                  value={formData.workerId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={handleSelectChange} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="collection">Waste Collection</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="treatment">Treatment & Processing</SelectItem>
                    <SelectItem value="monitoring">Monitoring & Supervision</SelectItem>
                    <SelectItem value="facility">Facility Management</SelectItem>
                    <SelectItem value="recycling">Recycling Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
                <HardHat className="w-4 h-4 mr-2" />
                Complete Profile
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <Button variant="ghost" onClick={signOut} className="text-sm">
                Sign out and use different account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-elevated">
        <CardHeader className="text-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute top-4 left-4 h-8 w-8 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <HardHat className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl">
            {isLogin ? "Worker Portal Login" : "Create Worker Account"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Enter your credentials to access your professional dashboard"
              : "Register as a waste management worker"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your official email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
              <HardHat className="w-4 h-4 mr-2" />
              {isLogin ? "Login to Worker Portal" : "Create Worker Account"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button 
              variant="ghost" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin 
                ? "Need a worker account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-warning/10 rounded-lg">
            <p className="text-sm text-warning-foreground">
              <strong>Note:</strong> This portal is for authorized waste management personnel only. 
              Contact your supervisor for access credentials.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthenticatedWorkerLogin;