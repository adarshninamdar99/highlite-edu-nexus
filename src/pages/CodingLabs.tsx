import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Award, 
  BookOpen, 
  Code, 
  FileText,
  MessageSquare, 
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Play
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the challenge structure
interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

interface Challenge {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  description: string;
  constraints: string;
  inputFormat: string;
  outputFormat: string;
  testCases: TestCase[];
  timeLimit: number; // in seconds
  memoryLimit: number; // in MB
  points: number;
  successRate: number;
  submissions: number;
  sampleCode: {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  };
}

// Mock challenges data
const challengesData: Challenge[] = [
  {
    id: "ch001",
    title: "Two Sum",
    difficulty: "easy",
    tags: ["arrays", "hash table", "algorithms"],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
    
You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    inputFormat: "First line: The target value\nSecond line: The array of integers separated by space",
    outputFormat: "Two integers separated by space, representing indices of elements that sum up to target",
    testCases: [
      {
        input: "9\n2 7 11 15",
        output: "0 1"
      },
      {
        input: "6\n3 2 4",
        output: "1 2"
      },
      {
        input: "6\n3 3",
        output: "0 1"
      },
      {
        isHidden: true,
        input: "0\n-1 1 0 -3 3",
        output: "2 4"
      }
    ],
    timeLimit: 1,
    memoryLimit: 128,
    points: 10,
    successRate: 68.5,
    submissions: 2453,
    sampleCode: {
      python: `def two_sum(nums, target):
    # Your code here
    pass`,
      javascript: `function twoSum(nums, target) {
    // Your code here
}`,
      java: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    // Your code here
    return {};
}`
    }
  },
  {
    id: "ch002",
    title: "Valid Parentheses",
    difficulty: "easy",
    tags: ["stack", "string", "data structures"],
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'",
    inputFormat: "A string containing only parentheses characters",
    outputFormat: "True if the string is valid, False otherwise",
    testCases: [
      {
        input: "()",
        output: "True"
      },
      {
        input: "()[]{}",
        output: "True"
      },
      {
        input: "(]",
        output: "False"
      },
      {
        input: "([)]",
        output: "False"
      },
      {
        isHidden: true,
        input: "{[]}",
        output: "True"
      }
    ],
    timeLimit: 1,
    memoryLimit: 128,
    points: 15,
    successRate: 72.1,
    submissions: 1892,
    sampleCode: {
      python: `def is_valid(s):
    # Your code here
    pass`,
      javascript: `function isValid(s) {
    // Your code here
}`,
      java: `public class Solution {
    public boolean isValid(String s) {
        // Your code here
        return false;
    }
}`,
      cpp: `bool isValid(string s) {
    // Your code here
    return false;
}`
    }
  },
  {
    id: "ch003",
    title: "BFS Graph Traversal",
    difficulty: "medium",
    tags: ["graph", "bfs", "algorithms"],
    description: `Given an undirected graph represented as an adjacency list, perform a breadth-first search starting from vertex 0.
Return the order of visited vertices.

For example, given the following graph:
\`\`\`
0 -- 1 -- 2
|    |
3 -- 4
\`\`\`

A BFS starting from vertex 0 would return: [0, 1, 3, 2, 4] or [0, 3, 1, 4, 2] depending on the order in your adjacency list.`,
    constraints: "1 <= number of vertices <= 100\n0 <= vertex value < number of vertices",
    inputFormat: "First line: n (number of vertices)\nNext n lines: space-separated integers representing adjacent vertices for vertex i",
    outputFormat: "Space-separated integers representing BFS traversal order",
    testCases: [
      {
        input: "5\n1 3\n0 2 4\n1\n0 4\n1 3",
        output: "0 1 3 2 4"
      },
      {
        input: "3\n1 2\n0\n0",
        output: "0 1 2"
      },
      {
        input: "6\n1 2\n0 3 4\n0 5\n1\n1\n2",
        output: "0 1 2 3 4 5"
      }
    ],
    timeLimit: 2,
    memoryLimit: 256,
    points: 25,
    successRate: 54.8,
    submissions: 1245,
    sampleCode: {
      python: `def bfs(graph, start):
    # Your code here
    pass`,
      javascript: `function bfs(graph, start) {
    // Your code here
}`,
      java: `public class Solution {
    public List<Integer> bfs(List<List<Integer>> graph, int start) {
        // Your code here
        return new ArrayList<>();
    }
}`,
      cpp: `vector<int> bfs(vector<vector<int>>& graph, int start) {
    // Your code here
    return {};
}`
    }
  },
  {
    id: "ch004",
    title: "Dynamic Programming: Coin Change",
    difficulty: "hard",
    tags: ["dynamic programming", "algorithms"],
    description: `You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.`,
    constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
    inputFormat: "First line: amount\nSecond line: Array of coin denominations separated by space",
    outputFormat: "Minimum number of coins needed or -1 if not possible",
    testCases: [
      {
        input: "11\n1 2 5",
        output: "3"
      },
      {
        input: "3\n2",
        output: "-1"
      },
      {
        input: "0\n1",
        output: "0"
      },
      {
        isHidden: true,
        input: "100\n1 5 10 25",
        output: "4"
      }
    ],
    timeLimit: 3,
    memoryLimit: 512,
    points: 40,
    successRate: 38.2,
    submissions: 856,
    sampleCode: {
      python: `def coin_change(coins, amount):
    # Your code here
    pass`,
      javascript: `function coinChange(coins, amount) {
    // Your code here
}`,
      java: `public class Solution {
    public int coinChange(int[] coins, int amount) {
        // Your code here
        return -1;
    }
}`,
      cpp: `int coinChange(vector<int>& coins, int amount) {
    // Your code here
    return -1;
}`
    }
  }
];

