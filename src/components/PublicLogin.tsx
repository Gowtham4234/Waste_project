import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Mail, Lock, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PublicDashboard from "@/components/PublicDashboard";

interface PublicLoginProps {
  onBack: () => void;
}

const PublicLogin = ({ onBack }: PublicLoginProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Simulate login
      if (email && password) {
        toast({
          title: "Login Successful",
          description: "Welcome to the Public Citizen Portal",
        });
        setIsLoggedIn(true);
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter valid credentials",
          variant: "destructive",
        });
      }
    } else {
      // Simulate registration
      if (email && password && name && phone) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created. You can now login.",
        });
        setIsLogin(true);
        setName("");
        setPhone("");
      } else {
        toast({
          title: "Registration Failed",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
      }
    }
  };

  if (isLoggedIn) {
    return <PublicDashboard userEmail={email} onLogout={() => setIsLoggedIn(false)} />;
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
            <Users className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-2xl">
            {isLogin ? "Public Login" : "Register as Citizen"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Enter your credentials to access your training dashboard" 
              : "Create your account to start mandatory waste management training"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
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
              {isLogin ? (
                <>
                  <Mail className="w-4 h-4 mr-2" />
                  Login
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Register
                </>
              )}
            </Button>
          </form>
          
          <div className="text-center mt-6">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary"
            >
              {isLogin 
                ? "Don't have an account? Register here" 
                : "Already have an account? Login here"
              }
            </Button>
          </div>
          
          {!isLogin && (
            <div className="mt-4 p-4 bg-info/10 rounded-lg">
              <p className="text-sm text-info-foreground">
                <strong>Note:</strong> Waste management training is mandatory for all citizens. 
                Register to complete your certification.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicLogin;