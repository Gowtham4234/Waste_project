import { supabase } from '@/integrations/supabase/client';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

// Types
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface WasteReport {
  id: string;
  title: string;
  type: 'organic' | 'plastic' | 'metal' | 'hazardous' | 'electronic' | 'glass';
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  location: string;
  amount: number;
  unit: 'kg' | 'tons';
  date: string;
  submitted_by: string;
  description: string;
  images?: string[];
  created_at: string;
  updated_at: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'recycling' | 'equipment' | 'protocols';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  content: any[];
  learning_objectives: any[];
  prerequisites: string[];
  created_at: string;
  updated_at: string;
}

export interface TrainingProgress {
  id: string;
  user_id: string;
  training_module_id: string;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  started_at?: string;
  completed_at?: string;
}

export interface WorkerProfile {
  id: string;
  user_id: string;
  worker_id: string;
  email: string;
  full_name: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'on-leave';
  join_date: string;
  location: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Utility function to make authenticated requests
const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(session?.access_token && {
        'Authorization': `Bearer ${session.access_token}`
      }),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    return { 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
};

// Health check
export const healthCheck = async (): Promise<ApiResponse<{ status: string }>> => {
  return makeRequest('/health');
};

// Profile API
export const profileApi = {
  getCurrent: async (): Promise<ApiResponse<WorkerProfile>> => {
    return makeRequest('/profiles/me');
  },

  update: async (data: Partial<WorkerProfile>): Promise<ApiResponse<WorkerProfile>> => {
    return makeRequest('/profiles/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  getById: async (id: string): Promise<ApiResponse<WorkerProfile>> => {
    return makeRequest(`/profiles/${id}`);
  },

  getAll: async (params?: { 
    department?: string; 
    status?: string; 
    page?: number; 
    limit?: number; 
  }): Promise<ApiResponse<{ profiles: WorkerProfile[]; total: number }>> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return makeRequest(`/profiles${queryString ? `?${queryString}` : ''}`);
  },

  create: async (data: Omit<WorkerProfile, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<WorkerProfile>> => {
    return makeRequest('/profiles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return makeRequest(`/profiles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Training Modules API
export const trainingApi = {
  getModules: async (params?: {
    category?: string;
    difficulty?: string;
    page?: number;
    limit?: number;
  }): Promise<ApiResponse<{ modules: TrainingModule[]; total: number }>> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return makeRequest(`/training-modules${queryString ? `?${queryString}` : ''}`);
  },

  getModule: async (id: string): Promise<ApiResponse<TrainingModule>> => {
    return makeRequest(`/training-modules/${id}`);
  },

  getProgress: async (moduleId: string): Promise<ApiResponse<TrainingProgress>> => {
    return makeRequest(`/training-progress/${moduleId}`);
  },

  updateProgress: async (
    moduleId: string, 
    progress: Partial<TrainingProgress>
  ): Promise<ApiResponse<TrainingProgress>> => {
    return makeRequest(`/training-progress/${moduleId}`, {
      method: 'PUT',
      body: JSON.stringify(progress),
    });
  },

  getAllProgress: async (): Promise<ApiResponse<TrainingProgress[]>> => {
    return makeRequest('/training-progress');
  },
};

// Waste Reports API
export const wasteReportsApi = {
  getAll: async (params?: {
    type?: string;
    status?: string;
    page?: number;
    limit?: number;
    sort_by?: string;
    sort_order?: 'asc' | 'desc';
  }): Promise<ApiResponse<{ reports: WasteReport[]; total: number }>> => {
    const queryString = params ? new URLSearchParams(params as any).toString() : '';
    return makeRequest(`/waste-reports${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id: string): Promise<ApiResponse<WasteReport>> => {
    return makeRequest(`/waste-reports/${id}`);
  },

  create: async (data: Omit<WasteReport, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<WasteReport>> => {
    return makeRequest('/waste-reports', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: string, data: Partial<WasteReport>): Promise<ApiResponse<WasteReport>> => {
    return makeRequest(`/waste-reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return makeRequest(`/waste-reports/${id}`, {
      method: 'DELETE',
    });
  },

  approve: async (id: string, notes?: string): Promise<ApiResponse<WasteReport>> => {
    return makeRequest(`/waste-reports/${id}/approve`, {
      method: 'POST',
      body: JSON.stringify({ notes }),
    });
  },

  reject: async (id: string, reason: string): Promise<ApiResponse<WasteReport>> => {
    return makeRequest(`/waste-reports/${id}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },
};

// Analytics API
export const analyticsApi = {
  getDashboardStats: async (timeRange?: string): Promise<ApiResponse<{
    total_waste: number;
    recycling_rate: number;
    active_workers: number;
    completed_trainings: number;
    pending_reports: number;
  }>> => {
    const params = timeRange ? `?time_range=${timeRange}` : '';
    return makeRequest(`/analytics/dashboard${params}`);
  },

  getWasteData: async (timeRange?: string): Promise<ApiResponse<any[]>> => {
    const params = timeRange ? `?time_range=${timeRange}` : '';
    return makeRequest(`/analytics/waste${params}`);
  },

  getTrainingData: async (timeRange?: string): Promise<ApiResponse<any[]>> => {
    const params = timeRange ? `?time_range=${timeRange}` : '';
    return makeRequest(`/analytics/training${params}`);
  },

  getPerformanceData: async (): Promise<ApiResponse<any[]>> => {
    return makeRequest('/analytics/performance');
  },
};

// File Upload API
export const uploadApi = {
  uploadFile: async (file: File, type: 'waste-report' | 'profile'): Promise<ApiResponse<{ url: string; key: string }>> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          }),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  },

  deleteFile: async (key: string): Promise<ApiResponse<void>> => {
    return makeRequest(`/upload/${key}`, {
      method: 'DELETE',
    });
  },
};

// Export all APIs
export const api = {
  health: healthCheck,
  profiles: profileApi,
  training: trainingApi,
  wasteReports: wasteReportsApi,
  analytics: analyticsApi,
  upload: uploadApi,
};