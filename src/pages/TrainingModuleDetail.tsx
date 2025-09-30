import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  BookOpen, 
  Clock, 
  Users, 
  Star,
  CheckCircle,
  FileText,
  Award,
  Target
} from 'lucide-react';

interface LearningObjective {
  id: string;
  text: string;
  completed: boolean;
}

interface ModuleContent {
  id: string;
  type: 'video' | 'text' | 'quiz' | 'interactive';
  title: string;
  duration?: number;
  content?: string;
  completed: boolean;
}

interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number;
  progress: number;
  status: string;
  rating: number;
  participants: number;
  instructor: string;
  learningObjectives: LearningObjective[];
  content: ModuleContent[];
  prerequisites: string[];
}

const TrainingModuleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data - replace with real data from API
  const module: TrainingModule = {
    id: id || '1',
    title: 'Safety Protocols in Waste Management',
    description: 'This comprehensive course covers essential safety measures and protocols for waste management operations. Learn how to identify hazards, implement safety procedures, and maintain a safe working environment while handling various types of waste materials.',
    category: 'safety',
    difficulty: 'intermediate',
    duration: 45,
    progress: 65,
    status: 'in-progress',
    rating: 4.9,
    participants: 189,
    instructor: 'Dr. Sarah Chen',
    learningObjectives: [
      {
        id: '1',
        text: 'Identify common workplace hazards in waste management',
        completed: true
      },
      {
        id: '2',
        text: 'Implement proper personal protective equipment (PPE) protocols',
        completed: true
      },
      {
        id: '3',
        text: 'Execute emergency response procedures',
        completed: false
      },
      {
        id: '4',
        text: 'Conduct safety risk assessments',
        completed: false
      }
    ],
    content: [
      {
        id: '1',
        type: 'video',
        title: 'Introduction to Workplace Safety',
        duration: 8,
        completed: true
      },
      {
        id: '2',
        type: 'text',
        title: 'Understanding Waste Categories',
        content: 'Learn about different types of waste and their associated risks...',
        completed: true
      },
      {
        id: '3',
        type: 'video',
        title: 'Personal Protective Equipment',
        duration: 12,
        completed: true
      },
      {
        id: '4',
        type: 'interactive',
        title: 'PPE Selection Exercise',
        duration: 10,
        completed: false
      },
      {
        id: '5',
        type: 'quiz',
        title: 'Safety Knowledge Check',
        duration: 5,
        completed: false
      },
      {
        id: '6',
        type: 'video',
        title: 'Emergency Response Procedures',
        duration: 10,
        completed: false
      }
    ],
    prerequisites: [
      'Basic Waste Management Principles',
      'Workplace Safety Fundamentals'
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      case 'quiz': return <Target className="h-4 w-4" />;
      case 'interactive': return <Award className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const completedContent = module.content.filter(c => c.completed).length;
  const totalContent = module.content.length;
  const completedObjectives = module.learningObjectives.filter(o => o.completed).length;
  const totalObjectives = module.learningObjectives.length;

  const handleStartModule = () => {
    // Logic to start the module
    console.log('Starting module');
  };

  const handleContinueModule = () => {
    // Logic to continue from where left off
    console.log('Continuing module');
  };

  const handleNextContent = () => {
    if (currentContent < module.content.length - 1) {
      setCurrentContent(currentContent + 1);
    }
  };

  const handlePreviousContent = () => {
    if (currentContent > 0) {
      setCurrentContent(currentContent - 1);
    }
  };

  const currentContentItem = module.content[currentContent];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/training')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Training
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                    <Badge variant="outline">{module.category}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{module.title}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-base">
                {module.description}
              </CardDescription>
              
              <div className="flex items-center space-x-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{module.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{module.participants} enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{module.rating}/5</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Video Player / Content Viewer */}
          <Card>
            <CardContent className="p-0">
              <div className="aspect-video bg-muted relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                  {currentContentItem?.type === 'video' ? (
                    <div className="text-center space-y-4">
                      <div className="bg-white/90 rounded-full p-4">
                        {isPlaying ? (
                          <Pause className="h-12 w-12 text-primary" />
                        ) : (
                          <Play className="h-12 w-12 text-primary" />
                        )}
                      </div>
                      <p className="text-lg font-semibold">{currentContentItem.title}</p>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="bg-white/90 rounded-full p-4">
                        {getContentIcon(currentContentItem?.type || 'text')}
                      </div>
                      <p className="text-lg font-semibold">{currentContentItem?.title}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Controls */}
              <div className="p-4 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePreviousContent}
                      disabled={currentContent === 0}
                    >
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleNextContent}
                      disabled={currentContent === module.content.length - 1}
                    >
                      <SkipForward className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    {currentContent + 1} of {module.content.length}
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Module Progress</span>
                    <span>{Math.round((completedContent / totalContent) * 100)}%</span>
                  </div>
                  <Progress value={(completedContent / totalContent) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="content" className="space-y-6">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    Navigate through the course materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {module.content.map((item, index) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted ${
                          index === currentContent ? 'bg-primary/5 border-primary' : ''
                        }`}
                        onClick={() => setCurrentContent(index)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            {item.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                            )}
                            {getContentIcon(item.type)}
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            {item.duration && (
                              <p className="text-sm text-muted-foreground">{item.duration} min</p>
                            )}
                          </div>
                        </div>
                        <Badge variant={item.type === 'quiz' ? 'secondary' : 'outline'}>
                          {item.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="objectives" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Objectives</CardTitle>
                  <CardDescription>
                    Track your progress towards mastering key concepts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>Objectives Completed</span>
                      <span>{completedObjectives}/{totalObjectives}</span>
                    </div>
                    <Progress value={(completedObjectives / totalObjectives) * 100} className="h-2" />
                    
                    <div className="space-y-3">
                      {module.learningObjectives.map((objective) => (
                        <div key={objective.id} className="flex items-start space-x-3">
                          {objective.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <div className="h-5 w-5 rounded-full border-2 border-muted-foreground mt-0.5" />
                          )}
                          <p className={`text-sm ${objective.completed ? 'text-muted-foreground line-through' : ''}`}>
                            {objective.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Notes</CardTitle>
                  <CardDescription>
                    Keep track of important points and insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add your notes here..."
                  />
                  <div className="mt-4">
                    <Button>Save Notes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{module.progress}%</span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
              
              <Separator />
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Content Completed</span>
                  <span>{completedContent}/{totalContent}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Objectives Met</span>
                  <span>{completedObjectives}/{totalObjectives}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {module.progress === 0 ? (
                  <Button onClick={handleStartModule} className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Module
                  </Button>
                ) : module.progress < 100 ? (
                  <Button onClick={handleContinueModule} className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Continue
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Completed
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Instructor Card */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{module.instructor}</p>
                  <p className="text-sm text-muted-foreground">Safety Specialist</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          {module.prerequisites.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {module.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <p className="text-sm">{prereq}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingModuleDetail;