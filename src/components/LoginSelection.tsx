import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, HardHat, UserCheck, ShieldCheck } from "lucide-react";
import AuthenticatedPublicLogin from "@/components/AuthenticatedPublicLogin";
import AuthenticatedWorkerLogin from "@/components/AuthenticatedWorkerLogin";

interface LoginSelectionProps {
  onBack: () => void;
}

const LoginSelection = ({ onBack }: LoginSelectionProps) => {
  const [selectedLogin, setSelectedLogin] = useState<'public' | 'worker' | null>(null);

  if (selectedLogin === 'public') {
    return <AuthenticatedPublicLogin onBack={() => setSelectedLogin(null)} />;
  }

  if (selectedLogin === 'worker') {
    return <AuthenticatedWorkerLogin onBack={() => setSelectedLogin(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="absolute top-6 left-6 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            <UserCheck className="w-4 h-4 mr-2" />
            Choose Your Portal
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Select Login Type
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Choose the appropriate portal based on your role in the waste management system
          </p>
        </div>

        {/* Login Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Public User Portal */}
          <Card 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-elevated hover:shadow-glow transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedLogin('public')}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Public Citizen Portal</CardTitle>
              <CardDescription className="text-lg">
                For citizens participating in waste management training and reporting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Mandatory training modules
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Geo-tagged waste reporting
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Community participation tracking
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Home composting guidance
                </div>
              </div>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                <Users className="w-4 h-4 mr-2" />
                Enter Public Portal
              </Button>
            </CardContent>
          </Card>

          {/* Worker Portal */}
          <Card 
            className="bg-white/95 backdrop-blur-sm border-0 shadow-elevated hover:shadow-glow transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setSelectedLogin('worker')}
          >
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <HardHat className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl">Worker Portal</CardTitle>
              <CardDescription className="text-lg">
                For waste management workers and supervisors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Phase-wise training certification
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Green Champions monitoring
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Route and facility management
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  Penalty and incentive tracking
                </div>
              </div>
              <Button className="w-full bg-gradient-primary hover:opacity-90 text-white">
                <HardHat className="w-4 h-4 mr-2" />
                Enter Worker Portal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-white/60">
            Need help? Contact your local ULB administrator or waste management coordinator
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection;