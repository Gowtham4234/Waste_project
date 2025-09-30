import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  FileText, 
  Plus, 
  Search,
  Filter,
  Calendar,
  MapPin,
  Weight,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload
} from 'lucide-react';

interface WasteReport {
  id: string;
  title: string;
  type: 'organic' | 'plastic' | 'metal' | 'hazardous' | 'electronic' | 'glass';
  status: 'pending' | 'approved' | 'rejected' | 'in-review';
  location: string;
  amount: number;
  unit: 'kg' | 'tons';
  date: string;
  submittedBy: string;
  description: string;
  images?: string[];
}

const WasteReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');

  // Mock data - replace with real data from API
  const reports: WasteReport[] = [
    {
      id: '1',
      title: 'Organic Waste Collection - Zone A',
      type: 'organic',
      status: 'approved',
      location: 'Industrial Zone A, Section 3',
      amount: 450,
      unit: 'kg',
      date: '2024-01-15',
      submittedBy: 'John Smith',
      description: 'Weekly organic waste collection from cafeteria and food processing areas.',
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200']
    },
    {
      id: '2',
      title: 'Plastic Recycling Report',
      type: 'plastic',
      status: 'pending',
      location: 'Manufacturing Building B',
      amount: 280,
      unit: 'kg',
      date: '2024-01-14',
      submittedBy: 'Sarah Johnson',
      description: 'Collected plastic waste from packaging and manufacturing processes.',
      images: ['/api/placeholder/300/200']
    },
    {
      id: '3',
      title: 'Hazardous Waste Disposal',
      type: 'hazardous',
      status: 'in-review',
      location: 'Chemical Storage Facility',
      amount: 125,
      unit: 'kg',
      date: '2024-01-13',
      submittedBy: 'Mike Chen',
      description: 'Disposal of expired chemicals and contaminated materials.',
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200', '/api/placeholder/300/200']
    },
    {
      id: '4',
      title: 'Electronic Waste Collection',
      type: 'electronic',
      status: 'approved',
      location: 'IT Department',
      amount: 75,
      unit: 'kg',
      date: '2024-01-12',
      submittedBy: 'Lisa Wang',
      description: 'Old computers, monitors, and electronic components disposal.',
      images: ['/api/placeholder/300/200']
    },
    {
      id: '5',
      title: 'Metal Scrap Recovery',
      type: 'metal',
      status: 'rejected',
      location: 'Workshop Area',
      amount: 320,
      unit: 'kg',
      date: '2024-01-11',
      submittedBy: 'David Brown',
      description: 'Metal scraps from manufacturing and maintenance activities.',
      images: []
    },
    {
      id: '6',
      title: 'Glass Waste Segregation',
      type: 'glass',
      status: 'pending',
      location: 'Laboratory Complex',
      amount: 95,
      unit: 'kg',
      date: '2024-01-10',
      submittedBy: 'Emma Davis',
      description: 'Laboratory glassware and broken glass materials.',
      images: ['/api/placeholder/300/200', '/api/placeholder/300/200']
    }
  ];

  const wasteTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'organic', label: 'Organic' },
    { value: 'plastic', label: 'Plastic' },
    { value: 'metal', label: 'Metal' },
    { value: 'hazardous', label: 'Hazardous' },
    { value: 'electronic', label: 'Electronic' },
    { value: 'glass', label: 'Glass' }
  ];

  const statusTypes = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'in-review', label: 'In Review' }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || report.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Sort reports
  const sortedReports = [...filteredReports].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'in-review': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'organic': return 'bg-green-100 text-green-800';
      case 'plastic': return 'bg-blue-100 text-blue-800';
      case 'metal': return 'bg-gray-100 text-gray-800';
      case 'hazardous': return 'bg-red-100 text-red-800';
      case 'electronic': return 'bg-purple-100 text-purple-800';
      case 'glass': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    // Return appropriate icon based on status
    return <FileText className="h-4 w-4" />;
  };

  const handleViewReport = (reportId: string) => {
    navigate(`/reports/${reportId}`);
  };

  const handleEditReport = (reportId: string) => {
    navigate(`/reports/edit/${reportId}`);
  };

  const handleDeleteReport = (reportId: string) => {
    // Implement delete functionality
    console.log('Deleting report:', reportId);
  };

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    approvedReports: reports.filter(r => r.status === 'approved').length,
    totalWaste: reports.reduce((sum, r) => sum + r.amount, 0)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waste Reports</h1>
          <p className="text-muted-foreground">
            Track and manage all waste collection and disposal reports
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {}}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => navigate('/reports/create')}>
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">All time reports</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedReports}</div>
            <p className="text-xs text-muted-foreground">Successfully processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Waste</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWaste} kg</div>
            <p className="text-xs text-muted-foreground">Processed this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Waste Type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusTypes.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
                <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
                <SelectItem value="title-asc">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedType('all');
              setSelectedStatus('all');
              setSortBy('date-desc');
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="grid gap-4">
        {sortedReports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground text-center mb-4">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={() => navigate('/reports/create')}>
                <Plus className="mr-2 h-4 w-4" />
                Create First Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          sortedReports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Badge variant="secondary" className={getTypeColor(report.type)}>
                        {report.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <CardDescription>{report.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewReport(report.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditReport(report.id)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteReport(report.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(report.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{report.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Weight className="h-4 w-4 text-muted-foreground" />
                    <span>{report.amount} {report.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span>By {report.submittedBy}</span>
                  </div>
                </div>

                {report.images && report.images.length > 0 && (
                  <div className="mt-4 flex space-x-2">
                    {report.images.slice(0, 3).map((image, index) => (
                      <div
                        key={index}
                        className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center"
                      >
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    ))}
                    {report.images.length > 3 && (
                      <div className="h-16 w-16 bg-muted rounded-lg flex items-center justify-center text-sm text-muted-foreground">
                        +{report.images.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WasteReports;