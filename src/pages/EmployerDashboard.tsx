
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, Briefcase, Building, Clock, Filter } from "lucide-react";

const talentData = [
  { name: 'Web Dev', value: 35 },
  { name: 'ML/AI', value: 15 },
  { name: 'Mobile', value: 20 },
  { name: 'DevOps', value: 10 },
  { name: 'QA', value: 20 },
];

const hiringData = [
  { month: 'Jan', hired: 5 },
  { month: 'Feb', hired: 8 },
  { month: 'Mar', hired: 12 },
  { month: 'Apr', hired: 10 },
  { month: 'May', hired: 7 },
  { month: 'Jun', hired: 15 },
];

const recentCandidates = [
  { 
    id: 1, 
    name: 'Alex Johnson', 
    role: 'Senior Frontend Developer',
    skills: ['React', 'TypeScript', 'Node.js'],
    match: 92,
    status: 'New'
  },
  { 
    id: 2, 
    name: 'Priya Sharma', 
    role: 'Full Stack Engineer',
    skills: ['Python', 'Django', 'React'],
    match: 86,
    status: 'Reviewing'
  },
  { 
    id: 3, 
    name: 'Marcus Chen', 
    role: 'DevOps Engineer',
    skills: ['AWS', 'Kubernetes', 'Docker'],
    match: 78,
    status: 'Contacted'
  },
  { 
    id: 4, 
    name: 'Sophia Clark', 
    role: 'ML Engineer',
    skills: ['TensorFlow', 'Python', 'Data Science'],
    match: 95,
    status: 'New'
  },
];

const activeJobs = [
  { 
    id: 1, 
    title: 'Senior React Developer', 
    applicants: 24,
    posted: '2 weeks ago',
    status: 'Active'
  },
  { 
    id: 2, 
    title: 'Full Stack Engineer', 
    applicants: 35,
    posted: '1 week ago',
    status: 'Active'
  },
  { 
    id: 3, 
    title: 'DevOps Specialist', 
    applicants: 12,
    posted: '3 days ago',
    status: 'Active'
  },
];

const COLORS = ['#0A2647', '#144272', '#205295', '#2C74B3', '#A5D7E8'];

const chartConfig = {
  hired: {
    label: 'Hired Candidates',
    color: '#2C74B3'
  }
};

const EmployerDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Employer Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Recent Activity
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Candidates Matched
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Active Job Listings
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              3 added this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Hired This Month
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +4 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Time to Hire
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18 days</div>
            <p className="text-xs text-muted-foreground">
              -3 days from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="talent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="talent">Talent Pool</TabsTrigger>
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="talent" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search candidates..."
                className="pl-8 w-[300px]"
              />
            </div>
            <Button>
              <Users className="mr-2 h-4 w-4" />
              View All Candidates
            </Button>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Top Matched Candidates</CardTitle>
              <CardDescription>
                Based on your job requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Match %</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell className="font-medium">{candidate.name}</TableCell>
                      <TableCell>{candidate.role}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-2 max-w-24">
                            <div 
                              className={`h-2 rounded-full ${candidate.match > 90 ? 'bg-green-500' : 'bg-highlite-accent'}`} 
                              style={{ width: `${candidate.match}%` }}
                            ></div>
                          </div>
                          <span>{candidate.match}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          candidate.status === 'New' 
                            ? 'bg-green-100 text-green-800' 
                            : candidate.status === 'Reviewing' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {candidate.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">View Profile</Button>
                          <Button size="sm">Contact</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Active Job Listings</h2>
            <Button>
              <Briefcase className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3">
            {activeJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>Posted {job.posted}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Applicants:</span>
                    <span>{job.applicants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">Status:</span>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      {job.status}
                    </span>
                  </div>
                  <div className="pt-2 flex justify-between gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                    <Button size="sm" className="flex-1">View Applicants</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2 hover:bg-muted/50 transition-colors cursor-pointer">
              <Briefcase className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="font-medium text-center">Create New Job Listing</p>
              <p className="text-sm text-muted-foreground text-center mt-1">Add a new position to find matching candidates</p>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Talent Distribution</CardTitle>
                <CardDescription>
                  By technical specialization
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={talentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {talentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Hiring Trend</CardTitle>
                <CardDescription>
                  Monthly hiring numbers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={hiringData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="hired" name="Hired" fill="var(--color-hired)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Recruitment Performance</CardTitle>
              <CardDescription>
                Key metrics for your recruitment efforts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Avg. Time to Hire</span>
                  <span className="text-2xl font-bold">18 days</span>
                  <span className="text-xs text-green-600">-15% vs. last quarter</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Cost per Hire</span>
                  <span className="text-2xl font-bold">$3,450</span>
                  <span className="text-xs text-green-600">-8% vs. last quarter</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">Candidate Acceptance Rate</span>
                  <span className="text-2xl font-bold">82%</span>
                  <span className="text-xs text-green-600">+5% vs. last quarter</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployerDashboard;
