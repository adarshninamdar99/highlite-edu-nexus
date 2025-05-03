
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, AlertCircle, CheckCircle, FileText, 
  Calendar, Award, Star, Trophy, BookOpen
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const assignments = [
  {
    id: 1,
    title: "React Component Architecture",
    course: "React Fundamentals",
    dueDate: "2025-05-15",
    status: "pending",
    progress: 0,
    points: 100,
    difficulty: "medium"
  },
  {
    id: 2,
    title: "State Management with Redux",
    course: "Advanced JavaScript",
    dueDate: "2025-05-20",
    status: "in-progress",
    progress: 40,
    points: 150,
    difficulty: "hard"
  },
  {
    id: 3,
    title: "Binary Search Trees Implementation",
    course: "Data Structures & Algorithms",
    dueDate: "2025-05-25",
    status: "in-progress",
    progress: 75,
    points: 200,
    difficulty: "hard"
  },
  {
    id: 4,
    title: "Async/Await Patterns",
    course: "Advanced JavaScript",
    dueDate: "2025-05-10",
    status: "overdue",
    progress: 20,
    points: 120,
    difficulty: "hard"
  },
  {
    id: 5,
    title: "Component Testing",
    course: "React Fundamentals",
    dueDate: "2025-06-05",
    status: "pending",
    progress: 0,
    points: 80,
    difficulty: "medium"
  },
  {
    id: 6,
    title: "Linked List Problems",
    course: "Data Structures & Algorithms",
    dueDate: "2025-04-25",
    status: "completed",
    progress: 100,
    points: 150,
    difficulty: "hard"
  },
  {
    id: 7,
    title: "CSS Grid Layout Project",
    course: "Frontend Development",
    dueDate: "2025-04-15",
    status: "completed",
    progress: 100,
    points: 80,
    difficulty: "easy"
  }
];

const Assignments = () => {
  const [assignmentList, setAssignmentList] = useState(assignments);
  const [userStats, setUserStats] = useState({
    level: 3,
    xp: 750,
    nextLevelXp: 1000,
    completedAssignments: 2,
    streak: 4,
    badges: ["Fast Learner", "Problem Solver"],
    totalPoints: 230
  });
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'hard':
        return 'bg-orange-50 text-orange-700 border-orange-100';
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
    
    // Update streak and XP
    setUserStats({
      ...userStats,
      xp: userStats.xp + 15,
      streak: userStats.streak + 1
    });
    
    toast({
      title: "Assignment Started",
      description: "You've started working on this assignment (+15 XP)",
      duration: 3000,
    });
  };

  const handleCompleteAssignment = (id) => {
    const completedAssignment = assignmentList.find(a => a.id === id);
    
    setAssignmentList(assignmentList.map(assignment => 
      assignment.id === id ? { ...assignment, status: 'completed', progress: 100 } : assignment
    ));
    
    // Update user stats
    const earnedPoints = completedAssignment ? completedAssignment.points : 50;
    const newXp = userStats.xp + earnedPoints;
    const levelUp = newXp >= userStats.nextLevelXp;
    
    setUserStats({
      ...userStats,
      xp: levelUp ? newXp - userStats.nextLevelXp : newXp,
      level: levelUp ? userStats.level + 1 : userStats.level,
      nextLevelXp: levelUp ? userStats.nextLevelXp + 500 : userStats.nextLevelXp,
      completedAssignments: userStats.completedAssignments + 1,
      totalPoints: userStats.totalPoints + earnedPoints
    });
    
    toast({
      title: levelUp ? "Level Up! 🎉" : "Assignment Completed",
      description: levelUp 
        ? `You've advanced to Level ${userStats.level + 1}! (+${earnedPoints} XP)` 
        : `Great job completing this assignment! (+${earnedPoints} XP)`,
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

      {/* User Stats and Level */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-sm border border-blue-100 dark:border-blue-800">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              {userStats.level}
            </div>
            <div>
              <h2 className="font-bold text-xl">Level {userStats.level} Scholar</h2>
              <div className="flex items-center mt-1 gap-4">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" />
                  <span className="text-sm">{userStats.totalPoints} Points</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-orange-500" />
                  <span className="text-sm">{userStats.streak} Day Streak</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                  <span className="text-sm">{userStats.completedAssignments} Completed</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-2/5">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {userStats.level + 1}</span>
              <span>{userStats.xp}/{userStats.nextLevelXp} XP</span>
            </div>
            <Progress value={(userStats.xp / userStats.nextLevelXp) * 100} className="h-2 bg-blue-100" />
          </div>
        </div>
        
        {/* Badges */}
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Earned Badges:</h3>
          <div className="flex gap-2 flex-wrap">
            {userStats.badges.map((badge, idx) => (
              <div key={idx} className="flex items-center bg-white dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                <Award className="h-4 w-4 mr-2 text-indigo-500" />
                <span className="text-xs font-medium">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-t-4 border-t-blue-500 shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentList.length}</div>
            <p className="text-xs text-muted-foreground">Across all enrolled courses</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-yellow-500 shadow-sm hover:shadow transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignmentList.filter(a => a.status === 'pending' || a.status === 'in-progress').length}</div>
            <p className="text-xs text-muted-foreground">Assignments to complete</p>
          </CardContent>
        </Card>
        
        <Card className="border-t-4 border-t-red-500 shadow-sm hover:shadow transition-shadow">
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
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-indigo-500" />
                          {assignment.title}
                        </div>
                      </TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {assignment.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getDifficultyColor(assignment.difficulty)} capitalize`}>
                          {assignment.difficulty}
                        </Badge>
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
                            <span className="font-medium text-indigo-600">+{assignment.points} XP</span>
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
                    <TableHead>Date Completed</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Points Earned</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {completedAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-indigo-500" />
                          {assignment.title}
                        </div>
                      </TableCell>
                      <TableCell>{assignment.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {assignment.dueDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getDifficultyColor(assignment.difficulty)} capitalize`}>
                          {assignment.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                          <span className="font-medium">+{assignment.points} XP</span>
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
