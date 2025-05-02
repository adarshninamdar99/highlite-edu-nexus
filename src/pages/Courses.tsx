
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Clock, Award, CheckCircle, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample course data
const allCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    description: "Learn the basics of React including components, props, and state management.",
    category: "Web Development",
    level: "Beginner",
    duration: "6 weeks",
    enrolled: true,
    progress: 65,
    instructor: "Sarah Johnson",
    image: "https://via.placeholder.com/300x200",
    lessons: 24
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Master advanced JavaScript concepts like closures, promises, and async/await.",
    category: "Web Development",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: true,
    progress: 30,
    instructor: "Michael Chen",
    image: "https://via.placeholder.com/300x200",
    lessons: 32
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Essential algorithms and data structures for technical interviews.",
    category: "Computer Science",
    level: "Advanced",
    duration: "10 weeks",
    enrolled: true,
    progress: 15,
    instructor: "Dr. Patel",
    image: "https://via.placeholder.com/300x200",
    lessons: 40
  },
  {
    id: 4,
    title: "Frontend System Design",
    description: "Learn how to design scalable frontend architectures for complex applications.",
    category: "Web Development",
    level: "Advanced",
    duration: "6 weeks",
    enrolled: false,
    instructor: "Emily Rodriguez",
    image: "https://via.placeholder.com/300x200",
    lessons: 18
  },
  {
    id: 5,
    title: "Machine Learning Basics",
    description: "Introduction to fundamental machine learning algorithms and techniques.",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    enrolled: false,
    instructor: "Dr. James Wilson",
    image: "https://via.placeholder.com/300x200",
    lessons: 28
  },
  {
    id: 6,
    title: "Interview Preparation",
    description: "Comprehensive guide to acing technical and behavioral interviews.",
    category: "Career Development",
    level: "All Levels",
    duration: "4 weeks",
    enrolled: false,
    instructor: "Sophia Martinez",
    image: "https://via.placeholder.com/300x200",
    lessons: 16
  }
];

const CourseCard = ({ course, onEnroll, enrolled }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
          <Badge variant={course.level === "Beginner" ? "outline" : 
                          course.level === "Intermediate" ? "secondary" : "default"}>
            {course.level}
          </Badge>
        </div>
        <CardDescription>{course.category} • {course.duration}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>{course.lessons} lessons</span>
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4 mt-auto">
        {enrolled ? (
          <>
            <div className="w-full space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Progress</span>
                <span className="font-medium">{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
              <Button variant="outline" className="w-full mt-2">
                Continue Learning
              </Button>
            </div>
          </>
        ) : (
          <Button 
            className="w-full bg-highlite-accent hover:bg-highlite-light"
            onClick={() => onEnroll(course.id)}
          >
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState(allCourses);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleEnroll = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, enrolled: true, progress: 0 } : course
    ));
    
    toast({
      title: "Enrolled Successfully",
      description: "You have been enrolled in this course",
      duration: 3000,
    });
  };

  const filteredCourses = activeTab === "enrolled" 
    ? courses.filter(course => course.enrolled) 
    : courses;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="enrolled">My Enrolled Courses</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Video className="mr-2 h-4 w-4" />
              Recorded Sessions
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Course Materials
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
                enrolled={course.enrolled}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="enrolled" className="space-y-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEnroll={handleEnroll}
                  enrolled={course.enrolled}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No enrolled courses</h3>
              <p className="text-muted-foreground mb-4">Browse our catalog and enroll in courses to start learning</p>
              <Button onClick={() => setActiveTab("all")}>Browse Courses</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Course Completion Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">React Native Fundamentals</CardTitle>
                <Award className="h-5 w-5 text-highlite-accent" />
              </div>
              <CardDescription>Issued on April 15, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Completed with distinction</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Certificate</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">Python for Data Science</CardTitle>
                <Award className="h-5 w-5 text-highlite-accent" />
              </div>
              <CardDescription>Issued on March 22, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm">
                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                <span>Completed with excellence</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">View Certificate</Button>
            </CardFooter>
          </Card>
          
          <div className="flex items-center justify-center p-6 border border-dashed rounded-lg">
            <div className="text-center">
              <p className="text-muted-foreground mb-2">Complete more courses to earn certificates</p>
              <Button variant="ghost" size="sm">View All Certificates</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
