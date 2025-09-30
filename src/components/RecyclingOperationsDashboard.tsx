import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Recycle, 
  LogOut,
  Package,
  DollarSign,
  TrendingUp,
  BarChart3,
  Truck,
  Scale,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import TrainingModule from "./TrainingModule";

interface RecyclingOperationsDashboardProps {
  workerId: string;
  onLogout: () => void;
}

const RecyclingOperationsDashboard = ({ workerId, onLogout }: RecyclingOperationsDashboardProps) => {
  const [showTraining, setShowTraining] = useState(false);
  const [certificationProgress] = useState(83);

  if (showTraining) {
    return <TrainingModule onBack={() => setShowTraining(false)} userEmail={`worker-${workerId}@waste.gov`} department="Recycling Operations" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold">Recycling Operations Portal</h1>
              <p className="text-sm opacity-90">ID: {workerId} | Recycling Specialist</p>
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
                <CardTitle className="text-2xl">Recycling Specialist Certification</CardTitle>
                <CardDescription>Complete recycling operations and material processing training</CardDescription>
              </div>
              <Badge className="bg-gradient-primary text-white">
                Senior Recycler
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={certificationProgress} className="h-3 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">15.2t</div>
                <div className="text-sm text-muted-foreground">Daily Processing</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">₹45,600</div>
                <div className="text-sm text-muted-foreground">Revenue Today</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-info">87%</div>
                <div className="text-sm text-muted-foreground">Recovery Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-warning">6</div>
                <div className="text-sm text-muted-foreground">Active Centers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Material Sorted</CardTitle>
                    <Package className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15.2t</div>
                  <Progress value={76} className="h-2 mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">76% of daily target</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Recovery Rate</CardTitle>
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+3% from last week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹45,600</div>
                  <p className="text-xs text-muted-foreground">Today's earnings</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Collection Points</CardTitle>
                    <Truck className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Active pickup points</p>
                </CardContent>
              </Card>
            </div>

            {/* Operations Status & Material Categories */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Recycling Center Operations</CardTitle>
                  <CardDescription>Real-time operations across recycling facilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Plastic Processing Center - Active</p>
                      <p className="text-sm text-muted-foreground">4.2t processed, PET bottles sorted</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Metal Recovery Unit - Operational</p>
                      <p className="text-sm text-muted-foreground">2.8t metals recovered, aluminum sorted</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Paper Mill Processing</p>
                      <p className="text-sm text-muted-foreground">Maintenance break, resuming in 2 hours</p>
                    </div>
                    <Badge className="bg-warning/10 text-warning">Break</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-elevated">
                <CardHeader>
                  <CardTitle>Material Processing Status</CardTitle>
                  <CardDescription>Today's material sorting and processing breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Plastic: 4.2t processed</p>
                      <Progress value={84} className="h-2 mt-1" />
                      <p className="text-sm text-muted-foreground">PET, HDPE, PP sorted</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                      <Scale className="w-4 h-4 text-success" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Metal: 2.8t recovered</p>
                      <Progress value={70} className="h-2 mt-1" />
                      <p className="text-sm text-muted-foreground">Aluminum, steel, copper</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-info/10 rounded-full flex items-center justify-center">
                      <Recycle className="w-4 h-4 text-info" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Paper: 8.2t processed</p>
                      <Progress value={91} className="h-2 mt-1" />
                      <p className="text-sm text-muted-foreground">Mixed paper, cardboard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="operations">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Material Sorting & Processing</CardTitle>
                <CardDescription>Manage recycling center operations and material processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Material sorting interface would be displayed here</p>
                  <p className="text-sm mt-2">Real-time sorting, quality control, processing metrics</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketplace">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Scrap Market & Revenue Tracking</CardTitle>
                <CardDescription>Monitor market pricing and coordinate scrap collection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Market pricing dashboard would be displayed here</p>
                  <p className="text-sm mt-2">Live pricing, revenue tracking, collection coordination</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Recycling Training Modules</CardTitle>
                <CardDescription>Specialized training for recycling operations teams</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowTraining(true)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Start Recycling Training
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecyclingOperationsDashboard;