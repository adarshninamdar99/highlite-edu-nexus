
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GraduationCap, Building, Users, Briefcase, Calendar, Search } from "lucide-react";

const placementData = [
  { name: 'Tech', value: 45 },
  { name: 'Finance', value: 20 },
  { name: 'Consulting', value: 15 },
  { name: 'Healthcare', value: 10 },
  { name: 'Others', value: 10 },
];

const placementTrend = [
  { year: '2020', placed: 65 },
  { year: '2021', placed: 72 },
  { year: '2022', placed: 78 },
  { year: '2023', placed: 85 },
  { year: '2024', placed: 90 },
  { year: '2025', placed: 92 },
];

const skillsGap = [
  { name: 'React', students: 55, industry: 80 },
  { name: 'Python', students: 70, industry: 75 },
  { name: 'SQL', students: 45, industry: 65 },
  { name: 'Cloud', students: 30, industry: 60 },
  { name: 'ML/AI', students: 25, industry: 40 },
];

const topCompanies = [
  { 
    id: 1, 
    name: 'Google', 
    students: 8,
    avgPackage: '$125,000',
    relation: 'Partner'
  },
  { 
    id: 2, 
    name: 'Microsoft', 
    students: 12,
    avgPackage: '$115,000',
    relation: 'Partner'
  },
  { 
    id: 3, 
    name: 'Amazon', 
    students: 15,
    avgPackage: '$110,000',
    relation: 'Partner'
  },
  { 
    id: 4, 
    name: 'Oracle', 
    students: 6,
    avgPackage: '$105,000',
    relation: 'Recruiting'
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: 'Microsoft Recruitment Drive',
    date: '2025-05-15',
    type: 'Placement'
  },
  {
    id: 2,
    title: 'Interview Skills Workshop',
    date: '2025-05-10',
    type: 'Training'
  },
  {
    id: 3,
    title: 'Resume Review Session',
    date: '2025-05-08',
    type: 'Workshop'
  },
];

const COLORS = ['#0A2647', '#144272', '#205295', '#2C74B3', '#A5D7E8'];

const chartConfig = {
  placed: {
    label: 'Placed Students',
    color: '#2C74B3'
  },
  students: {
    label: 'Students',
    color: '#205295'
  },
  industry: {
    label: 'Industry Demand',
    color: '#0A2647'
  }
};

const CollegeDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">College Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Academic Year 2024-25
          </Button>
          <Button size="sm">
            <GraduationCap className="mr-2 h-4 w-4" />
            Placement Reports
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Placement Rate
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              +7% from last batch
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Average Package
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$95,000</div>
            <p className="text-xs text-muted-foreground">
              +12% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Recruiting Companies
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              8 new this year
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Interview Success Rate
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last batch
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="companies">Company Relations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Placement Distribution</CardTitle>
                <CardDescription>
                  By industry sector
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={placementData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {placementData.map((entry, index) => (
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
                <CardTitle>Placement Trend</CardTitle>
                <CardDescription>
                  Year-by-year placement percentage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-[4/3]">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={placementTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="placed" name="Placement %" stroke="var(--color-placed)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Upcoming Placement Events</CardTitle>
              <CardDescription>
                Scheduled events for current batch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          event.type === 'Placement' 
                            ? 'bg-green-100 text-green-800' 
                            : event.type === 'Training'
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {event.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">Details</Button>
                          <Button size="sm">Manage</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  View All Events
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Skills Analysis</h2>
            <div className="flex gap-2">
              <Button variant="outline">Download Report</Button>
              <Button>Update Data</Button>
            </div>
          </div>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>
                Comparing student skills vs. industry demand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-[4/3]">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={skillsGap} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="students" name="Students Proficiency" fill="var(--color-students)" />
                    <Bar dataKey="industry" name="Industry Demand" fill="var(--color-industry)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  Key metrics for current batch
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Mock Interview Pass Rate</span>
                      <span className="font-semibold">75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-highlite-accent h-2.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Resume Completion</span>
                      <span className="font-semibold">92%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-highlite-accent h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Course Completion</span>
                      <span className="font-semibold">85%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-highlite-accent h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
                <CardDescription>
                  Based on current analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md bg-muted/50">
                    <h4 className="font-semibold">Increase Cloud Computing Training</h4>
                    <p className="text-sm text-muted-foreground mt-1">Student proficiency is 50% below industry demand in cloud technologies.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-muted/50">
                    <h4 className="font-semibold">Enhance ML/AI Curriculum</h4>
                    <p className="text-sm text-muted-foreground mt-1">15% increase in industry requirements for AI/ML skills.</p>
                  </div>
                  
                  <div className="p-3 border rounded-md bg-muted/50">
                    <h4 className="font-semibold">Expand Mock Interview Program</h4>
                    <p className="text-sm text-muted-foreground mt-1">Students with 3+ mock interviews have 28% higher placement rates.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search companies..."
                className="pl-8 w-[300px]"
              />
            </div>
            <Button>
              <Building className="mr-2 h-4 w-4" />
              Add New Company
            </Button>
          </div>
          
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Top Recruiting Companies</CardTitle>
              <CardDescription>
                Companies with highest student placement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Students Placed</TableHead>
                    <TableHead>Avg. Package</TableHead>
                    <TableHead>Relationship</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.students}</TableCell>
                      <TableCell>{company.avgPackage}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          company.relation === 'Partner' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {company.relation}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Contact</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Upcoming Company Visits</CardTitle>
                <CardDescription>
                  Schedule for the next 30 days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Google</h4>
                        <p className="text-sm text-muted-foreground">May 12, 2025 - Tech Talk & Interviews</p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Accenture</h4>
                        <p className="text-sm text-muted-foreground">May 18, 2025 - Campus Recruitment</p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">Infosys</h4>
                        <p className="text-sm text-muted-foreground">May 25, 2025 - Placement Drive</p>
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Industry Partnership Metrics</CardTitle>
                <CardDescription>
                  Key statistics for campus relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Total Partner Companies</span>
                    <span className="text-2xl font-bold">32</span>
                    <span className="text-xs text-green-600">+4 from last year</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Annual Job Fair Companies</span>
                    <span className="text-2xl font-bold">25</span>
                    <span className="text-xs text-green-600">+5 from last year</span>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-muted-foreground">Internship Providers</span>
                    <span className="text-2xl font-bold">18</span>
                    <span className="text-xs text-green-600">+3 from last year</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CollegeDashboard;
