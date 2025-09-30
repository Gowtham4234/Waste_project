import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Recycle, Leaf, Users, Target, UserCheck, BookOpen, Camera } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-white/20"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-white/10"></div>
        <div className="absolute bottom-32 left-40 w-40 h-40 rounded-full bg-white/15"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-white/20"></div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 text-center relative z-10">
        <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
          <Leaf className="w-4 h-4 mr-2" />
          National Waste Management Initiative
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Transform India's
          <br />
          <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
            Waste Management
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
          Mandatory training for every citizen, professional certification for workers, 
          and a complete digital ecosystem for sustainable waste management across India.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 shadow-elevated text-lg px-8 py-6"
            onClick={onGetStarted}
          >
            <UserCheck className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6"
          >
            <Target className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </div>

        {/* Key Features Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-white/80">Training</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-white/80">Reporting</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-white/80">Community</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3">
              <Recycle className="w-8 h-8 text-white" />
            </div>
            <span className="text-sm text-white/80">Monitoring</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;