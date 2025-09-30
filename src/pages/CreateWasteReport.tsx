import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus,
  FileText,
  Camera,
  MapPin,
  Calendar,
  Weight,
  Save,
  Send
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  type: z.enum(['organic', 'plastic', 'metal', 'hazardous', 'electronic', 'glass']),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  amount: z.number().min(0.1, 'Amount must be greater than 0'),
  unit: z.enum(['kg', 'tons']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  collectionDate: z.string(),
  estimatedCost: z.number().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  specialInstructions: z.string().optional(),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const CreateWasteReport: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      collectionDate: new Date().toISOString().split('T')[0],
      unit: 'kg',
      priority: 'medium',
    },
  });

  const watchedType = watch('type');
  const watchedPriority = watch('priority');

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const wasteTypes = [
    { value: 'organic', label: 'Organic Waste', description: 'Food scraps, biodegradable materials' },
    { value: 'plastic', label: 'Plastic', description: 'Bottles, containers, packaging' },
    { value: 'metal', label: 'Metal', description: 'Aluminum, steel, copper materials' },
    { value: 'hazardous', label: 'Hazardous', description: 'Chemicals, batteries, toxic materials' },
    { value: 'electronic', label: 'Electronic', description: 'Computers, phones, electronic devices' },
    { value: 'glass', label: 'Glass', description: 'Bottles, windows, laboratory glassware' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-800' },
  ];

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof ReportFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ['title', 'type', 'location'];
        break;
      case 2:
        fieldsToValidate = ['amount', 'unit', 'collectionDate', 'priority'];
        break;
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Submit to API
      console.log('Submitting report:', data, 'Files:', uploadedFiles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate back to reports list
      navigate('/reports');
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Report Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Weekly Organic Waste Collection - Building A"
                {...register('title')}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Waste Type *</Label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {wasteTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                      watchedType === type.value ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      setValue('type', type.value as any);
                      trigger('type');
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-4 h-4 border-2 rounded-full mt-1 flex items-center justify-center">
                        {watchedType === type.value && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{type.label}</h4>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {errors.type && (
                <p className="text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Collection Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="e.g., Building A, Section 2, Floor 3"
                  {...register('location')}
                  className={`pl-10 ${errors.location ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.location && (
                <p className="text-sm text-red-600">{errors.location.message}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    {...register('amount', { valueAsNumber: true })}
                    className={`pl-10 ${errors.amount ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-sm text-red-600">{errors.amount.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Unit *</Label>
                <Select onValueChange={(value: 'kg' | 'tons') => setValue('unit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="collectionDate">Collection Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="collectionDate"
                    type="date"
                    {...register('collectionDate')}
                    className={`pl-10 ${errors.collectionDate ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.collectionDate && (
                  <p className="text-sm text-red-600">{errors.collectionDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Estimated Cost (Optional)</Label>
                <Input
                  id="estimatedCost"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('estimatedCost', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Priority Level *</Label>
              <div className="grid gap-3 sm:grid-cols-3">
                {priorityLevels.map((priority) => (
                  <div
                    key={priority.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted ${
                      watchedPriority === priority.value ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => {
                      setValue('priority', priority.value as any);
                      trigger('priority');
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 rounded-full flex items-center justify-center">
                        {watchedPriority === priority.value && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <Badge className={priority.color}>
                        {priority.label}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the waste collection..."
                rows={4}
                {...register('description')}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Upload Images (Optional)</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag and drop files here</p>
                    <p className="text-sm text-muted-foreground">or click to browse</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Select Files
                  </Button>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  />
                </div>
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>Uploaded Files</Label>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="relative border rounded-lg p-3">
                      <div className="flex items-start space-x-3">
                        <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                          <FileText className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions (Optional)</Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special handling requirements or additional notes..."
                rows={3}
                {...register('specialInstructions')}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/reports')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reports
        </Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% Complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Basic Info</span>
              <span>Details</span>
              <span>Attachments</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Basic Information'}
              {currentStep === 2 && 'Waste Details'}
              {currentStep === 3 && 'Attachments & Notes'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Start by providing basic information about your waste report'}
              {currentStep === 2 && 'Specify the amount, date, and priority of the waste collection'}
              {currentStep === 3 && 'Upload supporting images and add any special instructions'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderStepContent()}

            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              <div className="flex space-x-2">
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={handleNextStep}>
                    Next Step
                  </Button>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={isSubmitting}
                      onClick={() => console.log('Save as draft')}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Draft
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        'Submitting...'
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateWasteReport;