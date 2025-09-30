import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, MapPin, Upload, Send, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhotoReportingProps {
  onBack: () => void;
  userEmail: string;
}

const PhotoReporting = ({ onBack, userEmail }: PhotoReportingProps) => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [wasteType, setWasteType] = useState("");
  const [description, setDescription] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [geoLocation, setGeoLocation] = useState<{lat: number, lng: number} | null>(null);
  const { toast } = useToast();

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          toast({
            title: "Location Captured",
            description: "Your location has been recorded successfully",
          });
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Unable to get your location. Please enable location services.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleTakePhoto = () => {
    // Simulate photo capture
    setPhotoTaken(true);
    toast({
      title: "Photo Captured",
      description: "Waste image has been recorded",
    });
  };

  const handleSubmitReport = () => {
    if (!photoTaken || !geoLocation || !wasteType || !description) {
      toast({
        title: "Incomplete Report",
        description: "Please fill all required fields and capture photo with location",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Report Submitted Successfully",
      description: "Thank you for helping keep our city clean! Your report has been forwarded to authorities.",
    });
    
    setStep(3);
  };

  const handleNewReport = () => {
    setStep(1);
    setLocation("");
    setWasteType("");
    setDescription("");
    setPhotoTaken(false);
    setGeoLocation(null);
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
            <Camera className="w-6 h-6" />
            <div>
              <h1 className="font-semibold">Waste Reporting</h1>
              <p className="text-sm opacity-90">{userEmail}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-2xl">
        {step === 1 && (
          <Card className="bg-gradient-card border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Report Waste Dumping</CardTitle>
              <CardDescription>
                Help keep your community clean by reporting improper waste disposal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Step 1: Capture Location</h3>
                  {geoLocation && <CheckCircle className="w-5 h-5 text-success" />}
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium">Enable GPS Location</p>
                      <p className="text-sm text-muted-foreground">
                        We need your location to report the waste accurately
                      </p>
                    </div>
                    <Button
                      onClick={handleGetLocation}
                      disabled={!!geoLocation}
                      className="bg-gradient-primary hover:opacity-90"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {geoLocation ? "Location Captured" : "Get Location"}
                    </Button>
                  </div>
                  
                  {geoLocation && (
                    <div className="text-sm text-success">
                      <p>✓ Location: {geoLocation.lat.toFixed(6)}, {geoLocation.lng.toFixed(6)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Photo Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Step 2: Take Photo</h3>
                  {photoTaken && <CheckCircle className="w-5 h-5 text-success" />}
                </div>
                
                <div className="p-4 border rounded-lg text-center">
                  {!photoTaken ? (
                    <div className="space-y-4">
                      <div className="w-24 h-24 bg-gradient-primary/20 rounded-full flex items-center justify-center mx-auto">
                        <Camera className="w-12 h-12 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium mb-2">Capture Waste Photo</p>
                        <p className="text-sm text-muted-foreground mb-4">
                          Take a clear photo showing the improper waste disposal
                        </p>
                        <Button
                          onClick={handleTakePhoto}
                          className="bg-gradient-primary hover:opacity-90"
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Take Photo
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Photo Captured</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setPhotoTaken(false)}
                      >
                        Retake Photo
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {geoLocation && photoTaken && (
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  Continue to Details
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="bg-gradient-card border-0 shadow-elevated">
            <CardHeader>
              <CardTitle className="text-2xl">Report Details</CardTitle>
              <CardDescription>
                Provide additional information about the waste issue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location Description</Label>
                <Input
                  id="location"
                  placeholder="e.g., Near Park Main Gate, Behind Shopping Complex"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="wasteType">Type of Waste</Label>
                <Select value={wasteType} onValueChange={setWasteType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed Waste (Not Segregated)</SelectItem>
                    <SelectItem value="plastic">Plastic Waste</SelectItem>
                    <SelectItem value="organic">Organic Waste</SelectItem>
                    <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    <SelectItem value="construction">Construction Debris</SelectItem>
                    <SelectItem value="electronic">Electronic Waste</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the waste issue, approximate quantity, and any additional details..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="p-4 bg-warning/10 rounded-lg">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning-foreground">Important Note</p>
                    <p className="text-sm text-warning-foreground/80">
                      False reporting may result in penalties. Please ensure all information is accurate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitReport}
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="bg-gradient-card border-0 shadow-elevated">
            <CardContent className="text-center py-12">
              <CheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4">Report Submitted Successfully!</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Thank you for your contribution to keeping our community clean. 
                Your report has been forwarded to the relevant authorities for immediate action.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-success/10 rounded-lg">
                  <p className="text-sm font-medium text-success-foreground">
                    Report ID: WR-{Date.now().toString().slice(-8)}
                  </p>
                  <p className="text-sm text-success-foreground/80">
                    You can track the status of your report in your dashboard
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={onBack}
                    className="flex-1"
                  >
                    Back to Dashboard
                  </Button>
                  <Button
                    onClick={handleNewReport}
                    className="flex-1 bg-gradient-primary hover:opacity-90"
                  >
                    Report Another Issue
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PhotoReporting;