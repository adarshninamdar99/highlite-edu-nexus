
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle, 
  Video, 
  FileText, 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  ChevronRight,
  Timer
} from "lucide-react";
import { motion } from "framer-motion";

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
    lessons: 24,
    rating: 4.8,
    nextLesson: "Component Lifecycle",
    nextLessonTime: "45 min",
    lastAccessed: "2 days ago"
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
    lessons: 32,
    rating: 4.7,
    nextLesson: "Promises & Async Functions",
    nextLessonTime: "60 min",
    lastAccessed: "1 day ago"
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
    lessons: 40,
    rating: 4.9,
    nextLesson: "Graph Algorithms",
    nextLessonTime: "90 min",
    lastAccessed: "3 days ago"
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
    lessons: 18,
    rating: 4.6
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
    lessons: 28,
    rating: 4.5
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
    lessons: 16,
    rating: 4.7
  }
];

const categories = ["All", "Web Development", "Data Science", "Computer Science", "Career Development"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const CourseCard = ({ course, onEnroll, enrolled }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Animated card on hover
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.2 }
      }}
    >
      <Card 
        className="h-full flex flex-col overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-48 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-500"
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          />
          <div className="absolute top-3 right-3 flex gap-1">
            <Badge variant={course.level === "Beginner" ? "outline" : 
                          course.level === "Intermediate" ? "secondary" : "default"}>
              {course.level}
            </Badge>
          </div>
          {course.rating && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md flex items-center text-xs">
              <Star className="h-3 w-3 mr-1 text-yellow-400 fill-yellow-400" />
              {course.rating}
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
          <CardDescription className="flex items-center text-sm">
            <span className="flex items-center">
              <GraduationCap className="mr-1 h-3 w-3" />
              {course.instructor}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <BookOpen className="mr-1 h-3 w-3" />
              {course.lessons} lessons
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
          
          {enrolled && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="text-xs font-medium mb-1">Next Lesson:</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{course.nextLesson}</span>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Timer className="h-3 w-3 mr-1" />
                    {course.nextLessonTime}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t pt-4 bg-muted/30">
          {enrolled ? (
            <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
              Continue Learning
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
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
    </motion.div>
  );
};

const FeaturedCourse = ({ course, onEnroll }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-highlite-extralight to-highlite-light">
        <div className="md:flex">
          <div className="md:w-2/5 h-64 md:h-auto">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-3/5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Badge variant="outline" className="mb-2">Featured Course</Badge>
                  <h3 className="text-2xl font-bold">{course.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-medium">{course.rating}</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-highlite-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Instructor</p>
                    <p className="font-medium">{course.instructor}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-highlite-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-highlite-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Lessons</p>
                    <p className="font-medium">{course.lessons} lessons</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-highlite-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="font-medium">{course.level}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {course.enrolled ? (
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 mb-4" />
                <Button className="w-full bg-highlite-accent hover:bg-highlite-light">
                  Continue Learning
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ) : (
              <Button 
                size="lg" 
                className="w-full bg-highlite-accent hover:bg-highlite-light"
                onClick={() => onEnroll(course.id)}
              >
                Enroll Now
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const LearningPathCard = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Your Learning Path</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l border-gray-200 ml-3 space-y-6">
          <li className="mb-6 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-green-200 rounded-full -left-3 ring-8 ring-white">
              <CheckCircle className="w-3 h-3 text-green-500" />
            </span>
            <h3 className="mb-1 text-sm font-semibold">Frontend Basics</h3>
            <p className="text-xs text-muted-foreground">Completed on April 13, 2025</p>
          </li>
          <li className="mb-6 ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-200 rounded-full -left-3 ring-8 ring-white">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </span>
            <h3 className="mb-1 text-sm font-semibold">React Development</h3>
            <p className="text-xs text-muted-foreground">In progress - 65% complete</p>
            <Progress value={65} className="h-1.5 mt-2 w-full max-w-[180px]" />
          </li>
          <li className="ml-6">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full -left-3 ring-8 ring-white">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </span>
            <h3 className="mb-1 text-sm font-semibold">Advanced System Design</h3>
            <p className="text-xs text-muted-foreground">Starts on May 15, 2025</p>
          </li>
        </ol>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Update Learning Path</Button>
      </CardFooter>
    </Card>
  );
};

const CertificateCard = ({ title, date, type }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <Award className="h-5 w-5 text-highlite-accent" />
        </div>
        <CardDescription>Issued on {date}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm">
          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
          <span>{type}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Certificate</Button>
      </CardFooter>
    </Card>
  );
};

const FilterBar = ({ categories, levels, activeCategory, activeLevel, onCategoryChange, onLevelChange, onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-center bg-muted/50 p-4 rounded-lg mb-6">
      <div className="relative w-full md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search courses..." 
          className="pl-9" 
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      
      <div className="flex gap-2 items-center w-full md:w-auto">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="flex gap-2 pb-3">
            {categories.map((category) => (
              <Button 
                key={category}
                variant={activeCategory === category ? "default" : "outline"} 
                size="sm"
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="flex gap-2 items-center w-full md:w-auto">
        <GraduationCap className="h-4 w-4 text-muted-foreground" />
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="flex gap-2 pb-3">
            {levels.map((level) => (
              <Button 
                key={level}
                variant={activeLevel === level ? "default" : "outline"} 
                size="sm"
                onClick={() => onLevelChange(level)}
              >
                {level}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

const InProgressCourses = ({ courses, onEnroll }) => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 h-40 md:h-auto">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex-grow p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <GraduationCap className="mr-1 h-4 w-4" />
                      <span>{course.instructor}</span>
                      <span className="mx-2">•</span>
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Last accessed: {course.lastAccessed}</span>
                    </div>
                  </div>
                  <Badge>{course.level}</Badge>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 mb-4" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Next: {course.nextLesson}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Timer className="h-3 w-3 mr-1" />
                      {course.nextLessonTime}
                    </div>
                  </div>
                  <Button>Continue Learning</Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

const Courses = () => {
  const [courses, setCourses] = useState(allCourses);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeLevel, setActiveLevel] = useState("All Levels");
  const { toast } = useToast();

  // Filter courses based on search, category and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    const matchesLevel = activeLevel === "All Levels" || course.level === activeLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const enrolledCourses = filteredCourses.filter(course => course.enrolled);
  
  // Featured course is the one with the highest rating
  const featuredCourse = courses.reduce((prev, current) => 
    (prev.rating > current.rating) ? prev : current
  );

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

  // Animation variants for staggered list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const courseVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  // Scroll into view when tab changes
  const allCoursesRef = useRef(null);
  useEffect(() => {
    if (activeTab === "all" && allCoursesRef.current) {
      allCoursesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-highlite-primary">My Courses</h1>
          <p className="text-muted-foreground mt-1">Continue your learning journey</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Video className="mr-2 h-4 w-4" />
            Recorded Sessions
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Course Materials
          </Button>
          <Button className="bg-highlite-accent hover:bg-highlite-light">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Featured Course */}
      <FeaturedCourse course={featuredCourse} onEnroll={handleEnroll} />

      {/* Learning Path and Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LearningPathCard />
        </div>
        <div className="md:col-span-1 space-y-4">
          <h3 className="text-xl font-semibold mb-2">Your Certificates</h3>
          <CertificateCard 
            title="React Native Fundamentals" 
            date="April 15, 2025" 
            type="Completed with distinction" 
          />
        </div>
      </div>

      <Separator />

      {/* Tabs and Course List */}
      <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="all" ref={allCoursesRef}>All Courses</TabsTrigger>
          <TabsTrigger value="enrolled">My Enrolled Courses</TabsTrigger>
        </TabsList>
        
        <FilterBar 
          categories={categories}
          levels={levels}
          activeCategory={activeCategory}
          activeLevel={activeLevel}
          onCategoryChange={setActiveCategory}
          onLevelChange={setActiveLevel}
          onSearch={setSearchQuery}
        />
        
        <TabsContent value="all" className="space-y-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredCourses.map((course) => (
              <motion.div key={course.id} variants={courseVariants}>
                <CourseCard 
                  course={course} 
                  onEnroll={handleEnroll}
                  enrolled={course.enrolled}
                />
              </motion.div>
            ))}
          </motion.div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <BookOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-1">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search term</p>
              <Button onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setActiveLevel("All Levels");
              }}>
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="enrolled" className="space-y-6">
          {enrolledCourses.length > 0 ? (
            <>
              <h3 className="text-xl font-semibold mb-4">In Progress Courses</h3>
              <InProgressCourses courses={enrolledCourses} onEnroll={handleEnroll} />
            </>
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
    </div>
  );
};

export default Courses;
