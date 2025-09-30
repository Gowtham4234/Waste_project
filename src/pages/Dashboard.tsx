import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock data - replace with real data from API
  const stats = {
    totalReports: 245,
    pendingReports: 12,
    completedTraining: 85,
    activeWorkers: 42,
    wasteProcessed: 2450,
    recyclingRate: 78
  };

  const recentReports = [
    {
      id: 1,
      title: 'Organic Waste Collection - Zone A',
      status: 'completed',
      date: '2024-01-15',
      amount: '450 kg'
    },
    {
      id: 2,
      title: 'Plastic Recycling Report',
      status: 'pending',
      date: '2024-01-14',
      amount: '280 kg'
    },
    {
      id: 3,
      title: 'Hazardous Waste Disposal',
      status: 'in-progress',
      date: '2024-01-13',
      amount: '125 kg'
    }
  ];

  const trainingProgress = [
    {
      id: 1,
      title: 'Waste Segregation Basics',
      progress: 100,
      status: 'completed'
    },
    {
      id: 2,
      title: 'Safety Protocols',
      progress: 65,
      status: 'in-progress'
    },
    {
      id: 3,
      title: 'Equipment Handling',
      progress: 30,
      status: 'in-progress'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">In Progress</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your green initiatives.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/reports/create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline" onClick={() => navigate('/training')}>
            <BookOpen className="mr-2 h-4 w-4" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingReports} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedTraining}%</div>
            <p className="text-xs text-muted-foreground">
              Average completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Workers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeWorkers}</div>
            <p className="text-xs text-muted-foreground">
              Currently engaged
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recyclingRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Reports */}
        <Card className="col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>
                  Latest waste management reports and their status
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
                <Eye className="mr-2 h-4 w-4" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {report.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {report.date} • {report.amount}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(report.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Training Progress */}
        <Card className="col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>
                  Your learning journey and skill development
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/training')}>
                <BookOpen className="mr-2 h-4 w-4" />
                Continue
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trainingProgress.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{course.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={course.progress} className="flex-1" />
                    {course.status === 'completed' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions to streamline your workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => navigate('/reports/create')}>
              <FileText className="h-6 w-6" />
              <span>Submit Report</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => navigate('/training')}>
              <BookOpen className="h-6 w-6" />
              <span>View Training</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => navigate('/workers')}>
              <Users className="h-6 w-6" />
              <span>Manage Workers</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2" onClick={() => navigate('/analytics')}>
              <TrendingUp className="h-6 w-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
