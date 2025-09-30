import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown,
  BarChart3, 
  PieChart as PieChartIcon,
  Download,
  Calendar,
  Recycle,
  Users,
  Target,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Award
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('waste');

  // Mock data - replace with real data from API
  const monthlyWasteData = [
    { month: 'Jan', organic: 450, plastic: 280, metal: 320, electronic: 75, glass: 95 },
    { month: 'Feb', organic: 520, plastic: 310, metal: 290, electronic: 85, glass: 110 },
    { month: 'Mar', organic: 480, plastic: 340, metal: 350, electronic: 95, glass: 125 },
    { month: 'Apr', organic: 600, plastic: 380, metal: 310, electronic: 120, glass: 140 },
    { month: 'May', organic: 580, plastic: 420, metal: 380, electronic: 110, glass: 160 },
    { month: 'Jun', organic: 650, plastic: 460, metal: 420, electronic: 140, glass: 180 }
  ];

  const wasteComposition = [
    { name: 'Organic', value: 3280, color: '#22c55e' },
    { name: 'Plastic', value: 2190, color: '#3b82f6' },
    { name: 'Metal', value: 2070, color: '#6b7280' },
    { name: 'Electronic', value: 625, color: '#8b5cf6' },
    { name: 'Glass', value: 810, color: '#06b6d4' }
  ];

  const trainingProgress = [
    { month: 'Jan', completed: 85, enrolled: 120 },
    { month: 'Feb', completed: 92, enrolled: 125 },
    { month: 'Mar', completed: 78, enrolled: 110 },
    { month: 'Apr', completed: 95, enrolled: 130 },
    { month: 'May', completed: 88, enrolled: 115 },
    { month: 'Jun', completed: 102, enrolled: 140 }
  ];

  const recyclingRates = [
    { date: '2024-01-01', rate: 72 },
    { date: '2024-01-08', rate: 75 },
    { date: '2024-01-15', rate: 78 },
    { date: '2024-01-22', rate: 74 },
    { date: '2024-01-29', rate: 80 },
    { date: '2024-02-05', rate: 82 },
    { date: '2024-02-12', rate: 79 },
    { date: '2024-02-19', rate: 85 },
    { date: '2024-02-26', rate: 83 },
    { date: '2024-03-05', rate: 87 }
  ];

  const kpiData: Array<{
    title: string;
    value: string;
    unit: string;
    change: string;
    trend: 'up' | 'down';
    description: string;
  }> = [
    {
      title: 'Total Waste Processed',
      value: '8.9',
      unit: 'tons',
      change: '+12.5%',
      trend: 'up' as const,
      description: 'vs last month'
    },
    {
      title: 'Recycling Rate',
      value: '87',
      unit: '%',
      change: '+3.2%',
      trend: 'up' as const,
      description: 'average this month'
    },
    {
      title: 'Training Completion',
      value: '92',
      unit: '%',
      change: '-2.1%',
      trend: 'down' as const,
      description: 'completion rate'
    },
    {
      title: 'Cost per Ton',
      value: '$245',
      unit: '',
      change: '-8.3%',
      trend: 'up' as const,
      description: 'operational cost'
    }
  ];

  const departmentPerformance = [
    { department: 'Collection', efficiency: 94, reports: 45, training: 88 },
    { department: 'Processing', efficiency: 87, reports: 32, training: 92 },
    { department: 'Transportation', efficiency: 91, reports: 28, training: 85 },
    { department: 'Recycling', efficiency: 89, reports: 38, training: 90 },
    { department: 'Safety', efficiency: 96, reports: 22, training: 95 }
  ];

  const formatValue = (value: number) => {
    return value.toLocaleString();
  };

  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend: 'up' | 'down', isPositive: boolean) => {
    const isGood = (trend === 'up' && isPositive) || (trend === 'down' && !isPositive);
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and performance metrics for your waste management operations
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              {getTrendIcon(kpi.trend)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value}{kpi.unit}
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className={getTrendColor(kpi.trend, kpi.title !== 'Cost per Ton')}>
                  {kpi.change}
                </span>
                <span className="text-muted-foreground">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="waste" className="space-y-6">
        <TabsList>
          <TabsTrigger value="waste">Waste Analytics</TabsTrigger>
          <TabsTrigger value="training">Training Metrics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="waste" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Monthly Waste Collection */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Waste Collection</CardTitle>
                <CardDescription>
                  Waste collected by type over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyWasteData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="organic" fill="#22c55e" name="Organic" />
                    <Bar dataKey="plastic" fill="#3b82f6" name="Plastic" />
                    <Bar dataKey="metal" fill="#6b7280" name="Metal" />
                    <Bar dataKey="electronic" fill="#8b5cf6" name="Electronic" />
                    <Bar dataKey="glass" fill="#06b6d4" name="Glass" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Waste Composition */}
            <Card>
              <CardHeader>
                <CardTitle>Waste Composition</CardTitle>
                <CardDescription>
                  Distribution of waste types (kg)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={wasteComposition}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {wasteComposition.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recycling Rate Trend */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recycling Rate Trend</CardTitle>
                <CardDescription>
                  Weekly recycling efficiency percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={recyclingRates}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    />
                    <YAxis domain={[60, 100]} />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      formatter={(value) => [`${value}%`, 'Recycling Rate']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="#22c55e" 
                      fill="#22c55e" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Training Completion Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>
                  Monthly training completion vs enrollment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trainingProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="enrolled" 
                      stroke="#6b7280" 
                      name="Enrolled"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#22c55e" 
                      name="Completed"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Training Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Training Categories</CardTitle>
                <CardDescription>
                  Completion rates by training type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: 'Safety Protocols', completed: 95, total: 100, color: 'bg-green-500' },
                    { category: 'Waste Segregation', completed: 87, total: 95, color: 'bg-blue-500' },
                    { category: 'Equipment Operation', completed: 72, total: 85, color: 'bg-yellow-500' },
                    { category: 'Emergency Response', completed: 68, total: 90, color: 'bg-red-500' },
                    { category: 'Environmental Impact', completed: 82, total: 88, color: 'bg-purple-500' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.category}</span>
                        <span>{item.completed}/{item.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${item.color}`}
                          style={{ width: `${(item.completed / item.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>
                Key metrics by department
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Department</th>
                      <th className="text-left p-4 font-medium">Efficiency</th>
                      <th className="text-left p-4 font-medium">Reports</th>
                      <th className="text-left p-4 font-medium">Training</th>
                      <th className="text-left p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departmentPerformance.map((dept, index) => (
                      <tr key={index} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-medium">{dept.department}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium">{dept.efficiency}%</div>
                            {dept.efficiency >= 90 ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : dept.efficiency >= 80 ? (
                              <Activity className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-4">{dept.reports}</td>
                        <td className="p-4">{dept.training}%</td>
                        <td className="p-4">
                          <Badge className={
                            dept.efficiency >= 90 ? 'bg-green-100 text-green-800' :
                            dept.efficiency >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {dept.efficiency >= 90 ? 'Excellent' :
                             dept.efficiency >= 80 ? 'Good' : 'Needs Improvement'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Key Insights */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performing Dept.</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Safety</div>
                <p className="text-xs text-muted-foreground">
                  96% efficiency rating
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Active</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Collection</div>
                <p className="text-xs text-muted-foreground">
                  45 reports this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Training Leader</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Safety</div>
                <p className="text-xs text-muted-foreground">
                  95% completion rate
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;