
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Video, 
  Mic,
  Book, 
  Users, 
  Code
} from 'lucide-react';

interface InterviewTypeProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  roles: string[];
}

const InterviewTypeCard: React.FC<InterviewTypeProps> = ({ title, description, icon, roles }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <div className="bg-highlite-extralight p-2 rounded-full">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium mb-2">Available role-specific interviews:</p>
        <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
          {roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-highlite-accent hover:bg-highlite-light">Start Practice</Button>
      </CardFooter>
    </Card>
  );
};

const MockInterviews: React.FC = () => {
  const [activeTab, setActiveTab] = useState("technical");
  
  const interviewTypes: Record<string, InterviewTypeProps[]> = {
    technical: [
      {
        title: "Frontend Development",
        description: "Practice frontend development concepts like HTML, CSS, JavaScript, and popular frameworks.",
        icon: <Code className="h-5 w-5 text-highlite-accent" />,
        roles: ["React Developer", "Angular Developer", "Vue.js Developer", "JavaScript Engineer", "UI Developer"]
      },
      {
        title: "Backend Development",
        description: "Prepare for backend interviews covering server-side languages, databases, and architecture.",
        icon: <Code className="h-5 w-5 text-highlite-accent" />,
        roles: ["Node.js Developer", "Java Developer", "Python Developer", "Database Engineer", "API Developer"]
      },
      {
        title: "Data Structures & Algorithms",
        description: "Master DSA concepts through interview questions with explained solutions.",
        icon: <Book className="h-5 w-5 text-highlite-accent" />,
        roles: ["SDE Roles", "Google/Amazon/Meta Style", "Entry Level", "Mid-Senior Level"]
      }
    ],
    hr: [
      {
        title: "General HR Round",
        description: "Practice common HR interview questions covering your background, skills, and aspirations.",
        icon: <Users className="h-5 w-5 text-highlite-accent" />,
        roles: ["Entry Level", "Mid Level", "Senior Level", "Career Transition"]
      },
      {
        title: "Behavioral Questions",
        description: "Practice answering questions about your past experiences, teamwork, and problem-solving.",
        icon: <Users className="h-5 w-5 text-highlite-accent" />,
        roles: ["Leadership Roles", "Team Roles", "Client-Facing Roles", "Technical Roles"]
      }
    ],
    managerial: [
      {
        title: "Project Management",
        description: "Practice questions about project delivery, team management, and stakeholder communication.",
        icon: <Users className="h-5 w-5 text-highlite-accent" />,
        roles: ["Project Manager", "Product Owner", "Scrum Master", "Program Manager"]
      },
      {
        title: "Leadership Skills",
        description: "Prepare for questions testing your vision, decision-making, and team development abilities.",
        icon: <Users className="h-5 w-5 text-highlite-accent" />,
        roles: ["Team Lead", "Engineering Manager", "Director", "CTO/VP Level"]
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-highlite-primary">AI Mock Interviews</h1>
        <p className="text-gray-600 mt-2">Practice with our AI interviewer and get instant feedback to improve your interview skills</p>
      </div>

      <div className="border p-4 rounded-lg bg-highlite-extralight bg-opacity-20">
        <div className="flex items-center space-x-4">
          <div className="bg-highlite-accent rounded-full p-3">
            <Mic className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-medium text-highlite-primary">Voice-based AI Interviews</h3>
            <p className="text-sm text-gray-600">Our advanced AI listens to your spoken answers and provides feedback on content, clarity, and confidence.</p>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
          <TabsTrigger value="managerial">Managerial</TabsTrigger>
        </TabsList>
        
        {Object.keys(interviewTypes).map((tabKey) => (
          <TabsContent key={tabKey} value={tabKey} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewTypes[tabKey].map((interview, index) => (
                <InterviewTypeCard key={index} {...interview} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="mr-2 h-5 w-5 text-highlite-accent" />
            Recent Interview Performance
          </CardTitle>
          <CardDescription>Your latest mock interview results and analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Frontend Developer Interview</h3>
                <p className="text-sm text-gray-500">Technical Round • 3 days ago</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  76% Score
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Technical Knowledge</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Communication</span>
                  <span className="font-medium">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center text-sm mb-1">
                  <span>Problem Solving</span>
                  <span className="font-medium">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">View Detailed Feedback</Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="link" className="text-highlite-accent">View All Interview History</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MockInterviews;
