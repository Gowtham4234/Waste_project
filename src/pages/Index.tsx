import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Recycle, 
  Users, 
  MapPin, 
  BookOpen, 
  Camera, 
  Award,
  Leaf,
  Shield,
  Target,
  UserCheck,
  HardHat
} from "lucide-react";
import LoginSelection from "@/components/LoginSelection";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginSelection onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onGetStarted={() => setShowLogin(true)} />
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-primary text-white">
              <Leaf className="w-4 h-4 mr-2" />
              Comprehensive Solution
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Waste Management Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From mandatory citizen training to worker certification, our platform ensures 
              proper waste management at every step of the process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Mandatory Training</CardTitle>
                <CardDescription>
                  Comprehensive waste management education for all citizens with video-based modules and assessments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Geo-Tagged Reporting</CardTitle>
                <CardDescription>
                  Report waste dumping with location-tagged photos for immediate action and monitoring
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <HardHat className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Worker Certification</CardTitle>
                <CardDescription>
                  Phase-wise training modules for waste management workers with progress tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Green Champions</CardTitle>
                <CardDescription>
                  Area committee formation for decentralized monitoring and community leadership
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Incentive System</CardTitle>
                <CardDescription>
                  Reward-based approach for proper waste segregation and management compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle>Digital Monitoring</CardTitle>
                <CardDescription>
                  Complete app-based tracking system for waste collection, treatment, and disposal
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Citizen Coverage</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Monitoring System</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Zero</div>
              <div className="text-muted-foreground">Waste Tolerance</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;