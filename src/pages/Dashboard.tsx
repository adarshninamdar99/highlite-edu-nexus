
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { 
  Video, 
  FileText, 
  Briefcase, 
  BarChart,
  Calendar,
  Clock,
  BookOpen
} from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-highlite-primary">Student Dashboard</h1>
        <Button className="bg-highlite-accent hover:bg-highlite-light">
          <Calendar className="mr-2 h-4 w-4" /> Schedule Interview
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Interview Readiness</CardTitle>
            <Video className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+4% from last week</p>
            <Progress value={72} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Resume Score</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">+2% from last update</p>
            <Progress value={85} className="mt-3" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Job Match Rate</CardTitle>
            <Briefcase className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">12 new matches</p>
            <Progress value={68} className="mt-3" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions on HighliteX</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-highlite-extralight p-2 rounded">
                <Video className="h-4 w-4 text-highlite-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Completed Mock Interview</p>
                <p className="text-xs text-muted-foreground">Frontend Developer Role</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" /> 2 days ago
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-highlite-extralight p-2 rounded">
                <FileText className="h-4 w-4 text-highlite-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Updated Resume</p>
                <p className="text-xs text-muted-foreground">Added new project experience</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" /> 4 days ago
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-highlite-extralight p-2 rounded">
                <BookOpen className="h-4 w-4 text-highlite-accent" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Started Course</p>
                <p className="text-xs text-muted-foreground">Advanced React Development</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" /> 1 week ago
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Scheduled activities and deadlines</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-highlite-extralight p-2 rounded">
                  <Video className="h-4 w-4 text-highlite-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Technical Mock Interview</p>
                  <p className="text-xs text-muted-foreground">Data Structures & Algorithms</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Prepare
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-highlite-extralight p-2 rounded">
                  <BookOpen className="h-4 w-4 text-highlite-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Complete Assignment</p>
                  <p className="text-xs text-muted-foreground">JavaScript Fundamentals</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Start
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-highlite-extralight p-2 rounded">
                  <BarChart className="h-4 w-4 text-highlite-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium">Review Performance</p>
                  <p className="text-xs text-muted-foreground">Recent Interview Analysis</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-highlite-primary mb-4">Recommended for You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Resume Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Improve your resume with AI-powered suggestions tailored to your target roles.</p>
              <Link to="/resume-builder">
                <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
                  Optimize Now
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Mock HR Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Practice common HR interview questions with our AI interviewer and get instant feedback.</p>
              <Link to="/mock-interviews">
                <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
                  Start Practice
                </Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">JavaScript Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Based on your profile, this course will help strengthen your frontend development skills.</p>
              <Link to="/courses">
                <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
                  Explore Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
