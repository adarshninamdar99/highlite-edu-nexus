
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, GraduationCap, Award, BookOpen, Video, FileText } from "lucide-react";

const learningProgress = [
  { name: 'Web Dev', completed: 65, total: 100 },
  { name: 'DSA', completed: 80, total: 100 },
  { name: 'ML/AI', completed: 45, total: 100 },
  { name: 'Soft Skills', completed: 75, total: 100 },
  { name: 'System Design', completed: 55, total: 100 },
];

const interviewPerformance = [
  { month: 'Jan', score: 65 },
  { month: 'Feb', score: 70 },
  { month: 'Mar', score: 75 },
  { month: 'Apr', score: 72 },
  { month: 'May', score: 82 },
  { month: 'Jun', score: 85 },
];

const upcomingInterviews = [
  { id: 1, company: 'Google', role: 'Software Engineer', date: '2025-05-10', time: '10:00 AM' },
  { id: 2, company: 'Microsoft', role: 'Frontend Developer', date: '2025-05-15', time: '02:00 PM' },
  { id: 3, company: 'Amazon', role: 'Full Stack Engineer', date: '2025-05-20', time: '11:30 AM' },
];

const recentCourses = [
  { id: 1, title: 'React Fundamentals', progress: 80, lastAccessed: '2 days ago' },
  { id: 2, title: 'Data Structures', progress: 65, lastAccessed: '1 week ago' },
  { id: 3, title: 'System Design Basics', progress: 30, lastAccessed: '4 days ago' },
];

const chartConfig = {
  completed: {
    label: 'Completed',
    color: '#2C74B3'
  },
  total: {
    label: 'Total',
    color: '#A5D7E8'
  },
  score: {
    label: 'Interview Score',
    color: '#205295'
  }
};

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            May 2025
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Today
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Interview Success Rate
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +5.2% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Courses Completed
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              2 courses this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Mock Interviews
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 interviews scheduled
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Resume Views
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">
              +32 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="interviews">Interviews</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
                <CardDescription>
                  Your progress across different skill areas
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={learningProgress} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="completed" name="Completed" fill="var(--color-completed)" />
                      <Bar dataKey="total" name="Total" fill="var(--color-total)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Interview Performance</CardTitle>
                <CardDescription>
                  Your mock interview scores over time
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={interviewPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="score" name="Score" stroke="var(--color-score)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>
                  Your scheduled mock interviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInterviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.company}</TableCell>
                        <TableCell>{interview.role}</TableCell>
                        <TableCell>{interview.date}</TableCell>
                        <TableCell>{interview.time}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card className="col-span-1 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Recent Courses</CardTitle>
                <CardDescription>
                  Continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {recentCourses.map((course) => (
                  <div key={course.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold">{course.title}</h4>
                      <span className="text-sm text-muted-foreground">{course.lastAccessed}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div 
                        className="bg-highlite-accent h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>{course.progress}% complete</span>
                      <Button variant="link" size="sm" className="h-auto p-0">Continue</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="interviews" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Mock Interview Schedule</CardTitle>
              <CardDescription>
                Manage your upcoming mock interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingInterviews.map((interview) => (
                    <TableRow key={interview.id}>
                      <TableCell className="font-medium">{interview.company}</TableCell>
                      <TableCell>{interview.role}</TableCell>
                      <TableCell>{interview.date}</TableCell>
                      <TableCell>{interview.time}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-between">
                <Button variant="outline" size="sm">
                  <Video className="mr-2 h-4 w-4" />
                  Schedule New Interview
                </Button>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>My Learning Path</CardTitle>
              <CardDescription>
                Track your progress and complete courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {recentCourses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-lg">{course.title}</h3>
                      <span className="text-sm text-muted-foreground">Last accessed: {course.lastAccessed}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 mb-2">
                      <div 
                        className="bg-highlite-accent h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{course.progress}% complete</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm">Continue Learning</Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Explore More Courses
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
