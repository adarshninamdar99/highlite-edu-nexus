
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, CheckCircle, FileText, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const assignments = [
  {
    id: 1,
    title: "React Component Architecture",
    course: "React Fundamentals",
    dueDate: "2025-05-15",
    status: "pending",
    progress: 0
  },
  {
    id: 2,
    title: "State Management with Redux",
    course: "Advanced JavaScript",
    dueDate: "2025-05-20",
    status: "in-progress",
    progress: 40
  },
  {
    id: 3,
    title: "Binary Search Trees Implementation",
    course: "Data Structures & Algorithms",
    dueDate: "2025-05-25",
    status: "in-progress",
    progress: 75
  },
  {
    id: 4,
    title: "Async/Await Patterns",
    course: "Advanced JavaScript",
    dueDate: "2025-05-10",
    status: "overdue",
    progress: 20
  },
  {
    id: 5,
    title: "Component Testing",
    course: "React Fundamentals",
    dueDate: "2025-06-05",
    status: "pending",
    progress: 0
  },
  {
    id: 6,
    title: "Linked List Problems",
    course: "Data Structures & Algorithms",
    dueDate: "2025-04-25",
    status: "completed",
    progress: 100
  },
  {
    id: 7,
    title: "CSS Grid Layout Project",
    course: "Frontend Development",
    dueDate: "2025-04-15",
    status: "completed",
    progress: 100
  }
];

const Assignments = () => {
  const [assignmentList, setAssignmentList] = useState(assignments);
  const { toast } = useToast();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleStartAssignment = (id) => {
    setAssignmentList(assignmentList.map(assignment => 
      assignment.id === id ? { ...assignment, status: 'in-progress', progress: 10 } : assignment
    ));
    
    toast({
      title: "Assignment Started",
      description: "You've started working on this assignment",
      duration: 3000,
    });
  };

  const handleCompleteAssignment = (id) => {
    setAssignmentList(assignmentList.map(assignment => 
      assignment.id === id ? { ...assignment, status: 'completed', progress: 100 } : assignment
    ));
    
    toast({
      title: "Assignment Completed",
      description: "Great job completing this assignment!",
      duration: 3000,
    });
  };

  const pendingAssignments = assignmentList.filter(a => a.status === 'pending' || a.status === 'in-progress' || a.status === 'overdue');
  const completedAssignments = assignmentList.filter(a => a.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Assignments</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentList.length}</div>
            <p className="text-xs text-muted-foreground">Across all enrolled courses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentList.filter(a => a.status === 'pending' || a.status === 'in-progress').length}</div>
            <p className="text-xs text-muted-foreground">Assignments to complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{assignmentList.filter(a => a.status === 'overdue').length}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {assignment.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(assignment.status)}
                          <Badge className={`${getStatusColor(assignment.status)}`}>
                            {assignment.status === 'in-progress' ? 'In Progress' : 
                             assignment.status === 'overdue' ? 'Overdue' : 'Pending'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{assignment.progress}% complete</span>
                          </div>
                          <Progress value={assignment.progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {assignment.status === 'pending' ? (
                          <Button size="sm" onClick={() => handleStartAssignment(assignment.id)}>
                            Start
                          </Button>
                        ) : (
                          <Button size="sm" onClick={() => handleCompleteAssignment(assignment.id)}>
                            Complete
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">{assignment.title}</TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {assignment.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Completed
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">Pending Review</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Assignments;
