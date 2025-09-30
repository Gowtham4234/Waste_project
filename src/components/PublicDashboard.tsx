import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Camera, 
  Award, 
  MapPin, 
  Play, 
  CheckCircle,
  LogOut,
  User,
  Recycle,
  Home,
  AlertTriangle
} from "lucide-react";
import TrainingModule from "@/components/TrainingModule";
import PhotoReporting from "@/components/PhotoReporting";

interface PublicDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

const PublicDashboard = ({ userEmail, onLogout }: PublicDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [trainingProgress] = useState(45); // Mock progress

  if (activeTab === "training") {
    return <TrainingModule onBack={() => setActiveTab("overview")} userEmail={userEmail} />;
  }

  if (activeTab === "reporting") {
    return <PhotoReporting onBack={() => setActiveTab("overview")} userEmail={userEmail} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Citizen Portal</h1>
              <p className="text-sm opacity-90">{userEmail}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-6xl">
        {/* Progress Overview */}
        <Card className="mb-6 bg-gradient-card border-0 shadow-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Training Progress</CardTitle>
                <CardDescription>Complete all modules to earn your certification</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                {trainingProgress}% Complete
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={trainingProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">3/7</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">12</div>
                <div className="text-sm text-muted-foreground">Reports Submitted</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">45</div>
                <div className="text-sm text-muted-foreground">Community Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">Bronze</div>
                <div className="text-sm text-muted-foreground">Current Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={() => setActiveTab("training")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Continue Training</CardTitle>
              <CardDescription>
                Resume your mandatory waste management training
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Play className="w-4 h-4 mr-2" />
                Start Module 4
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300 cursor-pointer"
            onClick={() => setActiveTab("reporting")}
          >
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Report Waste</CardTitle>
              <CardDescription>
                Take geo-tagged photos of improper waste disposal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-elevated hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <Home className="w-6 h-6 text-white" />
              </div>
              <CardTitle>Home Composting</CardTitle>
              <CardDescription>
                Learn to make compost from your kitchen waste
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                <Recycle className="w-4 h-4 mr-2" />
                Start Guide
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="bg-gradient-card border-0 shadow-elevated">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-success/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Completed Module 3: Plastic Waste Segregation</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-info/20 rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-info" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Submitted waste report at Park Street</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-warning/20 rounded-full flex items-center justify-center">
                  <Award className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Earned 10 community points</p>
                  <p className="text-sm text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicDashboard;