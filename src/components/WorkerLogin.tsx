import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, HardHat, Mail, Lock, Badge } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WorkerDashboard from "@/components/WorkerDashboard";

interface WorkerLoginProps {
  onBack: () => void;
}

const WorkerLogin = ({ onBack }: WorkerLoginProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [department, setDepartment] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password && workerId && department) {
      toast({
        title: "Login Successful",
        description: "Welcome to the Worker Portal",
      });
      setIsLoggedIn(true);
    } else {
      toast({
        title: "Login Failed",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
    }
  };

  if (isLoggedIn) {
    return <WorkerDashboard workerId={workerId} department={department} onLogout={() => setIsLoggedIn(false)} />;
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
          
          <CardTitle className="text-2xl">Worker Portal Login</CardTitle>
          <CardDescription>
            Enter your credentials to access your professional dashboard
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workerId">Worker ID</Label>
              <Input
                id="workerId"
                type="text"
                placeholder="Enter your worker ID"
                value={workerId}
                onChange={(e) => setWorkerId(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={department} onValueChange={setDepartment} required>
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
            
            <div className="space-y-2">
              <Label htmlFor="email">Official Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your official email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90">
              <HardHat className="w-4 h-4 mr-2" />
              Login to Worker Portal
            </Button>
          </form>
          
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

export default WorkerLogin;