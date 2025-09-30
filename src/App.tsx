import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import TrainingModules from "./pages/TrainingModules";
import TrainingModuleDetail from "./pages/TrainingModuleDetail";
import WasteReports from "./pages/WasteReports";
import CreateWasteReport from "./pages/CreateWasteReport";
import WorkerManagement from "./pages/WorkerManagement";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import MainLayout from "./components/Layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            
            {/* Protected Routes with MainLayout */}
            <Route path="/dashboard" element={<ProtectedRoute><MainLayout><Dashboard /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            
            {/* Training Module Routes */}
            <Route path="/training" element={<ProtectedRoute><MainLayout><TrainingModules /></MainLayout></ProtectedRoute>} />
            <Route path="/training/:id" element={<ProtectedRoute><MainLayout><TrainingModuleDetail /></MainLayout></ProtectedRoute>} />
            
            {/* Waste Report Routes */}
            <Route path="/reports" element={<ProtectedRoute><MainLayout><WasteReports /></MainLayout></ProtectedRoute>} />
            <Route path="/reports/create" element={<ProtectedRoute><MainLayout><CreateWasteReport /></MainLayout></ProtectedRoute>} />
            
            {/* Worker Management */}
            <Route path="/workers" element={<ProtectedRoute><MainLayout><WorkerManagement /></MainLayout></ProtectedRoute>} />
            
            {/* Analytics */}
            <Route path="/analytics" element={<ProtectedRoute><MainLayout><Analytics /></MainLayout></ProtectedRoute>} />
            
            {/* Settings */}
            <Route path="/settings" element={<ProtectedRoute><MainLayout><Settings /></MainLayout></ProtectedRoute>} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
