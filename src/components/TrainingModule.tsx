import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Play, CheckCircle, Clock, BookOpen, Award, Recycle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainingModuleProps {
  onBack: () => void;
  userEmail: string;
  department?: string;
}

const TrainingModule = ({ onBack, userEmail, department = "General" }: TrainingModuleProps) => {
  const [currentModule, setCurrentModule] = useState(4);
  const [isWatchingVideo, setIsWatchingVideo] = useState(true);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const { toast } = useToast();

  const modules = [
    { id: 1, title: "Introduction to Waste Management", duration: "15 min", completed: true },
    { id: 2, title: "Types of Waste & Classification", duration: "20 min", completed: true },
    { id: 3, title: "Plastic Waste Segregation", duration: "18 min", completed: true },
    { id: 4, title: "Organic Waste Composting", duration: "25 min", completed: false, current: true },
    { id: 5, title: "Hazardous Waste Handling", duration: "22 min", completed: false },
    { id: 6, title: "Community Participation", duration: "16 min", completed: false },
    { id: 7, title: "Final Assessment", duration: "30 min", completed: false },
  ];

  const handleVideoComplete = () => {
    setVideoCompleted(true);
    toast({
      title: "Video Completed",
      description: "You can now proceed to the assessment",
    });
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Assessment Started",
      description: "Answer all questions to complete this module",
    });
  };

  const handleStartPuzzle = () => {
    setShowPuzzle(true);
    toast({
      title: "Puzzle Started",
      description: "Complete the waste segregation puzzle to finish this module",
    });
  };

  const handleCompletePuzzle = () => {
    toast({
      title: "Puzzle Completed!",
      description: "You've successfully completed the segregation puzzle",
    });
    onBack();
  };

  const handleCompleteModule = () => {
    toast({
      title: "Module Completed!",
      description: "You've successfully completed Organic Waste Composting",
    });
    onBack();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center space-x-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h1 className="font-semibold">{department} Training Module</h1>
              <p className="text-sm opacity-90">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Module List */}
          <div className="md:col-span-1">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <CardTitle>Training Modules</CardTitle>
                <CardDescription>Complete all modules for certification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className={`p-3 rounded-lg border ${
                      module.current 
                        ? 'bg-primary/10 border-primary' 
                        : module.completed 
                        ? 'bg-success/10 border-success/30' 
                        : 'bg-muted/30 border-border'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className={`font-medium ${
                          module.current ? 'text-primary' : module.completed ? 'text-success' : 'text-muted-foreground'
                        }`}>
                          Module {module.id}
                        </p>
                        <p className="text-sm text-muted-foreground">{module.title}</p>
                        <p className="text-xs text-muted-foreground">{module.duration}</p>
                      </div>
                      {module.completed && <CheckCircle className="w-5 h-5 text-success" />}
                      {module.current && <Clock className="w-5 h-5 text-primary" />}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <Card className="bg-gradient-card border-0 shadow-elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">Module 4: Organic Waste Composting</CardTitle>
                    <CardDescription>Learn how to create nutrient-rich compost from kitchen waste</CardDescription>
                  </div>
                  <Badge className="bg-gradient-primary text-white">
                    Required
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isWatchingVideo && !quizStarted && (
                  <>
                    <div className="aspect-video bg-gradient-primary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Training Video</h3>
                        <p className="text-muted-foreground mb-4">Duration: 25 minutes</p>
                        <Button 
                          className="bg-gradient-primary hover:opacity-90"
                          onClick={() => "https://www.youtube.com/watch?v=0ZiD_Lb3Tm0"}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start Video
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/30 rounded-lg">
                        <h4 className="font-semibold mb-2">What you'll learn:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Types of organic waste suitable for composting</li>
                          <li>• Step-by-step composting process</li>
                          <li>• Proper maintenance techniques</li>
                          <li>• Troubleshooting common issues</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-info/10 rounded-lg">
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Watch the complete video</li>
                          <li>• Pass the assessment (80% minimum)</li>
                          <li>• Submit practical demonstration</li>
                        </ul>
                      </div>
                    </div>
                  </>
                )}

                {isWatchingVideo && !videoCompleted && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <video autoPlay controls loop width="600">
                             <source src="video.mp4" type="video/mp4" height="1000" />
                                  Your browser does not support the video tag.
                            </video>

                        <p className="text-sm opacity-75">Composting techniques demonstration</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <Progress value={75} className="h-2" />
                      </div>
                      <Button 
                        onClick={handleVideoComplete}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        Mark as Watched
                      </Button>
                    </div>
                  </div>
                )}

                {videoCompleted && !quizStarted && !showPuzzle && (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-success mx-auto" />
                    <h3 className="text-xl font-semibold">Video Completed!</h3>
                    <p className="text-muted-foreground">Choose how to complete this module</p>
                    <div className="flex gap-4 justify-center">
                      <Button 
                        onClick={handleStartQuiz}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        <Award className="w-4 h-4 mr-2" />
                        Start Assessment
                      </Button>
                      <Button 
                        onClick={handleStartPuzzle}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                      >
                        <BookOpen className="w-4 h-4 mr-2" />
                        Try Puzzle Instead
                      </Button>
                    </div>
                  </div>
                )}

                {quizStarted && !showPuzzle && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">{department} Assessment</h3>
                      <p className="text-muted-foreground">Answer all questions correctly to complete this module</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-3">
                          {department === "Waste Collection" && "Question 1: What should you do when encountering non-segregated waste?"}
                          {department === "Transportation" && "Question 1: What is the maximum payload capacity for waste transport vehicles?"}
                          {department === "Treatment & Processing" && "Question 1: What is the ideal carbon to nitrogen ratio for composting?"}
                          {department === "Monitoring & Supervision" && "Question 1: How often should compliance checks be conducted?"}
                          {department === "Facility Management" && "Question 1: What is the recommended frequency for equipment maintenance?"}
                          {department === "Recycling Operations" && "Question 1: Which plastic type has the highest recycling value?"}
                          {department === "General" && "Question 1: What is the ideal carbon to nitrogen ratio for composting?"}
                        </h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="q1" value="a" />
                            <span>
                              {department === "Waste Collection" && "Skip collection and issue penalty notice"}
                              {department === "Transportation" && "5 tons"}
                              {department === "Treatment & Processing" && "20:1"}
                              {department === "Monitoring & Supervision" && "Daily"}
                              {department === "Facility Management" && "Monthly"}
                              {department === "Recycling Operations" && "PET (Type 1)"}
                              {department === "General" && "20:1"}
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="q1" value="b" />
                            <span>
                              {department === "Waste Collection" && "Collect anyway and sort later"}
                              {department === "Transportation" && "8 tons"}
                              {department === "Treatment & Processing" && "30:1"}
                              {department === "Monitoring & Supervision" && "Weekly"}
                              {department === "Facility Management" && "Quarterly"}
                              {department === "Recycling Operations" && "HDPE (Type 2)"}
                              {department === "General" && "30:1"}
                            </span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="radio" name="q1" value="c" />
                            <span>
                              {department === "Waste Collection" && "Report to supervisor"}
                              {department === "Transportation" && "10 tons"}
                              {department === "Treatment & Processing" && "40:1"}
                              {department === "Monitoring & Supervision" && "Monthly"}
                              {department === "Facility Management" && "Annually"}
                              {department === "Recycling Operations" && "PP (Type 5)"}
                              {department === "General" && "40:1"}
                            </span>
                          </label>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleCompleteModule}
                        className="w-full bg-gradient-primary hover:opacity-90"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete Assessment
                      </Button>
                    </div>
                  </div>
                )}

                {showPuzzle && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">Waste Segregation Puzzle</h3>
                      <p className="text-muted-foreground">Drag items to the correct waste bins to complete this module</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 border-2 border-success rounded-lg text-center">
                        <div className="w-16 h-16 bg-success/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Recycle className="w-8 h-8 text-success" />
                        </div>
                        <h4 className="font-semibold text-success">Organic Waste</h4>
                        <p className="text-sm text-muted-foreground">Food scraps, garden waste</p>
                      </div>
                      
                      <div className="p-4 border-2 border-info rounded-lg text-center">
                        <div className="w-16 h-16 bg-info/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <Recycle className="w-8 h-8 text-info" />
                        </div>
                        <h4 className="font-semibold text-info">Recyclable</h4>
                        <p className="text-sm text-muted-foreground">Plastic, paper, metal</p>
                      </div>
                      
                      <div className="p-4 border-2 border-warning rounded-lg text-center">
                        <div className="w-16 h-16 bg-warning/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <AlertTriangle className="w-8 h-8 text-warning" />
                        </div>
                        <h4 className="font-semibold text-warning">Hazardous</h4>
                        <p className="text-sm text-muted-foreground">Batteries, chemicals</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                      {["🍎 Apple Core", "📰 Newspaper", "🔋 Battery", "🥤 Plastic Bottle", "🍌 Banana Peel", "📄 Paper", "🧴 Detergent", "♻️ Can"].map((item, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-muted/30 text-center cursor-move hover:bg-muted/50 transition-colors">
                          {item}
                        </div>
                      ))}
                    </div>
                    
                    <Button 
                      onClick={handleCompletePuzzle}
                      className="w-full bg-gradient-primary hover:opacity-90"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Puzzle
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;