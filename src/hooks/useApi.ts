import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { api, ApiResponse } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const QUERY_KEYS = {
  // Profiles
  PROFILE_CURRENT: ['profile', 'current'] as const,
  PROFILE_BY_ID: (id: string) => ['profile', id] as const,
  PROFILES_ALL: (params?: any) => ['profiles', 'all', params] as const,
  
  // Training
  TRAINING_MODULES: (params?: any) => ['training', 'modules', params] as const,
  TRAINING_MODULE: (id: string) => ['training', 'module', id] as const,
  TRAINING_PROGRESS: (moduleId: string) => ['training', 'progress', moduleId] as const,
  TRAINING_PROGRESS_ALL: ['training', 'progress', 'all'] as const,
  
  // Waste Reports
  WASTE_REPORTS: (params?: any) => ['waste-reports', params] as const,
  WASTE_REPORT: (id: string) => ['waste-report', id] as const,
  
  // Analytics
  ANALYTICS_DASHBOARD: (timeRange?: string) => ['analytics', 'dashboard', timeRange] as const,
  ANALYTICS_WASTE: (timeRange?: string) => ['analytics', 'waste', timeRange] as const,
  ANALYTICS_TRAINING: (timeRange?: string) => ['analytics', 'training', timeRange] as const,
  ANALYTICS_PERFORMANCE: ['analytics', 'performance'] as const,
  
  // Health
  HEALTH: ['health'] as const,
} as const;

// Profile Hooks
export const useCurrentProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE_CURRENT,
    queryFn: () => api.profiles.getCurrent(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useProfile = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILE_BY_ID(id),
    queryFn: () => api.profiles.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useProfiles = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.PROFILES_ALL(params),
    queryFn: () => api.profiles.getAll(params),
    select: (response) => response.data,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.profiles.update,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROFILE_CURRENT });
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    },
  });
};

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.profiles.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: "Profile Created",
        description: "New profile has been successfully created.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create profile.",
        variant: "destructive",
      });
    },
  });
};

// Training Hooks
export const useTrainingModules = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.TRAINING_MODULES(params),
    queryFn: () => api.training.getModules(params),
    select: (response) => response.data,
  });
};

export const useTrainingModule = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.TRAINING_MODULE(id),
    queryFn: () => api.training.getModule(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useTrainingProgress = (moduleId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.TRAINING_PROGRESS(moduleId),
    queryFn: () => api.training.getProgress(moduleId),
    select: (response) => response.data,
    enabled: !!moduleId,
  });
};

export const useAllTrainingProgress = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TRAINING_PROGRESS_ALL,
    queryFn: () => api.training.getAllProgress(),
    select: (response) => response.data,
  });
};

export const useUpdateTrainingProgress = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ moduleId, progress }: { moduleId: string; progress: any }) => 
      api.training.updateProgress(moduleId, progress),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.TRAINING_PROGRESS(variables.moduleId) 
      });
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.TRAINING_PROGRESS_ALL 
      });
      toast({
        title: "Progress Updated",
        description: "Your training progress has been saved.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update progress.",
        variant: "destructive",
      });
    },
  });
};

// Waste Reports Hooks
export const useWasteReports = (params?: any) => {
  return useQuery({
    queryKey: QUERY_KEYS.WASTE_REPORTS(params),
    queryFn: () => api.wasteReports.getAll(params),
    select: (response) => response.data,
  });
};

export const useWasteReport = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.WASTE_REPORT(id),
    queryFn: () => api.wasteReports.getById(id),
    select: (response) => response.data,
    enabled: !!id,
  });
};

export const useCreateWasteReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.wasteReports.create,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['waste-reports'] });
      toast({
        title: "Report Created",
        description: "Your waste report has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to create report.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateWasteReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      api.wasteReports.update(id, data),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.WASTE_REPORT(variables.id) 
      });
      queryClient.invalidateQueries({ queryKey: ['waste-reports'] });
      toast({
        title: "Report Updated",
        description: "The waste report has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update report.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteWasteReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.wasteReports.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waste-reports'] });
      toast({
        title: "Report Deleted",
        description: "The waste report has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Deletion Failed",
        description: error.message || "Failed to delete report.",
        variant: "destructive",
      });
    },
  });
};

export const useApproveWasteReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes?: string }) => 
      api.wasteReports.approve(id, notes),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.WASTE_REPORT(variables.id) 
      });
      queryClient.invalidateQueries({ queryKey: ['waste-reports'] });
      toast({
        title: "Report Approved",
        description: "The waste report has been approved.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve report.",
        variant: "destructive",
      });
    },
  });
};

export const useRejectWasteReport = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => 
      api.wasteReports.reject(id, reason),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ 
        queryKey: QUERY_KEYS.WASTE_REPORT(variables.id) 
      });
      queryClient.invalidateQueries({ queryKey: ['waste-reports'] });
      toast({
        title: "Report Rejected",
        description: "The waste report has been rejected.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Rejection Failed",
        description: error.message || "Failed to reject report.",
        variant: "destructive",
      });
    },
  });
};

// Analytics Hooks
export const useDashboardStats = (timeRange?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_DASHBOARD(timeRange),
    queryFn: () => api.analytics.getDashboardStats(timeRange),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useWasteAnalytics = (timeRange?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_WASTE(timeRange),
    queryFn: () => api.analytics.getWasteData(timeRange),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useTrainingAnalytics = (timeRange?: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_TRAINING(timeRange),
    queryFn: () => api.analytics.getTrainingData(timeRange),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePerformanceAnalytics = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ANALYTICS_PERFORMANCE,
    queryFn: () => api.analytics.getPerformanceData(),
    select: (response) => response.data,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

// File Upload Hooks
export const useFileUpload = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ file, type }: { file: File; type: 'waste-report' | 'profile' }) =>
      api.upload.uploadFile(file, type),
    onSuccess: (response) => {
      toast({
        title: "File Uploaded",
        description: "Your file has been uploaded successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    },
  });
};

// Health Check Hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: QUERY_KEYS.HEALTH,
    queryFn: () => api.health(),
    select: (response) => response.data,
    refetchInterval: 1000 * 60, // 1 minute
    retry: false,
  });
};

// Generic mutation hook for any API call
export const useApiMutation = <TData = any, TError = any, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<TData>>,
  options?: UseMutationOptions<ApiResponse<TData>, TError, TVariables>
) => {
  const { toast } = useToast();

  return useMutation({
    mutationFn,
    onError: (error: any) => {
      toast({
        title: "Operation Failed",
        description: error.message || "An error occurred.",
        variant: "destructive",
      });
    },
    ...options,
  });
};

// Generic query hook for any API call
export const useApiQuery = <TData = any, TError = any>(
  queryKey: any[],
  queryFn: () => Promise<ApiResponse<TData>>,
  options?: UseQueryOptions<ApiResponse<TData>, TError, TData>
) => {
  return useQuery({
    queryKey,
    queryFn,
    select: (response) => response.data,
    ...options,
  });
};