const CodingLabs = () => {
  const [selectedTab, setSelectedTab] = useState("challenges");
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(challengesData[0]);
  const [codeLanguage, setCodeLanguage] = useState<"python" | "javascript" | "java" | "cpp">("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  
  const filterChallengesByTag = (tag: string) => {
    if (tag === "all") return challengesData;
    return challengesData.filter(challenge => challenge.tags.includes(tag));
  };
  
  const filterChallengesByDifficulty = (difficulty: string) => {
    if (difficulty === "all") return challengesData;
    return challengesData.filter(challenge => challenge.difficulty === difficulty);
  };
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState("all");
  const filteredChallenges = filterChallengesByTag(activeFilter)
    .filter(challenge => activeDifficultyFilter === "all" || challenge.difficulty === activeDifficultyFilter);
  
  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Running your code...\n\n");
    
    // Simulate code execution with a delay
    setTimeout(() => {
      const results = selectedChallenge?.testCases
        .filter(tc => !tc.isHidden)
        .map((testCase, index) => {
          // Simulate checking the output
          const passed = Math.random() > 0.5; // 50% chance of passing each test case for demo
          return `Test case ${index + 1}: ${passed ? "✅ PASSED" : "❌ FAILED"}\n` +
                 `Input: ${testCase.input}\n` +
                 `Expected output: ${testCase.output}\n` +
                 `Your output: ${passed ? testCase.output : "Incorrect output"}\n\n`;
        })
        .join("");
      
      setOutput(prev => prev + results + "\nExecution completed.");
      setIsRunning(false);
    }, 2000);
  };
  
  const handleSubmitSolution = () => {
    setIsRunning(true);
    setOutput("Evaluating your solution against all test cases...\n\n");
    
    // Simulate solution evaluation with a delay
    setTimeout(() => {
      // Calculate a random score between 0 and 100
      const score = Math.floor(Math.random() * 101);
      const passed = score >= 70;
      
      const results = selectedChallenge?.testCases.map((testCase, index) => {
        const testPassed = Math.random() > 0.3; // 70% chance of passing each test case
        return `Test case ${index + 1}${testCase.isHidden ? " (hidden)" : ""}: ${testPassed ? "✅ PASSED" : "❌ FAILED"}\n`;
      }).join("");
      
      const feedback = `${results}\n\nScore: ${score}/100\n` +
                      `Status: ${passed ? "✅ Challenge completed!" : "❌ Try again."}\n` +
                      `${passed ? "Congratulations! You've successfully solved this challenge." : "Keep trying. You're getting closer to the solution."}`;
      
      setOutput(feedback);
      setIsRunning(false);
    }, 3000);
  };
  
  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setCode(challenge.sampleCode[codeLanguage]);
    setOutput("");
  };
  
  const handleChangeLanguage = (lang: "python" | "javascript" | "java" | "cpp") => {
    setCodeLanguage(lang);
    if (selectedChallenge) {
      setCode(selectedChallenge.sampleCode[lang]);
    }
  };
  
  // Calculate progress stats
  const completedChallenges = 2; // Mock data
  const totalChallenges = challengesData.length;
  const completionPercentage = (completedChallenges / totalChallenges) * 100;
  
  // Get difficulty distribution
  const easyCount = challengesData.filter(c => c.difficulty === "easy").length;
  const mediumCount = challengesData.filter(c => c.difficulty === "medium").length;
  const hardCount = challengesData.filter(c => c.difficulty === "hard").length;

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Coding Labs</h1>
          <p className="text-muted-foreground">Practice coding and improve your skills with interactive challenges</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <FileText className="h-4 w-4" />
            Submissions
          </Button>
          <Button variant="outline" className="gap-1">
            <Award className="h-4 w-4" />
            Leaderboard
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="challenges" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
          <TabsTrigger value="my-progress">My Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="space-y-4">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Left sidebar - Challenges list */}
            <Card className="lg:col-span-1 h-[calc(100vh-200px)]">
              <CardHeader className="pb-3">
                <CardTitle>Challenge Browser</CardTitle>
                <CardDescription>Browse challenges by category and difficulty</CardDescription>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Button 
                    onClick={() => setActiveFilter("all")}
                    variant={activeFilter === "all" ? "default" : "outline"}
                    size="sm" 
                    className="rounded-full"
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("arrays")}
                    variant={activeFilter === "arrays" ? "default" : "outline"}
                    size="sm" 
                    className="rounded-full"
                  >
                    Arrays
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("data structures")}
                    variant={activeFilter === "data structures" ? "default" : "outline"}
                    size="sm" 
                    className="rounded-full"
                  >
                    Data Structures
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("algorithms")}
                    variant={activeFilter === "algorithms" ? "default" : "outline"}
                    size="sm" 
                    className="rounded-full"
                  >
                    Algorithms
                  </Button>
                  <Button 
                    onClick={() => setActiveFilter("graph")}
                    variant={activeFilter === "graph" ? "default" : "outline"}
                    size="sm" 
                    className="rounded-full"
                  >
                    Graphs
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-2">
                  <Button 
                    onClick={() => setActiveDifficultyFilter("all")}
                    variant={activeDifficultyFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className={cn("rounded-full", activeDifficultyFilter === "all" ? "" : "border-muted-foreground")}
                  >
                    All
                  </Button>
                  <Button 
                    onClick={() => setActiveDifficultyFilter("easy")}
                    variant={activeDifficultyFilter === "easy" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full", 
                      activeDifficultyFilter === "easy" 
                        ? "bg-green-600 hover:bg-green-700" 
                        : "border-green-600 text-green-600 hover:bg-green-100"
                    )}
                  >
                    Easy
                  </Button>
                  <Button 
                    onClick={() => setActiveDifficultyFilter("medium")}
                    variant={activeDifficultyFilter === "medium" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full", 
                      activeDifficultyFilter === "medium" 
                        ? "bg-yellow-600 hover:bg-yellow-700" 
                        : "border-yellow-600 text-yellow-600 hover:bg-yellow-100"
                    )}
                  >
                    Medium
                  </Button>
                  <Button 
                    onClick={() => setActiveDifficultyFilter("hard")}
                    variant={activeDifficultyFilter === "hard" ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "rounded-full", 
                      activeDifficultyFilter === "hard" 
                        ? "bg-red-600 hover:bg-red-700" 
                        : "border-red-600 text-red-600 hover:bg-red-100"
                    )}
                  >
                    Hard
                  </Button>
                </div>
              </CardHeader>
              
              <Separator />
              
              <ScrollArea className="h-[calc(100vh-320px)]">
                <CardContent className="py-2">
                  <div className="space-y-2">
                    {filteredChallenges.map((challenge) => (
                      <div 
                        key={challenge.id}
                        className={cn(
                          "p-3 rounded-md cursor-pointer border",
                          selectedChallenge?.id === challenge.id ? "bg-muted" : "hover:bg-muted/50",
                        )}
                        onClick={() => handleSelectChallenge(challenge)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm font-medium">{challenge.title}</div>
                            <div className="flex items-center gap-1 mt-1">
                              <Badge
                                className={cn(
                                  "text-xs font-normal",
                                  challenge.difficulty === "easy" && "bg-green-600",
                                  challenge.difficulty === "medium" && "bg-yellow-600",
                                  challenge.difficulty === "hard" && "bg-red-600"
                                )}
                              >
                                {challenge.difficulty}
                              </Badge>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {challenge.timeLimit}s
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {challenge.points} pts
                              </span>
                            </div>
                          </div>
                          {Math.random() > 0.5 && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </ScrollArea>
            </Card>
            
            {/* Right content area - Challenge detail */}
            <div className="lg:col-span-2 space-y-4">
              {selectedChallenge && (
                <>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-2xl">{selectedChallenge.title}</CardTitle>
                          <div className="flex gap-2 mt-2">
                            <Badge
                              className={cn(
                                selectedChallenge.difficulty === "easy" && "bg-green-600",
                                selectedChallenge.difficulty === "medium" && "bg-yellow-600",
                                selectedChallenge.difficulty === "hard" && "bg-red-600"
                              )}
                            >
                              {selectedChallenge.difficulty}
                            </Badge>
                            {selectedChallenge.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="border-muted-foreground">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-2 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-medium">{selectedChallenge.successRate}% success</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {selectedChallenge.submissions} submissions
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <Separator />
                    
                    <CardContent className="pt-4 pb-2">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-semibold text-sm mb-1">Problem Statement</h3>
                          <p className="text-sm whitespace-pre-line">{selectedChallenge.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Input Format</h3>
                            <p className="text-sm bg-muted p-2 rounded whitespace-pre-line">{selectedChallenge.inputFormat}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Output Format</h3>
                            <p className="text-sm bg-muted p-2 rounded whitespace-pre-line">{selectedChallenge.outputFormat}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-sm mb-1">Constraints</h3>
                          <p className="text-sm bg-muted p-2 rounded whitespace-pre-line">{selectedChallenge.constraints}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-sm mb-1">Example Test Cases</h3>
                          <div className="space-y-3">
                            {selectedChallenge.testCases.filter(tc => !tc.isHidden).map((testCase, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                <div className="bg-muted/70 p-2 rounded text-xs">
                                  <div className="font-semibold">Input:</div>
                                  <pre className="whitespace-pre-wrap">{testCase.input}</pre>
                                </div>
                                <div className="bg-muted/70 p-2 rounded text-xs">
                                  <div className="font-semibold">Output:</div>
                                  <pre className="whitespace-pre-wrap">{testCase.output}</pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Code Editor Section */}
                  <Card>
                    <CardHeader className="pb-3 pt-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">Solution</CardTitle>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleChangeLanguage("python")} 
                            variant={codeLanguage === "python" ? "default" : "outline"} 
                            size="sm"
                          >
                            Python
                          </Button>
                          <Button 
                            onClick={() => handleChangeLanguage("javascript")} 
                            variant={codeLanguage === "javascript" ? "default" : "outline"} 
                            size="sm"
                          >
                            JavaScript
                          </Button>
                          <Button 
                            onClick={() => handleChangeLanguage("java")} 
                            variant={codeLanguage === "java" ? "default" : "outline"} 
                            size="sm"
                          >
                            Java
                          </Button>
                          <Button 
                            onClick={() => handleChangeLanguage("cpp")} 
                            variant={codeLanguage === "cpp" ? "default" : "outline"} 
                            size="sm"
                          >
                            C++
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-0">
                      {/* Code editor mockup */}
                      <div className="relative">
                        <div className="font-mono text-sm bg-zinc-900 text-zinc-50 p-4 rounded-md h-[320px] overflow-auto">
                          <pre>
                            {selectedChallenge.sampleCode[codeLanguage]}
                          </pre>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4 mb-2 gap-2">
                        <div className="flex gap-2">
                          <Button
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="gap-2"
                          >
                            <Play className="h-4 w-4" />
                            Run Code
                          </Button>
                          <Button
                            onClick={handleSubmitSolution}
                            disabled={isRunning}
                            variant="default"
                            className="gap-2"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Submit Solution
                          </Button>
                        </div>
                        
                        <Button variant="outline" className="gap-2">
                          <MessageSquare className="h-4 w-4" />
                          Ask AI Assistant
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Output Section */}
                  {output && (
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-sm">Output</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="font-mono text-sm bg-zinc-900 text-zinc-50 p-4 rounded-md max-h-[200px] overflow-auto">
                          <pre className="whitespace-pre-wrap">{output}</pre>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Learning Path Tab */}
        <TabsContent value="learning-path" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Algorithmic Thinking Learning Path</CardTitle>
              <CardDescription>Master essential algorithmic concepts with structured progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">1. Fundamentals</h3>
                    <Badge>In Progress</Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    <Card className="bg-muted/50">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm">Two Sum</CardTitle>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/50">
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-sm">Valid Parentheses</CardTitle>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      </CardHeader>
                    </Card>
                    <Card className="border-dashed border-2 border-muted">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">Array Rotation</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">2. Intermediate Algorithms</h3>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    <Card className="bg-muted/20 opacity-60">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">BFS Graph Traversal</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/20 opacity-60">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">Binary Search</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/20 opacity-60">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">Merge Sort</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">3. Advanced Techniques</h3>
                    <Badge variant="outline">Locked</Badge>
                  </div>
                  <Progress value={0} className="h-2" />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                    <Card className="bg-muted/20 opacity-60">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">Dynamic Programming</CardTitle>
                      </CardHeader>
                    </Card>
                    <Card className="bg-muted/20 opacity-60">
                      <CardHeader className="py-4">
                        <CardTitle className="text-sm text-muted-foreground">Greedy Algorithms</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* My Progress Tab */}
        <TabsContent value="my-progress" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Progress</CardTitle>
                <CardDescription>Your overall completion rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40 flex items-center justify-center">
                    {/* Circle representing progress */}
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle
                        className="text-muted stroke-current"
                        strokeWidth="8"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                      />
                      <circle
                        className="text-primary stroke-current"
                        strokeWidth="8"
                        strokeLinecap="round"
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        strokeDasharray={`${completionPercentage * 2.51} ${251 - completionPercentage * 2.51}`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <span className="text-3xl font-bold">
                        {Math.round(completionPercentage)}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {completedChallenges}/{totalChallenges} challenges
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Difficulty Distribution</CardTitle>
                <CardDescription>Your solved challenges by difficulty</CardDescription>
              </CardHeader>
              <CardContent className="pb-1">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Easy</span>
                      <span>2/{easyCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={(2 / easyCount) * 100} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-green-600 rounded-full" 
                        style={{ width: `${(2 / easyCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Medium</span>
                      <span>0/{mediumCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={0} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-yellow-600 rounded-full" 
                        style={{ width: `0%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Hard</span>
                      <span>0/{hardCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={0} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-red-600 rounded-full" 
                        style={{ width: `0%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Solved: Two Sum</p>
                      <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Solved: Valid Parentheses</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:12 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <Play className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Started: BFS Graph Traversal</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills Radar</CardTitle>
              <CardDescription>Your proficiency across different algorithm categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {/* Radar chart would go here in a real implementation */}
                <div className="text-center text-muted-foreground">
                  <p>Skills visualization chart</p>
                  <p className="text-sm">Complete more challenges to see your skills radar</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingLabs;
