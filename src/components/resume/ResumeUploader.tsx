
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, File, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

const ResumeUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    if (!file) return;
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        startAnalysis();
      }
    }, 100);
    
    toast({
      title: "Upload Started",
      description: "Your resume is being uploaded for analysis.",
    });
  };
  
  const startAnalysis = () => {
    setAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisComplete(true);
      
      toast({
        title: "Analysis Complete",
        description: "Your resume has been analyzed. View the results below.",
      });
    }, 3000);
  };
  
  const resetUploader = () => {
    setFile(null);
    setUploadProgress(0);
    setAnalysisComplete(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Your Resume</CardTitle>
          <CardDescription>Upload your existing resume for AI analysis and optimization</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          {!file ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-md hover:border-highlite-accent transition-colors">
              <UploadCloud className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your resume</h3>
              <p className="mt-1 text-xs text-gray-500">PDF, DOCX or TXT up to 5MB</p>
              <div className="mt-6">
                <input
                  type="file"
                  id="resume-file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileChange}
                />
                <label htmlFor="resume-file">
                  <Button 
                    className="bg-highlite-accent hover:bg-highlite-light cursor-pointer"
                    onClick={() => document.getElementById("resume-file")?.click()}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" /> Select File
                  </Button>
                </label>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-md space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={resetUploader}>
                  Change
                </Button>
              </div>
              
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}
              
              {analyzing && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-highlite-accent mx-auto"></div>
                  <p className="mt-2 text-sm text-gray-600">Analyzing your resume...</p>
                </div>
              )}
              
              {!uploading && !analyzing && !analysisComplete && (
                <Button 
                  className="w-full bg-highlite-accent hover:bg-highlite-light"
                  onClick={handleUpload}
                >
                  <UploadCloud className="mr-2 h-4 w-4" /> Upload & Analyze
                </Button>
              )}
              
              {analysisComplete && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-green-800">Analysis Complete</h4>
                      <p className="text-sm text-green-700">Your resume has been successfully analyzed.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">ATS Compatibility Score</span>
                      <span className="text-sm font-medium text-amber-500">74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Key Findings</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Missing quantifiable achievements</span>
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                        <span>Skills section could be more comprehensive</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Good education section format</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        <span>Contact information complete and well-formatted</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button className="bg-highlite-accent hover:bg-highlite-light">
                      View Full Report
                    </Button>
                    <Button variant="outline">Start Editing</Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeUploader;
