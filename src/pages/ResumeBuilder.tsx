
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ResumeEditor from '@/components/resume/ResumeEditor';
import ATSAnalyzer from '@/components/resume/ATSAnalyzer';
import ResumeTemplates from '@/components/resume/ResumeTemplates';
import ResumeUploader from '@/components/resume/ResumeUploader';
import {
  FileText,
  Download,
  CheckCircle,
  AlertTriangle,
  PenLine,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  Settings,
  Info,
  Award
} from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState("builder");
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(123) 456-7890",
      location: "New York, NY"
    },
    summary: "Experienced frontend developer with 5+ years of expertise in building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about creating intuitive user interfaces and optimizing web performance.",
    experience: [
      {
        role: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2020 - Present",
        accomplishments: [
          "Led the development of company's flagship product using React and TypeScript",
          "Improved application performance by 40% through code optimization",
          "Mentored junior developers and conducted code reviews"
        ]
      },
      {
        role: "Frontend Developer",
        company: "WebSolutions",
        period: "2017 - 2020",
        accomplishments: [
          "Developed responsive web applications for various clients",
          "Collaborated with design team to implement UI/UX improvements"
        ]
      }
    ],
    education: [],
    skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux", "Tailwind CSS", "Git", "Webpack", "Jest", "Node.js", "UI/UX Design"]
  });
  
  const [atsScore, setAtsScore] = useState(85);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resumeImprovements, setResumeImprovements] = useState([
    { title: "Add more quantifiable achievements", status: "warning", details: "Include metrics and numbers to showcase your impact" },
    { title: "Customize for the job description", status: "warning", details: "Tailor your resume to match the specific job requirements" },
    { title: "Highlight relevant technical skills", status: "success", details: "Your technical skills are well highlighted" },
    { title: "Improve summary section", status: "success", details: "Your summary effectively communicates your experience and focus" }
  ]);
  
  const { toast } = useToast();

  const handleDataUpdate = (section: string, data: any) => {
    setResumeData({
      ...resumeData,
      [section]: data
    });
  };

  const analyzeResume = () => {
    setIsAnalyzing(true);
    toast({
      title: "Analyzing Resume",
      description: "Our AI is analyzing your resume against ATS requirements...",
    });
    
    // Simulate analysis
    setTimeout(() => {
      const newScore = Math.floor(Math.random() * 15) + 75; // Random score between 75-90
      setAtsScore(newScore);
      
      // Update improvements based on score
      const updatedImprovements = [...resumeImprovements];
      if (newScore > 85) {
        updatedImprovements[0].status = "success";
        updatedImprovements[0].details = "Great job including quantifiable achievements!";
      }
      
      setResumeImprovements(updatedImprovements);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis Complete",
        description: `Your resume scored ${newScore}% against ATS systems.`,
      });
    }, 3000);
  };

  const downloadResume = () => {
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been exported as PDF.",
    });
  };
  
  const saveResumeDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your resume draft has been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-highlite-primary">Resume Builder</h1>
        <p className="text-gray-600 mt-2">Create, analyze, and optimize your resume with AI assistance</p>
      </div>
      
      <div className="bg-gradient-to-r from-highlite-extralight to-highlite-extralight/20 p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-highlite-accent rounded-full p-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-highlite-primary">AI-Powered Resume Builder</h3>
            <p className="text-sm text-gray-600">Our AI analyzes your resume against thousands of successful resumes and job descriptions to help you stand out.</p>
          </div>
          <Button variant="outline" className="ml-auto" onClick={() => window.open('#', '_blank')}>
            <Info className="mr-2 h-4 w-4" /> Learn More
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 bg-highlite-extralight bg-opacity-20">
          <TabsTrigger value="builder" className="data-[state=active]:bg-highlite-accent data-[state=active]:text-white">
            Resume Builder
          </TabsTrigger>
          <TabsTrigger value="upload" className="data-[state=active]:bg-highlite-accent data-[state=active]:text-white">
            Upload & Analyze
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-highlite-accent data-[state=active]:text-white">
            Templates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-highlite-extralight shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle>Build Your Resume</CardTitle>
                  <CardDescription>Fill in your details section by section</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResumeEditor 
                    resumeData={resumeData} 
                    onUpdate={handleDataUpdate} 
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={saveResumeDraft}>Save Draft</Button>
                  <Button className="bg-highlite-accent hover:bg-highlite-light" onClick={downloadResume}>
                    <Download className="mr-2 h-4 w-4" /> Export PDF
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card className="border-highlite-extralight shadow-md">
                <CardHeader>
                  <CardTitle>ATS Score</CardTitle>
                  <CardDescription>AI-powered analysis of your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ATSAnalyzer 
                    score={atsScore} 
                    improvements={resumeImprovements} 
                    isAnalyzing={isAnalyzing} 
                    onAnalyze={analyzeResume} 
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <ResumeUploader />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <ResumeTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
