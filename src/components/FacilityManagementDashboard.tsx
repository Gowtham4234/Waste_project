import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building, 
  LogOut,
  Settings,
  Wrench,
  Calendar,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Users
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface FacilityManagementDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const FacilityManagementDashboard = ({ workerId, onLogout }: FacilityManagementDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(76);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Facility Management" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Facility Management Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Infrastructure Manager</p>
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
                <CardTitle className="text-2xl">Facility Manager Certification</CardTitle>
                <CardDescription>Complete infrastructure and maintenance management training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Facility Manager
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-sm text-muted-foreground">Active Facilities</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">89%</div>
                <div className="text-sm text-muted-foreground">Utilization Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">15</div>
                <div className="text-sm text-muted-foreground">Maintenance Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">98%</div>
                <div className="text-sm text-muted-foreground">Safety Compliance</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="utilization">Utilization</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Facility Status</CardTitle>
                    <Building className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/14</div>
                  <p className="text-xs text-muted-foreground">2 under maintenance</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Maintenance Due</CardTitle>
                    <Wrench className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Safety Incidents</CardTitle>
                    <ShieldCheck className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">0</div>
                  <p className="text-xs text-muted-foreground">45 days incident-free</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Resource Allocation</CardTitle>
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground">Optimal utilization</p>
                </CardContent>
              </Card>
            </div>

            {/* Facility Status & Maintenance Schedule */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Infrastructure Status</CardTitle>
                  <CardDescription>Real-time facility monitoring and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Processing Plant A - Operational</p>
                      <p className="text-sm text-muted-foreground">85% capacity, all systems normal</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Recycling Center B - Maintenance</p>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance, back online tomorrow</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning">Maintenance</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Compost Facility - Active</p>
                      <p className="text-sm text-muted-foreground">Processing 12t/day, quality grade A</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Maintenance Schedule</CardTitle>
                  <CardDescription>Upcoming and ongoing maintenance activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-destructive/10 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Critical: Conveyor Belt Repair</p>
                      <p className="text-sm text-muted-foreground">Processing Plant A, scheduled for tonight</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-warning" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Routine: Equipment Inspection</p>
                      <p className="text-sm text-muted-foreground">Recycling Center C, scheduled this week</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                      <Settings className="w-4 h-4 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Preventive: System Upgrade</p>
                      <p className="text-sm text-muted-foreground">Biomethanization plant, next month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Maintenance Management</CardTitle>
                <CardDescription>Infrastructure maintenance schedules and repair tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Wrench className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Maintenance management interface would be displayed here</p>
                  <p className="text-sm mt-2">Work orders, maintenance schedules, equipment tracking</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="utilization">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Facility Utilization Statistics</CardTitle>
                <CardDescription>Monitor facility usage and resource allocation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Utilization analytics dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Capacity planning, resource optimization, performance metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Facility Management Training Modules</CardTitle>
                <CardDescription>Specialized training for facility management teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Facility Management Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FacilityManagementDashboard;