import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Truck, 
  MapPin, 
  CheckCircle,
  AlertCircle,
  LogOut,
  Route,
  Fuel,
  Target,
  Recycle,
  Clock,
  Wrench
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface WasteCollectionDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const WasteCollectionDashboard = ({ workerId, onLogout }: WasteCollectionDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(72);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Waste Collection" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Waste Collection Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Collection Team</p>
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
                <CardTitle className="text-2xl">Collection Specialist Certification</CardTitle>
                <CardDescription>Complete collection and route optimization training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Level 2 Collector
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">47</div>
                <div className="text-sm text-muted-foreground">Daily Collections</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">89%</div>
                <div className="text-sm text-muted-foreground">Route Efficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">12.5</div>
                <div className="text-sm text-muted-foreground">Avg Hours/Route</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">2.8t</div>
                <div className="text-sm text-muted-foreground">Daily Capacity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="routes">Route Planning</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicle Status</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Today's Target</CardTitle>
                    <Target className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47/50</div>
                  <Progress value={94} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">94% complete</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Segregation Rate</CardTitle>
                    <Recycle className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+3% from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Route Time</CardTitle>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.2h</div>
                  <p className="text-xs text-muted-foreground">-0.8h saved today</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Vehicle Status</CardTitle>
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">Good</div>
                  <p className="text-xs text-muted-foreground">Next maintenance: 5 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Collection Schedule & Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Collection Schedule</CardTitle>
                  <CardDescription>Today's assigned routes and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Sector A - Residential - Completed</p>
                      <p className="text-sm text-muted-foreground">156 households, 2.1t collected</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Sector B - Commercial</p>
                      <p className="text-sm text-muted-foreground">23 shops, in progress</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Sector C - Mixed Zone</p>
                      <p className="text-sm text-muted-foreground">45 units scheduled</p>
                    </div>
                    <Badge variant="secondary">Pending</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Collection Alerts</CardTitle>
                  <CardDescription>Issues requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Non-segregated waste at Building A-12</p>
                      <p className="text-sm text-muted-foreground">Skip collection, issue penalty notice</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Route deviation detected</p>
                      <p className="text-sm text-muted-foreground">Vehicle CT-101 off planned route</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Fuel className="w-5 h-5 text-info mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Fuel level low</p>
                      <p className="text-sm text-muted-foreground">Refuel recommended after current route</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="routes">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Route Planning & Optimization</CardTitle>
                <CardDescription>Manage and optimize collection routes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Route className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive route planning interface would be displayed here</p>
                  <p className="text-sm mt-2">GPS tracking, route optimization, and schedule management</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vehicles">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Vehicle Tracking & Maintenance</CardTitle>
                <CardDescription>Monitor vehicle status and maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Truck className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Vehicle tracking and maintenance dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Real-time GPS, fuel levels, maintenance alerts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Collection Training Modules</CardTitle>
                <CardDescription>Specialized training for waste collection teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Collection Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WasteCollectionDashboard;