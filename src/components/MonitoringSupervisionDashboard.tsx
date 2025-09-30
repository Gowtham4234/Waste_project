import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  LogOut,
  Users,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  CheckCircle,
  XCircle,
  DollarSign,
  Award
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface MonitoringSupervisionDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const MonitoringSupervisionDashboard = ({ workerId, onLogout }: MonitoringSupervisionDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(91);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Monitoring & Supervision" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Monitoring & Supervision Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Green Champion Coordinator</p>
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
                <CardTitle className="text-2xl">Supervision Specialist Certification</CardTitle>
                <CardDescription>Complete monitoring and compliance management training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Lead Supervisor
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">48</div>
                <div className="text-sm text-muted-foreground">Green Champions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">156</div>
                <div className="text-sm text-muted-foreground">Compliance Checks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">₹12,500</div>
                <div className="text-sm text-muted-foreground">Penalties Issued</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">94%</div>
                <div className="text-sm text-muted-foreground">Compliance Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="champions">Green Champions</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Active Areas</CardTitle>
                    <Shield className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Under supervision</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Violations Today</CardTitle>
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">-3 from yesterday</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Incentives Issued</CardTitle>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹8,500</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Performance Score</CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">+2% this week</p>
                </CardContent>
              </Card>
            </div>

            {/* Monitoring Activities & Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Today's Monitoring Activities</CardTitle>
                  <CardDescription>Real-time monitoring and supervision tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Area Committee Meeting - Completed</p>
                      <p className="text-sm text-muted-foreground">Sector 15, 12 Green Champions attended</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-info rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Compliance Inspection</p>
                      <p className="text-sm text-muted-foreground">Commercial Complex B-12, in progress</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Training Session</p>
                      <p className="text-sm text-muted-foreground">New Green Champion orientation</p>
                    </div>
                    <Badge variant="secondary">Scheduled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Compliance Alerts</CardTitle>
                  <CardDescription>Violations and compliance issues requiring action</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Multiple violations at Apartment Complex</p>
                      <p className="text-sm text-muted-foreground">Building A-15, penalty issued ₹2,500</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Green Champion absence</p>
                      <p className="text-sm text-muted-foreground">Sector 8 uncovered for 2 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Award className="w-5 h-5 text-success mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium">Excellent compliance achievement</p>
                      <p className="text-sm text-muted-foreground">Building C-20 qualifies for incentive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="champions">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Green Champions Coordination</CardTitle>
                <CardDescription>Manage and coordinate Green Champions across all areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Green Champions management interface would be displayed here</p>
                  <p className="text-sm mt-2">Training coordination, performance tracking, area assignments</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Compliance Violation Tracking</CardTitle>
                <CardDescription>Monitor violations, penalties, and incentive management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Compliance tracking dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Violation analytics, penalty management, incentive distribution</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Supervision Training Modules</CardTitle>
                <CardDescription>Specialized training for monitoring and supervision teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Supervision Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MonitoringSupervisionDashboard;