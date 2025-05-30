
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { toast } from "sonner";
import { 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  BookOpen, 
  CheckCircle, 
  Code, 
  FileCode, 
  GraduationCap, 
  Home,
  LayoutGrid, 
  Play, 
  Search, 
  Star 
} from "lucide-react";
import { cn } from "@/lib/utils";
import CodeEditor from "@/components/CodeEditor";

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

// Modified color schemes with better contrast
const difficultyColor = {
  Easy: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-100 dark:border-green-800",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-800",
  Hard: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-800",
  Expert: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-100 dark:border-red-800",
};

const categoryColor = {
  Arrays: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  Strings: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  "Dynamic Programming": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  Graphs: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  Trees: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100",
  Math: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  Sorting: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
};

const CodingLabs: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("problems");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [showProblemDetails, setShowProblemDetails] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<ProgrammingLanguage>("JavaScript");
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

  const handleProblemClick = (problem: Problem) => {
    setSelectedProblem(problem);
    setShowProblemDetails(true);
    setShowEditor(false);
  };

  const handleRegister = (contestId: string) => {
    toast.success("Registered for contest successfully!");
  };

  const handleLanguageSelect = (language: ProgrammingLanguage) => {
    setSelectedLanguage(language);
    toast.success(`Started practicing ${language}`);
  };

  const handleSolveProblem = () => {
    setShowEditor(true);
  };

  const backToProblems = () => {
    if (showEditor) {
      setShowEditor(false);
    } else {
      setShowProblemDetails(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-b from-[#1a1a2e] to-[#16213e] min-h-screen text-gray-100">
      {/* Top Navigation Bar with Back to Home button */}
      <div className="sticky top-0 z-50 border-b border-gray-700 bg-[#0f3460] shadow-lg">
        <div className="container mx-auto flex justify-between items-center py-2">
          <NavigationMenu className="max-w-full">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <Button 
                  variant="ghost" 
                  className="text-gray-100 hover:text-white hover:bg-[#1a1f4b] flex items-center gap-2"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-[#1a1f4b] text-white hover:bg-[#222a5e] focus:bg-[#222a5e]")}
                  href="/coding-labs"
                >
                  Practice
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-gray-200 hover:text-white hover:bg-[#1a1f4b]")}
                  href="#"
                  onClick={() => toast.info("Compete section coming soon!")}
                >
                  Compete
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={cn(navigationMenuTriggerStyle(), 
                  "bg-transparent text-gray-200 hover:text-white hover:bg-[#1a1f4b]")}
                  href="#"
                  onClick={() => toast.info("Compiler section coming soon!")}
                >
                  Compiler
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/courses">
                  <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-[#1a1f4b]">
                    Courses
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" className="text-gray-200 hover:text-white hover:bg-[#1a1f4b]">
                Dashboard
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="border-[#3f83f8] text-[#3f83f8] bg-transparent hover:bg-[#3f83f8] hover:text-white">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Categories Navigation */}
      <div className="bg-[#0c2853] border-b border-gray-700 overflow-x-auto shadow-md">
        <div className="container mx-auto">
          <div className="flex space-x-6 py-3 px-4">
            {categories.map((category) => (
              <Button 
                key={category}
                variant="ghost" 
                className="text-gray-300 hover:text-white hover:bg-[#1a3a6d]"
                onClick={() => toast.info(`${category} section selected!`)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-8 px-4">
        {/* Code Editor View */}
        {showEditor && selectedProblem ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <Button 
                variant="outline" 
                className="border-gray-500 hover:border-white flex items-center gap-2 bg-transparent"
                onClick={backToProblems}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Problem
              </Button>
              <div className="flex gap-2">
                <Badge variant="outline" className={`${difficultyColor[selectedProblem.difficulty]}`}>
                  {selectedProblem.difficulty}
                </Badge>
                <Badge className={`${categoryColor[selectedProblem.category]}`}>
                  {selectedProblem.category}
                </Badge>
              </div>
            </div>
            
            <Card className="border-gray-700 bg-[#1e2b4d] mb-4 shadow-lg">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-xl text-white">{selectedProblem.title}</CardTitle>
                <CardDescription className="text-gray-300">
                  Solve the problem using {selectedLanguage}
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-gray-700 bg-[#1e2b4d] shadow-lg">
                <CardHeader className="border-b border-gray-700 pb-2">
                  <CardTitle className="text-lg text-white">Problem Description</CardTitle>
                </CardHeader>
                <CardContent className="p-4 max-h-[600px] overflow-y-auto">
                  <div className="prose prose-invert max-w-none">
                    <h3 className="text-white text-xl mb-3">Problem Statement</h3>
                    <p className="text-gray-200 mb-4">
                      This is a detailed description of the {selectedProblem.title} problem. 
                      It includes the context, constraints, and expected output format.
                    </p>
                    <h4 className="text-white text-lg mb-2">Input Format</h4>
                    <p className="text-gray-200 mb-4">
                      The first line contains an integer n (1 ≤ n ≤ 10^5), the size of the input.
                      The second line contains n space-separated integers a₁, a₂, ..., aₙ (1 ≤ aᵢ ≤ 10^9).
                    </p>
                    <h4 className="text-white text-lg mb-2">Output Format</h4>
                    <p className="text-gray-200 mb-4">
                      Print the result as described in the problem statement.
                    </p>
                    <h4 className="text-white text-lg mb-2">Example</h4>
                    <pre className="bg-[#2d3748] p-4 rounded-md text-gray-200 font-mono">
                      <strong className="text-blue-300">Input:</strong><br />
                      5<br />
                      1 2 3 4 5<br /><br />
                      <strong className="text-green-300">Output:</strong><br />
                      15
                    </pre>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-2 px-2">
                  <div className="flex gap-2">
                    {["JavaScript", "Python", "Java", "C++"].map((lang) => (
                      <Button 
                        key={lang} 
                        variant={selectedLanguage === lang ? "default" : "outline"}
                        size="sm"
                        className={selectedLanguage === lang ? 
                          "bg-[#3b82f6] hover:bg-[#2563eb]" : 
                          "border-gray-500 text-gray-300 hover:border-white hover:text-white"
                        }
                        onClick={() => setSelectedLanguage(lang as ProgrammingLanguage)}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#10b981] hover:bg-[#059669] text-white"
                    onClick={() => toast.success("Code submitted successfully!")}
                  >
                    Submit
                  </Button>
                </div>

                <Card className="border-gray-700 bg-transparent h-[600px] flex-grow shadow-lg overflow-hidden">
                  <CodeEditor language={selectedLanguage.toLowerCase()} />
                </Card>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button 
                variant="outline" 
                className="border-gray-500 hover:border-white bg-transparent hover:bg-[#1e2b4d]"
                onClick={() => toast.info("Test cases loaded")}
              >
                Run Test Cases
              </Button>
              <Button 
                className="bg-[#10b981] hover:bg-[#059669] text-white"
                onClick={() => toast.success("Code submitted successfully!")}
              >
                Submit Solution
              </Button>
            </div>
          </div>
        ) : (
          /* Problem Detail View */
          showProblemDetails && selectedProblem ? (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <Button 
                  variant="outline" 
                  className="border-gray-500 hover:border-white flex items-center gap-2 bg-transparent"
                  onClick={() => setShowProblemDetails(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Problems
                </Button>
                <div className="flex gap-2">
                  <Badge variant="outline" className={`${difficultyColor[selectedProblem.difficulty]}`}>
                    {selectedProblem.difficulty}
                  </Badge>
                  <Badge className={`${categoryColor[selectedProblem.category]}`}>
                    {selectedProblem.category}
                  </Badge>
                </div>
              </div>
              
              <Card className="border-gray-700 bg-[#1e2b4d] shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{selectedProblem.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    Problem ID: {selectedProblem.id} | Solved by {selectedProblem.solvedBy.toLocaleString()} users | 
                    Success Rate: {selectedProblem.successRate}%
                  </CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedProblem.tags?.map(tag => (
                      <span key={tag} className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#2a4171] text-gray-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="bg-[#2d3a5d] w-full justify-start mb-4 p-1">
                      <TabsTrigger value="description" className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white">Description</TabsTrigger>
                      <TabsTrigger value="hints" className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white">Hints</TabsTrigger>
                      <TabsTrigger value="solution" className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white">Solution</TabsTrigger>
                      <TabsTrigger value="submissions" className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white">Submissions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description">
                      <div className="prose prose-invert max-w-none">
                        <h3 className="text-white text-xl mb-3">Problem Statement</h3>
                        <p className="text-gray-200 mb-4">
                          This is a detailed description of the {selectedProblem.title} problem. 
                          It includes the context, constraints, and expected output format.
                        </p>
                        <h4 className="text-white text-lg mb-2">Input Format</h4>
                        <p className="text-gray-200 mb-4">
                          The first line contains an integer n (1 ≤ n ≤ 10^5), the size of the input.
                          The second line contains n space-separated integers a₁, a₂, ..., aₙ (1 ≤ aᵢ ≤ 10^9).
                        </p>
                        <h4 className="text-white text-lg mb-2">Output Format</h4>
                        <p className="text-gray-200 mb-4">
                          Print the result as described in the problem statement.
                        </p>
                        <h4 className="text-white text-lg mb-2">Example</h4>
                        <pre className="bg-[#2d3748] p-4 rounded-md text-gray-200 font-mono">
                          <strong className="text-blue-300">Input:</strong><br />
                          5<br />
                          1 2 3 4 5<br /><br />
                          <strong className="text-green-300">Output:</strong><br />
                          15
                        </pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="hints">
                      <div className="space-y-4">
                        <div className="p-4 border border-gray-600 rounded-md bg-[#253152] hover:bg-[#2a395f] transition-colors">
                          <h4 className="font-medium text-white mb-2">Hint 1</h4>
                          <p className="text-gray-300">Think about using a specific data structure to optimize your solution.</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 text-[#60a5fa] hover:text-[#93c5fd] hover:bg-[#2a395f]"
                            onClick={() => toast.info("Hint revealed!")}
                          >
                            Reveal more
                          </Button>
                        </div>
                        <div className="p-4 border border-gray-600 rounded-md bg-[#253152] hover:bg-[#2a395f] transition-colors">
                          <h4 className="font-medium text-white mb-2">Hint 2</h4>
                          <p className="text-gray-300">Consider edge cases with empty inputs or duplicates.</p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="mt-2 text-[#60a5fa] hover:text-[#93c5fd] hover:bg-[#2a395f]"
                            onClick={() => toast.info("Hint revealed!")}
                          >
                            Reveal more
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="solution">
                      <div className="space-y-4">
                        <div className="flex justify-between mb-4">
                          <h3 className="text-xl font-medium text-white">Solution Approach</h3>
                          <Button 
                            variant="outline"
                            className="border-[#60a5fa] text-[#60a5fa] hover:bg-[#60a5fa] hover:text-white"
                            onClick={() => toast.info("Full solution unlocked!")}
                          >
                            Unlock Full Solution
                          </Button>
                        </div>
                        <div className="prose prose-invert max-w-none">
                          <p className="text-gray-300">
                            The key insight to solving this problem efficiently is to use a hash map to 
                            store elements and their frequencies. This allows for O(n) time complexity.
                          </p>
                          <div className="bg-[#2d3748] p-4 rounded-md mt-4">
                            <pre className="text-gray-300 font-mono">
                              <code>
                                {`// Pseudocode solution
function solve(nums) {
  // Initialize hash map
  let map = new Map();
  
  // Count frequencies
  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }
  
  // Process result
  let result = 0;
  // ... solution implementation
  
  return result;
}`}
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="submissions">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <h3 className="text-xl font-medium text-white">Your Submissions</h3>
                          <Button 
                            variant="outline"
                            className="border-gray-500 hover:border-white text-white"
                            onClick={() => toast.info("Viewing all submissions")}
                          >
                            View All
                          </Button>
                        </div>
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="hover:bg-[#2d3a5d] border-gray-700">
                                <TableHead className="text-gray-300">Timestamp</TableHead>
                                <TableHead className="text-gray-300">Language</TableHead>
                                <TableHead className="text-gray-300">Status</TableHead>
                                <TableHead className="text-gray-300">Runtime</TableHead>
                                <TableHead className="text-gray-300">Memory</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow className="hover:bg-[#2d3a5d] border-gray-700">
                                <TableCell className="text-gray-200">2025-05-02 10:15 AM</TableCell>
                                <TableCell className="text-gray-200">Python</TableCell>
                                <TableCell>
                                  <Badge className="bg-[#10b981]">Accepted</Badge>
                                </TableCell>
                                <TableCell className="text-gray-200">52 ms</TableCell>
                                <TableCell className="text-gray-200">16.2 MB</TableCell>
                              </TableRow>
                              <TableRow className="hover:bg-[#2d3a5d] border-gray-700">
                                <TableCell className="text-gray-200">2025-05-01 03:42 PM</TableCell>
                                <TableCell className="text-gray-200">JavaScript</TableCell>
                                <TableCell>
                                  <Badge className="bg-[#ef4444]">Time Limit Exceeded</Badge>
                                </TableCell>
                                <TableCell className="text-gray-200">N/A</TableCell>
                                <TableCell className="text-gray-200">N/A</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-700 pt-6">
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="border-gray-500 hover:border-white bg-transparent hover:bg-[#2d3a5d]"
                      onClick={() => toast.info("Problem notes saved!")}
                    >
                      Save Notes
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-gray-500 hover:border-white bg-transparent hover:bg-[#2d3a5d]"
                      onClick={() => toast.info("Problem bookmarked!")}
                    >
                      Bookmark
                    </Button>
                  </div>
                  <Button 
                    className="bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                    onClick={handleSolveProblem}
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Solve Problem
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <>
              {/* Hero Section */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Practice!</h1>
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
                  className="bg-[#253152] border-gray-600 rounded-md pl-10 text-white placeholder:text-gray-400 focus-visible:ring-[#3b82f6] focus-visible:border-[#3b82f6]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </>
          )
        )}
        
        {/* Main Tabs - Only show if not viewing problem details or editor */}
        {!showProblemDetails && !showEditor && (
          <Tabs 
            defaultValue={activeTab} 
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-[#253152] p-1 mb-6 w-full justify-start">
              <TabsTrigger 
                value="problems"
                className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white"
              >
                Problems
              </TabsTrigger>
              <TabsTrigger 
                value="languages"
                className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white"
              >
                Programming Languages
              </TabsTrigger>
              <TabsTrigger 
                value="contests"
                className="data-[state=active]:bg-[#3b5081] data-[state=active]:text-white"
              >
                Contests
              </TabsTrigger>
            </TabsList>
            
            {/* Problems Tab */}
            <TabsContent value="problems" className="space-y-6">
              <Card className="border-gray-700 bg-[#1e2b4d] shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl text-white">Problem List</CardTitle>
                  <CardDescription className="text-gray-300">
                    Browse through coding challenges sorted by difficulty and topic
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-[#2d3a5d] border-gray-700">
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
                          <TableRow key={problem.id} className="hover:bg-[#2d3a5d] border-gray-700 group">
                            <TableCell>
                              <div>
                                <div 
                                  className="font-medium text-gray-100 cursor-pointer hover:text-[#60a5fa] transition-colors"
                                  onClick={() => handleProblemClick(problem)}
                                >
                                  {problem.title}
                                </div>
                                <div className="mt-1 flex flex-wrap gap-1">
                                  {problem.tags?.map(tag => (
                                    <span key={tag} className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#2a4171] text-gray-300">
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
                                <div className="w-16 h-2 rounded-full bg-gray-700 overflow-hidden">
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
                                className="text-white hover:text-[#60a5fa] hover:bg-[#2d3a5d] opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handleProblemClick(problem)}
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
                <div className="flex items-center text-gray-300">
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-[#2d3a5d]"
                    onClick={() => toast.info("Viewing recent contest problems")}
                  >
                    Recent Contest Problems <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-[#2d3a5d]"
                    onClick={() => toast.info("Viewing old practice page")}
                  >
                    Old practice page <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {practiceAreas.map((area) => (
                  <Card key={area.language} className="border-0 overflow-hidden shadow-lg bg-transparent">
                    <div className={`h-24 ${area.color} flex items-center justify-center`}>
                      <FileCode className="w-16 h-16 text-white/90" />
                    </div>
                    <CardHeader className="bg-[#1e2b4d] border-b border-gray-700">
                      <CardTitle className="text-xl text-white">Practice {area.language}</CardTitle>
                    </CardHeader>
                    <CardContent className="bg-[#1e2b4d] pt-3">
                      <p className="text-gray-300 text-sm h-16">{area.description}</p>
                      <div className="mt-4 text-sm text-gray-400">
                        <span>{area.problemCount} problems available</span>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-[#1e2b4d] pt-0">
                      <Button 
                        variant="outline" 
                        className="w-full border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white"
                        onClick={() => handleLanguageSelect(area.language)}
                      >
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
                  <Card key={contest.id} className="overflow-hidden bg-[#1e2b4d] border-gray-700 shadow-lg">
                    <div className="h-2 w-full bg-gradient-to-r from-[#3b82f6] to-[#60a5fa]"></div>
                    <CardHeader className="border-b border-gray-700">
                      <CardTitle className="text-white truncate">{contest.title}</CardTitle>
                      <CardDescription className="text-gray-300">
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
                    <CardFooter className="bg-[#253152]">
                      <Button 
                        className="w-full bg-[#3b82f6] text-white hover:bg-[#2563eb]"
                        onClick={() => handleRegister(contest.id)}
                      >
                        Register
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <Card className="bg-[#1e2b4d] border-gray-700 mt-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-white">Your Contest History</CardTitle>
                  <CardDescription className="text-gray-300">
                    Review your performance in previous contests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-[#253152] hover:bg-[#2d3a5d] transition-colors">
                      <div>
                        <div className="font-medium text-white">Weekly Challenge #41</div>
                        <div className="text-sm text-gray-400 mt-1">April 25, 2025</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">Rank: 178 / 1024</div>
                        <div className="text-sm text-gray-400">Score: 350 points</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-[#253152] hover:bg-[#2d3a5d] transition-colors">
                      <div>
                        <div className="font-medium text-white">Data Structures Marathon</div>
                        <div className="text-sm text-gray-400 mt-1">April 12, 2025</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">Rank: 215 / 872</div>
                        <div className="text-sm text-gray-400">Score: 285 points</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-[#253152] hover:bg-[#2d3a5d] transition-colors">
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
        )}
        
        {/* Skills and Progress Section - Only show if not viewing problem details or editor */}
        {!showProblemDetails && !showEditor && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold text-white">Your Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 border-gray-700 bg-[#1e2b4d] shadow-lg">
                <CardHeader className="pb-2 border-b border-gray-700">
                  <CardTitle className="text-xl text-white flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2 text-[#60a5fa]" />
                    Your Skill Development
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Track your progress across different areas
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-white">Problem Solving</span>
                        <span className="text-gray-300">75%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60a5fa]" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-white">Data Structures</span>
                        <span className="text-gray-300">62%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60a5fa]" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-white">Algorithms</span>
                        <span className="text-gray-300">48%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60a5fa]" style={{ width: '48%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-white">Dynamic Programming</span>
                        <span className="text-gray-300">36%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60a5fa]" style={{ width: '36%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-[#1e2b4d] shadow-lg">
                <CardHeader className="pb-3 border-b border-gray-700">
                  <CardTitle className="text-xl text-white flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#253152] rounded-xl p-4 text-center border border-gray-700 hover:border-[#60a5fa] transition-colors">
                      <div className="text-2xl font-bold text-[#60a5fa]">23</div>
                      <div className="text-sm text-gray-300">Problems Solved</div>
                    </div>
                    <div className="bg-[#253152] rounded-xl p-4 text-center border border-gray-700 hover:border-[#60a5fa] transition-colors">
                      <div className="text-2xl font-bold text-[#60a5fa]">5</div>
                      <div className="text-sm text-gray-300">Contests Joined</div>
                    </div>
                    <div className="bg-[#253152] rounded-xl p-4 text-center border border-gray-700 hover:border-[#60a5fa] transition-colors">
                      <div className="text-2xl font-bold text-[#60a5fa]">12</div>
                      <div className="text-sm text-gray-300">Streak Days</div>
                    </div>
                    <div className="bg-[#253152] rounded-xl p-4 text-center border border-gray-700 hover:border-[#60a5fa] transition-colors">
                      <div className="text-2xl font-bold text-[#60a5fa]">1250</div>
                      <div className="text-sm text-gray-300">Rating</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recommended Problems */}
            <Card className="border-gray-700 bg-[#1e2b4d] shadow-lg">
              <CardHeader className="border-b border-gray-700">
                <CardTitle className="text-xl text-white">Recommended for You</CardTitle>
                <CardDescription className="text-gray-300">
                  Based on your recent activity and skill level
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {problems.slice(0, 6).map((problem) => (
                    <div 
                      key={`rec-${problem.id}`}
                      className="flex flex-col justify-between p-4 rounded-lg border border-gray-700 bg-[#253152] hover:bg-[#2d3a5d] hover:border-[#60a5fa] transition-all"
                    >
                      <div>
                        <div 
                          className="font-medium text-white mb-2 cursor-pointer hover:text-[#60a5fa] transition-colors"
                          onClick={() => handleProblemClick(problem)}
                        >
                          {problem.title}
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <Badge variant="outline" className={`${difficultyColor[problem.difficulty]}`}>
                            {problem.difficulty}
                          </Badge>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{problem.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {problem.tags?.map(tag => (
                            <span key={tag} className="inline-block text-xs px-2 py-0.5 rounded-full bg-[#2a4171] text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white"
                        onClick={() => handleProblemClick(problem)}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingLabs;

