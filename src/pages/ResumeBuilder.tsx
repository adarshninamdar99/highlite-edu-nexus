
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  FileText,
  Upload,
  Download,
  Edit,
  CheckCircle,
  AlertTriangle,
  PenLine,
  Plus
} from 'lucide-react';

const ResumeBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState("builder");
  
  const resumeScore = 85;
  const resumeImprovements = [
    { title: "Add more quantifiable achievements", status: "warning" },
    { title: "Customize for the job description", status: "warning" },
    { title: "Highlight relevant technical skills", status: "success" },
    { title: "Improve summary section", status: "success" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-highlite-primary">Resume Builder</h1>
        <p className="text-gray-600 mt-2">Create, analyze, and optimize your resume with AI assistance</p>
      </div>
      
      <div className="border p-4 rounded-lg bg-highlite-extralight bg-opacity-20">
        <div className="flex items-center space-x-4">
          <div className="bg-highlite-accent rounded-full p-3">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-highlite-primary">AI Resume Analysis</h3>
            <p className="text-sm text-gray-600">Our AI analyzes your resume against thousands of successful resumes and job descriptions to help you stand out.</p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="builder">Resume Builder</TabsTrigger>
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="builder" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Build Your Resume</CardTitle>
                  <CardDescription>Fill in your details section by section</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Personal Information
                        </h3>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <span className="ml-2">John Doe</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <span className="ml-2">(123) 456-7890</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <span className="ml-2">john.doe@example.com</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <span className="ml-2">New York, NY</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Professional Summary
                        </h3>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm">Experienced frontend developer with 5+ years of expertise in building responsive web applications using React, TypeScript, and modern CSS frameworks. Passionate about creating intuitive user interfaces and optimizing web performance.</p>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Work Experience
                        </h3>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border-l-2 border-highlite-accent pl-4 py-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium text-highlite-primary">Senior Frontend Developer</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">TechCorp Inc. • 2020 - Present</p>
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-gray-600">
                            <li>Led the development of company's flagship product using React and TypeScript</li>
                            <li>Improved application performance by 40% through code optimization</li>
                            <li>Mentored junior developers and conducted code reviews</li>
                          </ul>
                        </div>
                        
                        <div className="border-l-2 border-gray-300 pl-4 py-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">Frontend Developer</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600">WebSolutions • 2017 - 2020</p>
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-gray-600">
                            <li>Developed responsive web applications for various clients</li>
                            <li>Collaborated with design team to implement UI/UX improvements</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500" />
                          Education
                        </h3>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      </div>
                      <div className="text-center p-4">
                        <PenLine className="h-12 w-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600 text-sm">Add your educational background</p>
                        <Button className="mt-4 bg-highlite-accent hover:bg-highlite-light">
                          Add Education
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Skills
                        </h3>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Redux", "Tailwind CSS", "Git", "Webpack", "Jest", "Node.js", "UI/UX Design"].map((skill, index) => (
                          <span key={index} className="inline-flex items-center rounded-full bg-highlite-extralight px-2.5 py-0.5 text-xs font-medium text-highlite-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Save Draft</Button>
                  <Button className="bg-highlite-accent hover:bg-highlite-light">
                    <Download className="mr-2 h-4 w-4" /> Export PDF
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Resume Score</CardTitle>
                  <CardDescription>AI-powered analysis of your resume</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full border-8 border-highlite-extralight p-4 h-32 w-32">
                      <span className="text-3xl font-bold text-highlite-accent">{resumeScore}%</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Your resume is looking good!</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-4">Suggested Improvements</h3>
                    <ul className="space-y-3">
                      {resumeImprovements.map((item, index) => (
                        <li key={index} className="flex items-start">
                          {item.status === "success" ? (
                            <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5" />
                          ) : (
                            <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 mt-0.5" />
                          )}
                          <span className="text-sm">{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
                    Get AI Suggestions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Your Resume</CardTitle>
              <CardDescription>Upload your existing resume for AI analysis and optimization</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-md">
                <Upload className="h-12 w-12 mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Upload your resume</h3>
                <p className="mt-1 text-xs text-gray-500">PDF, DOCX or TXT up to 5MB</p>
                <div className="mt-6">
                  <Button className="bg-highlite-accent hover:bg-highlite-light">
                    <Upload className="mr-2 h-4 w-4" /> Select File
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-[3/4] bg-gray-100 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <FileText className="h-12 w-12" />
                  </div>
                </div>
                <CardFooter className="justify-between p-4">
                  <span className="font-medium">Template {index + 1}</span>
                  <Button size="sm" className="bg-highlite-accent hover:bg-highlite-light">
                    Use
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResumeBuilder;
