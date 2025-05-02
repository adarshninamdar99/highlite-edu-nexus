
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowDown, 
  ArrowRight, 
  ArrowUp, 
  BookOpen, 
  CheckCircle, 
  Code, 
  FileCode, 
  GraduationCap, 
  LayoutGrid, 
  Play, 
  Search, 
  Star 
} from "lucide-react";
import { cn } from "@/lib/utils";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";
type Category = "Arrays" | "Strings" | "Dynamic Programming" | "Graphs" | "Trees" | "Math" | "Sorting";
type ProgrammingLanguage = "Python" | "Java" | "C++" | "JavaScript" | "Go" | "Ruby";

interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: Category;
  solvedBy: number;
  successRate: number;
  tags?: string[];
}

interface Contest {
  id: string;
  title: string;
  startDate: string;
  duration: string;
  registered: number;
}

interface PracticeArea {
  language: ProgrammingLanguage;
  description: string;
  problemCount: number;
  color: string;
  icon: string;
}

const difficultyColor = {
  Easy: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Hard: "bg-orange-100 text-orange-800 border-orange-200",
  Expert: "bg-red-100 text-red-800 border-red-200",
};

const categoryColor = {
  Arrays: "bg-blue-100 text-blue-800",
  Strings: "bg-purple-100 text-purple-800",
  "Dynamic Programming": "bg-indigo-100 text-indigo-800",
  Graphs: "bg-pink-100 text-pink-800",
  Trees: "bg-emerald-100 text-emerald-800",
  Math: "bg-cyan-100 text-cyan-800",
  Sorting: "bg-violet-100 text-violet-800",
};

const CodingLabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Problem | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });

  const problems: Problem[] = [
    {
      id: "PROB1",
      title: "Two Sum",
      difficulty: "Easy",
      category: "Arrays",
      solvedBy: 9542,
      successRate: 74,
      tags: ["Array", "Hash Table"]
    },
    {
      id: "PROB2",
      title: "Merge Sorted Arrays",
      difficulty: "Easy",
      category: "Arrays",
      solvedBy: 7213,
      successRate: 68,
      tags: ["Array", "Two Pointers"]
    },
    {
      id: "PROB3",
      title: "String Manipulation",
      difficulty: "Medium",
      category: "Strings",
      solvedBy: 5428,
      successRate: 56,
      tags: ["String", "Dynamic Programming"]
    },
    {
      id: "PROB4",
      title: "Longest Common Subsequence",
      difficulty: "Hard",
      category: "Dynamic Programming",
      solvedBy: 3241,
      successRate: 42,
      tags: ["Dynamic Programming", "String"]
    },
    {
      id: "PROB5",
      title: "Graph Traversal",
      difficulty: "Medium",
      category: "Graphs",
      solvedBy: 4782,
      successRate: 51,
      tags: ["Graph", "BFS", "DFS"]
    },
    {
      id: "PROB6",
      title: "Binary Tree Inversion",
      difficulty: "Medium",
      category: "Trees",
      solvedBy: 6143,
      successRate: 59,
      tags: ["Tree", "Binary Tree", "Recursion"]
    },
    {
      id: "PROB7",
      title: "Prime Factorization",
      difficulty: "Hard",
      category: "Math",
      solvedBy: 2874,
      successRate: 38,
      tags: ["Math", "Number Theory"]
    },
    {
      id: "PROB8",
      title: "Quick Sort Implementation",
      difficulty: "Hard",
      category: "Sorting",
      solvedBy: 3527,
      successRate: 45,
      tags: ["Sorting", "Divide and Conquer"]
    },
    {
      id: "PROB9",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Strings",
      solvedBy: 8936,
      successRate: 71,
      tags: ["String", "Stack"]
    },
    {
      id: "PROB10",
      title: "Advanced Graph Algorithms",
      difficulty: "Expert",
      category: "Graphs",
      solvedBy: 1523,
      successRate: 29,
      tags: ["Graph", "Advanced"]
    },
  ];

  const contests: Contest[] = [
    {
      id: "CONT1",
      title: "Weekly Challenge #42",
      startDate: "2025-05-09",
      duration: "2 hours",
      registered: 1245,
    },
    {
      id: "CONT2",
      title: "Algorithm Sprint",
      startDate: "2025-05-15",
      duration: "3 hours",
      registered: 874,
    },
    {
      id: "CONT3",
      title: "Data Structures Marathon",
      startDate: "2025-05-22",
      duration: "4 hours",
      registered: 965,
    },
    {
      id: "CONT4",
      title: "Coding Blitz #18",
      startDate: "2025-05-30",
      duration: "1.5 hours",
      registered: 739,
    },
  ];

  const practiceAreas: PracticeArea[] = [
    {
      language: "Python",
      description: "Solve Python coding problems online with Practice Python",
      problemCount: 325,
      color: "bg-amber-600",
      icon: "/lovable-uploads/56b5cafa-b8d1-4b8a-8c9e-ca8b57c5be7f.png"
    },
    {
      language: "Java",
      description: "Complete your Java coding practice with our online Java practice course",
      problemCount: 298,
      color: "bg-orange-700",
      icon: "/lovable-uploads/56b5cafa-b8d1-4b8a-8c9e-ca8b57c5be7f.png"
    },
    {
      language: "C++",
      description: "Master C++ programming with over 250 coding exercises",
      problemCount: 256,
      color: "bg-blue-700",
      icon: "/lovable-uploads/56b5cafa-b8d1-4b8a-8c9e-ca8b57c5be7f.png"
    },
    {
      language: "JavaScript",
      description: "Improve your JavaScript skills with practical coding challenges",
      problemCount: 210,
      color: "bg-yellow-500",
      icon: "/lovable-uploads/56b5cafa-b8d1-4b8a-8c9e-ca8b57c5be7f.png"
    }
  ];

  const categories = [
    "Beginner DSA",
    "Data Structures",
    "Algorithms",
    "Difficulty Rating",
    "Star Wise Paths",
    "Interview Questions",
    "Projects"
  ];

  const sortedProblems = [...problems]
    .filter(problem => {
      if (!searchQuery) return true;
      return problem.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
             problem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
             problem.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

  const requestSort = (key: keyof Problem) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: keyof Problem) => {
    if (sortConfig.key !== name) {
      return null;
    }
    return sortConfig.direction === "ascending" ? (
      <ArrowUp className="inline w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="inline w-4 h-4 ml-1" />
    );
  };

  return (
    <div className="w-full bg-[#121212] min-h-screen text-white">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 border-b border-gray-800 bg-[#1a1a1a] shadow-md">
        <div className="container mx-auto">
          <NavigationMenu className="max-w-full">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-white hover:bg-gray-800 focus:bg-gray-800")}
                  href="/coding-labs"
                >
                  Practice
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800")}
                  href="#"
                >
                  Compete
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800")}
                  href="#"
                >
                  Compiler
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800")}
                  href="#"
                >
                  Courses
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      
      {/* Categories Navigation */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 overflow-x-auto">
        <div className="container mx-auto">
          <div className="flex space-x-6 py-3 px-4">
            {categories.map((category) => (
              <Button 
                key={category}
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome to Practice!</h1>
          <p className="text-lg text-gray-300 max-w-4xl">
            Access 5000+ problems and challenges in coding languages like Python, Java, JavaScript, C++, 
            and SQL. Start with beginner friendly challenges and solve hard problems as you become 
            proficient. Use these practice problems and challenges to prove your coding skills.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl">
          <Input
            type="text"
            placeholder="Search practice problems, topics, or tags..."
            className="bg-[#2a2a2a] border-gray-700 rounded-md pl-10 text-white placeholder:text-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        {/* Main Tabs */}
        <Tabs 
          defaultValue="problems" 
          className="w-full"
        >
          <TabsList className="bg-[#2a2a2a] p-1 mb-6">
            <TabsTrigger 
              value="problems"
              className="data-[state=active]:bg-[#333] data-[state=active]:text-white"
            >
              Problems
            </TabsTrigger>
            <TabsTrigger 
              value="languages"
              className="data-[state=active]:bg-[#333] data-[state=active]:text-white"
            >
              Programming Languages
            </TabsTrigger>
            <TabsTrigger 
              value="contests"
              className="data-[state=active]:bg-[#333] data-[state=active]:text-white"
            >
              Contests
            </TabsTrigger>
          </TabsList>
          
          {/* Problems Tab */}
          <TabsContent value="problems" className="space-y-6">
            <Card className="border-gray-800 bg-[#1a1a1a]">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-white">Problem List</CardTitle>
                <CardDescription>
                  Browse through coding challenges sorted by difficulty and topic
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-[#2a2a2a] border-gray-800">
                        <TableHead 
                          className="cursor-pointer text-gray-300"
                          onClick={() => requestSort("title")}
                        >
                          Problem {getSortIcon("title")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-gray-300"
                          onClick={() => requestSort("difficulty")}
                        >
                          Difficulty {getSortIcon("difficulty")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-gray-300"
                          onClick={() => requestSort("category")}
                        >
                          Category {getSortIcon("category")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-right text-gray-300"
                          onClick={() => requestSort("solvedBy")}
                        >
                          Solved By {getSortIcon("solvedBy")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-right text-gray-300"
                          onClick={() => requestSort("successRate")}
                        >
                          Success Rate {getSortIcon("successRate")}
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProblems.map((problem) => (
                        <TableRow key={problem.id} className="hover:bg-[#2a2a2a] border-gray-800 group">
                          <TableCell>
                            <div>
                              <div className="font-medium text-white">{problem.title}</div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {problem.tags?.map(tag => (
                                  <span key={tag} className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${difficultyColor[problem.difficulty]}`}>
                              {problem.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${categoryColor[problem.category]}`}>
                              {problem.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-gray-300">
                            {problem.solvedBy.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-gray-300">
                            <div className="flex items-center justify-end space-x-2">
                              <span>{problem.successRate}%</span>
                              <div className="w-16 h-2 rounded-full bg-gray-800 overflow-hidden">
                                <div 
                                  className={`h-full ${
                                    problem.successRate > 65 
                                      ? 'bg-green-500' 
                                      : problem.successRate > 40 
                                      ? 'bg-yellow-500' 
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${problem.successRate}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-white hover:text-highlite-accent hover:bg-gray-800"
                            >
                              <Code className="w-4 h-4 mr-1" />
                              Solve
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Programming Languages Tab */}
          <TabsContent value="languages" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Programming Languages</h2>
              <div className="flex items-center text-gray-400">
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Recent Contest Problems <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  Old practice page <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceAreas.map((area) => (
                <Card key={area.language} className={`border-0 overflow-hidden`}>
                  <div className={`h-24 ${area.color} flex items-center justify-center`}>
                    <FileCode className="w-16 h-16 text-white/80" />
                  </div>
                  <CardHeader className="bg-[#1a1a1a]">
                    <CardTitle className="text-xl text-white">Practice {area.language}</CardTitle>
                  </CardHeader>
                  <CardContent className="bg-[#1a1a1a] pt-0">
                    <p className="text-gray-300 text-sm h-16">{area.description}</p>
                    <div className="mt-4 text-sm text-gray-400">
                      <span>{area.problemCount} problems available</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-[#1a1a1a] pt-0">
                    <Button variant="outline" className="w-full border-gray-700 text-highlite-accent hover:bg-gray-800 hover:text-white">
                      Start Practicing
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Contests Tab */}
          <TabsContent value="contests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {contests.map((contest) => (
                <Card key={contest.id} className="overflow-hidden bg-[#1a1a1a] border-gray-800">
                  <div className="h-2 w-full bg-gradient-to-r from-highlite-primary to-highlite-accent"></div>
                  <CardHeader className="border-b border-gray-800">
                    <CardTitle className="text-white truncate">{contest.title}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {new Date(contest.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div className="flex justify-between text-sm pb-2">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-white">{contest.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Participants:</span>
                      <span className="text-white">{contest.registered.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-[#1f1f1f]">
                    <Button className="w-full bg-highlite-accent text-white hover:bg-highlite-light">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card className="bg-[#1a1a1a] border-gray-800 mt-8">
              <CardHeader>
                <CardTitle className="text-white">Your Contest History</CardTitle>
                <CardDescription className="text-gray-400">
                  Review your performance in previous contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800 hover:bg-[#2a2a2a]">
                    <div>
                      <div className="font-medium text-white">Weekly Challenge #41</div>
                      <div className="text-sm text-gray-400 mt-1">April 25, 2025</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">Rank: 178 / 1024</div>
                      <div className="text-sm text-gray-400">Score: 350 points</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800 hover:bg-[#2a2a2a]">
                    <div>
                      <div className="font-medium text-white">Data Structures Marathon</div>
                      <div className="text-sm text-gray-400 mt-1">April 12, 2025</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">Rank: 215 / 872</div>
                      <div className="text-sm text-gray-400">Score: 285 points</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg border border-gray-800 hover:bg-[#2a2a2a]">
                    <div>
                      <div className="font-medium text-white">Coding Blitz #17</div>
                      <div className="text-sm text-gray-400 mt-1">March 28, 2025</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-white">Rank: 93 / 645</div>
                      <div className="text-sm text-gray-400">Score: 420 points</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Skills and Progress Section */}
        <div className="mt-12 space-y-8">
          <h2 className="text-2xl font-bold text-white">Your Progress</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2 border-gray-800 bg-[#1a1a1a]">
              <CardHeader className="pb-2 border-b border-gray-800">
                <CardTitle className="text-xl text-white flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-highlite-accent" />
                  Your Skill Development
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track your progress across different areas
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">Problem Solving</span>
                      <span className="text-gray-400">75%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-highlite-light" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">Data Structures</span>
                      <span className="text-gray-400">62%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-highlite-light" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">Algorithms</span>
                      <span className="text-gray-400">48%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-highlite-light" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">Dynamic Programming</span>
                      <span className="text-gray-400">36%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-highlite-light" style={{ width: '36%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-800 bg-[#1a1a1a]">
              <CardHeader className="pb-3 border-b border-gray-800">
                <CardTitle className="text-xl text-white flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-gray-800">
                    <div className="text-2xl font-bold text-highlite-accent">23</div>
                    <div className="text-sm text-gray-400">Problems Solved</div>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-gray-800">
                    <div className="text-2xl font-bold text-highlite-secondary">5</div>
                    <div className="text-sm text-gray-400">Contests Joined</div>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-gray-800">
                    <div className="text-2xl font-bold text-highlite-accent">12</div>
                    <div className="text-sm text-gray-400">Streak Days</div>
                  </div>
                  <div className="bg-[#2a2a2a] rounded-xl p-4 text-center border border-gray-800">
                    <div className="text-2xl font-bold text-highlite-light">1250</div>
                    <div className="text-sm text-gray-400">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recommended Problems */}
          <Card className="border-gray-800 bg-[#1a1a1a]">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-xl text-white">Recommended for You</CardTitle>
              <CardDescription className="text-gray-400">
                Based on your recent activity and skill level
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {problems.slice(0, 6).map((problem) => (
                  <div 
                    key={`rec-${problem.id}`}
                    className="flex flex-col justify-between p-4 rounded-lg border border-gray-800 bg-[#2a2a2a] hover:bg-[#333] transition-colors"
                  >
                    <div>
                      <div className="font-medium text-white mb-2">{problem.title}</div>
                      <div className="flex items-center gap-2 mb-4">
                        <Badge variant="outline" className={`${difficultyColor[problem.difficulty]}`}>
                          {problem.difficulty}
                        </Badge>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{problem.category}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {problem.tags?.map(tag => (
                          <span key={tag} className="inline-block text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" className="w-full bg-highlite-accent hover:bg-highlite-light">
                      <Code className="w-4 h-4 mr-2" />
                      Start
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodingLabs;
