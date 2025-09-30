import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Factory, 
  LogOut,
  Gauge,
  Zap,
  Recycle,
  BarChart3,
  Settings,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface TreatmentProcessingDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const TreatmentProcessingDashboard = ({ workerId, onLogout }: TreatmentProcessingDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(85);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Treatment & Processing" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Treatment & Processing Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Processing Facility</p>
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
                <CardTitle className="text-2xl">Processing Specialist Certification</CardTitle>
                <CardDescription>Complete facility operations and quality control training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Senior Processor
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">24.8t</div>
                <div className="text-sm text-muted-foreground">Daily Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">1,250</div>
                <div className="text-sm text-muted-foreground">kWh Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">92%</div>
                <div className="text-sm text-muted-foreground">Equipment Efficiency</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">99.1%</div>
                <div className="text-sm text-muted-foreground">Quality Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="processing">Processing Status</TabsTrigger>
            <TabsTrigger value="equipment">Equipment Monitor</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Processing Capacity</CardTitle>
                    <Gauge className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82%</div>
                  <Progress value={82} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">24.8t of 30t capacity</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Energy Generation</CardTitle>
                    <Zap className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,250</div>
                  <p className="text-xs text-muted-foreground">kWh generated today</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Biogas Production</CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">890</div>
                  <p className="text-xs text-muted-foreground">m³ biogas produced</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Compost Output</CardTitle>
                    <Recycle className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2t</div>
                  <p className="text-xs text-muted-foreground">High-quality compost</p>
                </CardContent>
              </Card>
            </div>

            {/* Processing Status & Equipment */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Processing Facility Status</CardTitle>
                  <CardDescription>Real-time facility operations monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Biomethanization Plant</p>
                      <p className="text-sm text-muted-foreground">Running at 85% capacity, optimal temperature</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Waste-to-Energy Plant</p>
                      <p className="text-sm text-muted-foreground">1,250 kWh generated, efficiency 92%</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Composting Unit 3</p>
                      <p className="text-sm text-muted-foreground">Temperature monitoring required</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning">Attention</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Quality Control Metrics</CardTitle>
                  <CardDescription>Processing quality and compliance monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Compost Quality Grade A</p>
                      <p className="text-sm text-muted-foreground">pH: 7.2, Moisture: 35%, C:N ratio: 25:1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Energy Efficiency: 92%</p>
                      <p className="text-sm text-muted-foreground">Above target of 85%, excellent performance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Processing Efficiency: 87%</p>
                      <p className="text-sm text-muted-foreground">24.8t processed of 28.5t input</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="processing">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Processing Facility Monitoring</CardTitle>
                <CardDescription>Monitor waste processing volumes and facility operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Factory className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Real-time processing facility dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Live processing metrics, quality control, output monitoring</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="equipment">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Equipment Operation Status</CardTitle>
                <CardDescription>Monitor equipment performance and maintenance schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Equipment monitoring dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Equipment status, maintenance alerts, performance analytics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Processing Training Modules</CardTitle>
                <CardDescription>Specialized training for processing facility operations</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Processing Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TreatmentProcessingDashboard;