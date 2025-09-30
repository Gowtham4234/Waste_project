import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  MapPin, 
  LogOut,
  Route,
  Fuel,
  Users,
  BarChart3,
  Navigation,
  Clock,
  Gauge
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface TransportationDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const TransportationDashboard = ({ workerId, onLogout }: TransportationDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(68);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Transportation" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Transportation Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Fleet Management</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-6xl">
        {/* Certification Progress */}
        <Card className="mb-6 bg-gradient-card border-0 shadow-elevated">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Transportation Specialist Certification</CardTitle>
                <CardDescription>Complete fleet management and logistics training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Fleet Coordinator
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Active Vehicles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">2,340</div>
                <div className="text-sm text-muted-foreground">KM Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">12.5L</div>
                <div className="text-sm text-muted-foreground">Fuel/100KM</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">98%</div>
                <div className="text-sm text-muted-foreground">Route Efficiency</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Tracking</TabsTrigger>
            <TabsTrigger value="routes">Route Optimization</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Fleet Status</CardTitle>
                    <Truck className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15/18</div>
                  <p className="text-xs text-muted-foreground">3 in maintenance</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
                    <Fuel className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.5L</div>
                  <p className="text-xs text-muted-foreground">-2.1L improvement</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Driver Schedule</CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28/32</div>
                  <p className="text-xs text-muted-foreground">4 drivers on leave</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Route Efficiency</CardTitle>
                    <Gauge className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98%</div>
                  <p className="text-xs text-muted-foreground">+3% this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Fleet Status & Schedule */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Vehicle Fleet Status</CardTitle>
                  <CardDescription>Real-time vehicle tracking and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">CT-101 - Route A</p>
                      <p className="text-sm text-muted-foreground">Driver: Ram Kumar, Location: Sector 15</p>
                    </div>
                    <Badge className="bg-success/10 text-success">Active</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">CT-102 - Route B</p>
                      <p className="text-sm text-muted-foreground">Driver: Suresh Singh, En-route to facility</p>
                    </div>
                    <Badge className="bg-info/10 text-info">Returning</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">CT-103 - Maintenance</p>
                      <p className="text-sm text-muted-foreground">Scheduled service, available tomorrow</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning">Maintenance</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Driver Assignments</CardTitle>
                  <CardDescription>Today's driver schedule and assignments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Morning Shift (6 AM - 2 PM)</p>
                      <p className="text-sm text-muted-foreground">12 drivers assigned, 2 standby</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Afternoon Shift (2 PM - 10 PM)</p>
                      <p className="text-sm text-muted-foreground">8 drivers assigned, 1 standby</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                      <Navigation className="w-4 h-4 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Emergency Response Team</p>
                      <p className="text-sm text-muted-foreground">4 drivers on-call, 2 active</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fleet">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Fleet Management & Vehicle Tracking</CardTitle>
                <CardDescription>Real-time GPS tracking and fleet monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive fleet tracking map would be displayed here</p>
                  <p className="text-sm mt-2">Real-time GPS, vehicle status, maintenance alerts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Route Optimization Tools</CardTitle>
                <CardDescription>Optimize transportation routes for maximum efficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Route className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Route optimization interface would be displayed here</p>
                  <p className="text-sm mt-2">AI-powered route planning, traffic analysis, fuel optimization</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Transportation Training Modules</CardTitle>
                <CardDescription>Specialized training for transportation teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Transportation Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TransportationDashboard;