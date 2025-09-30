import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Search,
  Filter,
  Play,
  CheckCircle,
  Lock
} from 'lucide-react';

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'recycling' | 'equipment' | 'protocols';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  progress: number; // percentage
  status: 'not-started' | 'in-progress' | 'completed' | 'locked';
  rating: number;
  participants: number;
  thumbnail: string;
}

const TrainingModules: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock data - replace with real data from API
  const modules: TrainingModule[] = [
    {
      id: '1',
      title: 'Waste Segregation Fundamentals',
      description: 'Learn the basics of proper waste segregation and classification techniques.',
      category: 'recycling',
      difficulty: 'beginner',
      duration: 30,
      progress: 100,
      status: 'completed',
      rating: 4.8,
      participants: 245,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '2',
      title: 'Safety Protocols in Waste Management',
      description: 'Essential safety measures and protocols for waste management operations.',
      category: 'safety',
      difficulty: 'intermediate',
      duration: 45,
      progress: 65,
      status: 'in-progress',
      rating: 4.9,
      participants: 189,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '3',
      title: 'Equipment Operation & Maintenance',
      description: 'Comprehensive guide to operating and maintaining waste processing equipment.',
      category: 'equipment',
      difficulty: 'advanced',
      duration: 60,
      progress: 0,
      status: 'not-started',
      rating: 4.7,
      participants: 156,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '4',
      title: 'Environmental Impact Assessment',
      description: 'Understanding and measuring environmental impacts of waste management.',
      category: 'protocols',
      difficulty: 'intermediate',
      duration: 40,
      progress: 30,
      status: 'in-progress',
      rating: 4.6,
      participants: 132,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '5',
      title: 'Advanced Recycling Technologies',
      description: 'Explore cutting-edge recycling technologies and their applications.',
      category: 'recycling',
      difficulty: 'advanced',
      duration: 75,
      progress: 0,
      status: 'locked',
      rating: 4.9,
      participants: 89,
      thumbnail: '/api/placeholder/300/200'
    },
    {
      id: '6',
      title: 'Hazardous Waste Handling',
      description: 'Specialized training for safe handling of hazardous materials.',
      category: 'safety',
      difficulty: 'advanced',
      duration: 90,
      progress: 0,
      status: 'not-started',
      rating: 4.8,
      participants: 67,
      thumbnail: '/api/placeholder/300/200'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Modules', count: modules.length },
    { id: 'safety', label: 'Safety', count: modules.filter(m => m.category === 'safety').length },
    { id: 'recycling', label: 'Recycling', count: modules.filter(m => m.category === 'recycling').length },
    { id: 'equipment', label: 'Equipment', count: modules.filter(m => m.category === 'equipment').length },
    { id: 'protocols', label: 'Protocols', count: modules.filter(m => m.category === 'protocols').length }
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string, progress: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Play className="h-5 w-5 text-blue-500" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleModuleClick = (module: TrainingModule) => {
    if (module.status !== 'locked') {
      navigate(`/training/${module.id}`);
    }
  };

  const inProgressModules = modules.filter(m => m.status === 'in-progress');
  const completedModules = modules.filter(m => m.status === 'completed');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Training Modules</h1>
          <p className="text-muted-foreground">
            Enhance your skills with our comprehensive training programs
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search training modules..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by:</span>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-1">
              <span>{category.label}</span>
              <Badge variant="secondary" className="text-xs">
                {category.count}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-6">
          {/* Progress Overview */}
          {(inProgressModules.length > 0 || completedModules.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>
                  Continue learning with modules currently in progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Modules Completed</span>
                      <span>{completedModules.length}/{modules.length}</span>
                    </div>
                    <Progress value={(completedModules.length / modules.length) * 100} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>In Progress</span>
                      <span>{inProgressModules.length}</span>
                    </div>
                    <div className="flex space-x-1">
                      {inProgressModules.slice(0, 3).map((module) => (
                        <Button
                          key={module.id}
                          variant="outline"
                          size="sm"
                          onClick={() => handleModuleClick(module)}
                          className="flex-1 truncate"
                        >
                          Continue
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Modules Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <Card 
                key={module.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  module.status === 'locked' ? 'opacity-60' : ''
                }`}
                onClick={() => handleModuleClick(module)}
              >
                <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/60" />
                  </div>
                  <div className="absolute top-4 left-4">
                    {getStatusIcon(module.status, module.progress)}
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg line-clamp-2">
                      {module.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{module.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{module.participants}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{module.rating}</span>
                    </div>
                  </div>
                  
                  {module.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button 
                    className="w-full" 
                    variant={module.status === 'completed' ? 'outline' : 'default'}
                    disabled={module.status === 'locked'}
                  >
                    {module.status === 'completed' && <CheckCircle className="mr-2 h-4 w-4" />}
                    {module.status === 'in-progress' && <Play className="mr-2 h-4 w-4" />}
                    {module.status === 'not-started' && <BookOpen className="mr-2 h-4 w-4" />}
                    {module.status === 'locked' && <Lock className="mr-2 h-4 w-4" />}
                    
                    {module.status === 'completed' && 'Review'}
                    {module.status === 'in-progress' && 'Continue'}
                    {module.status === 'not-started' && 'Start'}
                    {module.status === 'locked' && 'Locked'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredModules.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No modules found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search terms or category filter
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TrainingModules;