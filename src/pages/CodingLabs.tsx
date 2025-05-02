
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Code,
  BookOpen,
  Play,
  Clock,
  Star,
  Trophy,
  GraduationCap,
  Bookmark,
  BookMarked,
  Search,
  Filter,
  ListFilter,
  FileCode,
  CheckCircle,
  Terminal,
  FileCode2,
  BookText,
  Settings,
  MessageSquare,
  Users,
  Share2,
  Download,
  RefreshCw,
  Save,
  Info
} from "lucide-react";

// Code editor styling component
const CodeEditor = ({ language, code, onChange }) => {
  return (
    <div className="relative rounded-md overflow-hidden border h-[400px]">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4" />
          <span className="text-sm">{language}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[350px] bg-slate-950 text-white font-mono p-4">
        <Textarea 
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[340px] bg-transparent text-white border-none focus-visible:ring-0 resize-none font-mono"
          placeholder="Write your code here..."
        />
      </ScrollArea>
    </div>
  );
};

// Terminal output component
const TerminalOutput = ({ output }) => {
  return (
    <div className="rounded-md overflow-hidden border">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-white">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span className="text-sm">Console Output</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[150px] bg-slate-900 text-white font-mono p-4">
        <pre className="whitespace-pre-wrap text-sm">
          {output || "// Run your code to see the output here"}
        </pre>
      </ScrollArea>
    </div>
  );
};

// AI Assistant component
const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help you with your coding problems. What are you working on today?' }
  ]);
  const [input, setInput] = useState('');
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const newMessages = [
      ...messages,
      { role: 'user', content: input }
    ];
    
    setMessages(newMessages);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = {
        fibonacci: "I see you're working on the Fibonacci sequence! Remember that you can solve it using recursion, but a more efficient approach would be using dynamic programming or a simple iterative solution to avoid stack overflow for larger inputs.",
        binary: "For binary search, remember the key requirements: the array must be sorted, and the algorithm works by repeatedly dividing the search interval in half. The time complexity is O(log n).",
        default: "I see you're working on this problem. Remember to break it down into smaller steps. Would you like a hint or explanation of a specific part of the solution?"
      };

      let responseContent = aiResponses.default;
      if (input.toLowerCase().includes('fibonacci')) {
        responseContent = aiResponses.fibonacci;
      } else if (input.toLowerCase().includes('binary') || input.toLowerCase().includes('search')) {
        responseContent = aiResponses.binary;
      }

      setMessages([
        ...newMessages,
        { role: 'assistant', content: responseContent }
      ]);
    }, 1000);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3">
        <CardTitle className="text-lg flex items-center">
          <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
          AI Code Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden flex flex-col p-0 pb-0">
        <ScrollArea className="flex-grow px-4">
          <div className="space-y-4 pt-1 pb-4">
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-blue-500 text-white'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask a question about your code..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Code challenge card component
const ChallengeCard = ({ challenge, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col cursor-pointer" onClick={() => onSelect(challenge)}>
        <div className="relative">
          <AspectRatio ratio={16/9}>
            <div className={`w-full h-full ${challenge.bgColor} flex items-center justify-center`}>
              <challenge.icon className="h-12 w-12 text-white" />
            </div>
          </AspectRatio>
          <div className="absolute top-2 right-2">
            <Badge variant={challenge.difficulty === 'Easy' ? 'outline' : 
                  challenge.difficulty === 'Medium' ? 'secondary' : 'default'}>
              {challenge.difficulty}
            </Badge>
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{challenge.title}</CardTitle>
          <CardDescription className="flex gap-2 items-center text-xs">
            <Users className="h-3 w-3" />
            {challenge.completions} completions
            <span className="mx-1">•</span>
            <Clock className="h-3 w-3" />
            {challenge.estimatedTime}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {challenge.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="w-full">
            {challenge.completed ? (
              <div className="flex justify-between items-center text-sm text-green-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Completed
                </div>
                <span>{challenge.completedAt}</span>
              </div>
            ) : (
              challenge.started ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-1" />
                </div>
              ) : (
                <Button size="sm" className="w-full mt-2">
                  <Play className="h-3 w-3 mr-2" /> Start Challenge
                </Button>
              )
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Learning path component
const LearningPathCard = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Your Coding Path</CardTitle>
        <CardDescription>Personalized learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-blue-100 dark:before:bg-blue-800">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-100 dark:bg-blue-900">
              <CheckCircle className="h-3 w-3 text-blue-600" />
            </div>
            <h3 className="font-medium">Basics of Programming</h3>
            <p className="text-sm text-muted-foreground">Variables, conditionals, loops</p>
          </div>
          
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-blue-100 dark:before:bg-blue-800">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-600 text-white">
              <span className="text-xs">2</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Data Structures</h3>
              <p className="text-sm text-muted-foreground">Arrays, linked lists, trees</p>
              <Progress value={65} className="h-1.5 mt-1" />
            </div>
          </div>
          
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-gray-100 dark:before:bg-gray-800">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <span className="text-xs">3</span>
            </div>
            <h3 className="font-medium text-muted-foreground">Algorithms</h3>
            <p className="text-sm text-muted-foreground">Sorting, searching, recursion</p>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
              <span className="text-xs">4</span>
            </div>
            <h3 className="font-medium text-muted-foreground">Advanced Topics</h3>
            <p className="text-sm text-muted-foreground">Dynamic programming, graphs</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Complete Path</Button>
      </CardFooter>
    </Card>
  );
};

// Achievement card component
const AchievementsCard = () => {
  const achievements = [
    { name: "First Code", description: "Write your first program", earned: true },
    { name: "Bug Hunter", description: "Fix 5 bugs in your code", earned: true },
    { name: "Algorithm Master", description: "Complete 3 algorithm challenges", earned: false },
    { name: "Fast Solver", description: "Solve a challenge in under 5 minutes", earned: false },
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Achievements</CardTitle>
        <CardDescription>Track your coding milestones</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${achievement.earned ? 'bg-amber-100 dark:bg-amber-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <Trophy className={`h-4 w-4 ${achievement.earned ? 'text-amber-500' : 'text-gray-400'}`} />
            </div>
            <div className="flex-grow">
              <p className={`font-medium ${!achievement.earned && 'text-muted-foreground'}`}>
                {achievement.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </div>
            {achievement.earned && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800">
                Earned
              </Badge>
            )}
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View All Achievements</Button>
      </CardFooter>
    </Card>
  );
};

// Leaderboard card component
const LeaderboardCard = () => {
  const leaders = [
    { name: "Alex Johnson", points: 1250, position: 1, avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Maria Garcia", points: 980, position: 2, avatar: "https://i.pravatar.cc/150?img=5" },
    { name: "John Smith", points: 820, position: 3, avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Sarah Lee", points: 790, position: 4, avatar: "https://i.pravatar.cc/150?img=10" },
    { name: "David Kim", points: 710, position: 5, avatar: "https://i.pravatar.cc/150?img=8" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Leaderboard</CardTitle>
        <CardDescription>Top coders this week</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaders.map((leader, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-6 text-center font-semibold">
              {leader.position}
            </div>
            <div className="h-8 w-8 rounded-full overflow-hidden">
              <img src={leader.avatar} alt={leader.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-grow">
              <p className="font-medium">{leader.name}</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-3 w-3 fill-amber-500" />
              <span className="font-medium">{leader.points}</span>
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">View Full Rankings</Button>
      </CardFooter>
    </Card>
  );
};

// Test case component
const TestCases = ({ testCases, runTestCase }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Test Cases</h3>
      <div className="space-y-2">
        {testCases.map((testCase, index) => (
          <div 
            key={index} 
            className="bg-muted rounded-md p-3 hover:bg-muted/80 transition-colors border"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className={`p-1 rounded-full ${
                  testCase.status === 'passed' ? 'bg-green-500' : 
                  testCase.status === 'failed' ? 'bg-red-500' : 
                  'bg-gray-300 dark:bg-gray-700'
                }`}>
                </div>
                <span className="font-medium text-sm">Test Case {index + 1}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => runTestCase(index)}
              >
                <Play className="h-3 w-3 mr-1" /> Run
              </Button>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Input:</p>
                <pre className="bg-slate-100 p-1 rounded mt-1 dark:bg-slate-800">{testCase.input}</pre>
              </div>
              <div>
                <p className="text-muted-foreground">Expected Output:</p>
                <pre className="bg-slate-100 p-1 rounded mt-1 dark:bg-slate-800">{testCase.expected}</pre>
              </div>
            </div>
            {testCase.status === 'failed' && (
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">Your Output:</p>
                <pre className="bg-red-50 text-red-700 p-1 rounded mt-1 text-xs dark:bg-red-950 dark:text-red-400">{testCase.actual}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Hints component
const HintsCard = ({ hints }) => {
  const [revealedHints, setRevealedHints] = useState([]);
  
  const revealHint = (index) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints([...revealedHints, index]);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          <Info className="h-4 w-4 mr-2 text-amber-500" />
          Challenge Hints
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {hints.map((hint, index) => (
          <div key={index} className="border rounded-md p-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-sm">Hint {index + 1}</span>
              {!revealedHints.includes(index) ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => revealHint(index)}
                >
                  Reveal
                </Button>
              ) : (
                <Badge variant="outline">Revealed</Badge>
              )}
            </div>
            {revealedHints.includes(index) && (
              <p className="mt-2 text-sm">{hint}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// Main Coding Labs page component
const CodingLabs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("challenges");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState("# Write your code here\n\ndef solution(n):\n    # Your implementation\n    return n * 2\n\n# Test your solution\nprint(solution(5))");
  const [output, setOutput] = useState("");
  const [bookmarkedChallenges, setBookmarkedChallenges] = useState([1, 4]);
  const [testCases, setTestCases] = useState([]);

  const languages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
  ];

  const challenges = [
    {
      id: 1,
      title: "Fibonacci Sequence",
      description: "Implement a function that returns the nth number in the Fibonacci sequence.",
      detailedDescription: `
# Fibonacci Sequence

The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1.

## Problem Statement

Write a function \`fibonacci(n)\` that returns the nth number in the Fibonacci sequence, where fibonacci(0) = 0 and fibonacci(1) = 1.

## Examples:
- fibonacci(0) = 0
- fibonacci(1) = 1
- fibonacci(2) = 1
- fibonacci(3) = 2
- fibonacci(4) = 3
- fibonacci(5) = 5
- fibonacci(6) = 8

Your solution should work efficiently for large values of n.
      `,
      difficulty: "Easy",
      completions: 1458,
      estimatedTime: "20 mins",
      tags: ["Recursion", "Dynamic Programming", "Math"],
      bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
      icon: BookText,
      started: true,
      progress: 75,
      completed: false,
      starterCode: {
        python: "def fibonacci(n):\n    # Your implementation here\n    pass\n\n# Test your solution\nprint(fibonacci(10))",
        javascript: "function fibonacci(n) {\n    // Your implementation here\n}\n\n// Test your solution\nconsole.log(fibonacci(10));",
        java: "public class Solution {\n    public static int fibonacci(int n) {\n        // Your implementation here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fibonacci(10));\n    }\n}",
        cpp: "#include <iostream>\n\nint fibonacci(int n) {\n    // Your implementation here\n    return 0;\n}\n\nint main() {\n    std::cout << fibonacci(10) << std::endl;\n    return 0;\n}"
      },
      testCases: [
        { input: "0", expected: "0", status: null, actual: null },
        { input: "1", expected: "1", status: null, actual: null },
        { input: "5", expected: "5", status: null, actual: null },
        { input: "10", expected: "55", status: null, actual: null },
        { input: "20", expected: "6765", status: null, actual: null }
      ],
      hints: [
        "Think about the base cases: fibonacci(0) = 0 and fibonacci(1) = 1",
        "A recursive solution can be elegant but inefficient for large values of n due to repeated calculations",
        "Consider using dynamic programming or an iterative approach to avoid redundant calculations",
        "Create an array or list to store previously computed Fibonacci numbers"
      ],
      solution: {
        python: "def fibonacci(n):\n    if n <= 1:\n        return n\n        \n    a, b = 0, 1\n    for _ in range(2, n + 1):\n        a, b = b, a + b\n    return b\n\nprint(fibonacci(10))",
        javascript: "function fibonacci(n) {\n    if (n <= 1) return n;\n    \n    let a = 0, b = 1;\n    for (let i = 2; i <= n; i++) {\n        let temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}\n\nconsole.log(fibonacci(10));",
        java: "public class Solution {\n    public static int fibonacci(int n) {\n        if (n <= 1) return n;\n        \n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int temp = a + b;\n            a = b;\n            b = temp;\n        }\n        return b;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(fibonacci(10));\n    }\n}",
        cpp: "#include <iostream>\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    \n    int a = 0, b = 1;\n    for (int i = 2; i <= n; i++) {\n        int temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}\n\nint main() {\n    std::cout << fibonacci(10) << std::endl;\n    return 0;\n}"
      }
    },
    {
      id: 2,
      title: "Binary Search Algorithm",
      description: "Implement the binary search algorithm to find an element in a sorted array.",
      detailedDescription: `
# Binary Search Algorithm

Binary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing the search interval in half.

## Problem Statement

Write a function \`binary_search(arr, target)\` that takes a sorted array and a target value, and returns the index of the target if found, or -1 if not found.

## Examples:
- binary_search([1, 2, 3, 4, 5], 3) should return 2
- binary_search([1, 2, 3, 4, 5], 6) should return -1

Your solution should have a time complexity of O(log n).
      `,
      difficulty: "Medium",
      completions: 982,
      estimatedTime: "30 mins",
      tags: ["Searching", "Algorithms", "Divide & Conquer"],
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
      icon: Code,
      started: false,
      progress: 0,
      completed: false,
      starterCode: {
        python: "def binary_search(arr, target):\n    # Your implementation here\n    pass\n\n# Test your solution\nprint(binary_search([1, 2, 3, 4, 5], 3))",
        javascript: "function binarySearch(arr, target) {\n    // Your implementation here\n}\n\n// Test your solution\nconsole.log(binarySearch([1, 2, 3, 4, 5], 3));",
        java: "public class Solution {\n    public static int binarySearch(int[] arr, int target) {\n        // Your implementation here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        System.out.println(binarySearch(arr, 3));\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n\nint binarySearch(const std::vector<int>& arr, int target) {\n    // Your implementation here\n    return -1;\n}\n\nint main() {\n    std::vector<int> arr = {1, 2, 3, 4, 5};\n    std::cout << binarySearch(arr, 3) << std::endl;\n    return 0;\n}"
      },
      testCases: [
        { input: "[1, 2, 3, 4, 5], 3", expected: "2", status: null, actual: null },
        { input: "[1, 2, 3, 4, 5], 1", expected: "0", status: null, actual: null },
        { input: "[1, 2, 3, 4, 5], 5", expected: "4", status: null, actual: null },
        { input: "[1, 2, 3, 4, 5], 6", expected: "-1", status: null, actual: null },
        { input: "[], 5", expected: "-1", status: null, actual: null }
      ],
      hints: [
        "Binary search works on sorted arrays by repeatedly dividing the search interval in half",
        "Keep track of the left and right boundaries of your search space",
        "Compare the middle element with the target value to determine which half to search next",
        "Be careful with the boundary conditions and make sure your loop terminates correctly"
      ],
      solution: {
        python: "def binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        \n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n            \n    return -1\n\nprint(binary_search([1, 2, 3, 4, 5], 3))",
        javascript: "function binarySearch(arr, target) {\n    let left = 0, right = arr.length - 1;\n    \n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        \n        if (arr[mid] === target) {\n            return mid;\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return -1;\n}\n\nconsole.log(binarySearch([1, 2, 3, 4, 5], 3));",
        java: "public class Solution {\n    public static int binarySearch(int[] arr, int target) {\n        int left = 0, right = arr.length - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (arr[mid] == target) {\n                return mid;\n            } else if (arr[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return -1;\n    }\n\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3, 4, 5};\n        System.out.println(binarySearch(arr, 3));\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n\nint binarySearch(const std::vector<int>& arr, int target) {\n    int left = 0, right = arr.size() - 1;\n    \n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        \n        if (arr[mid] == target) {\n            return mid;\n        } else if (arr[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return -1;\n}\n\nint main() {\n    std::vector<int> arr = {1, 2, 3, 4, 5};\n    std::cout << binarySearch(arr, 3) << std::endl;\n    return 0;\n}"
      }
    },
    {
      id: 3,
      title: "Palindrome Checker",
      description: "Create a function that determines whether a given string is a palindrome.",
      detailedDescription: `
# Palindrome Checker

A palindrome is a word, number, phrase, or other sequence of characters that reads the same forward and backward.

## Problem Statement

Write a function \`is_palindrome(s)\` that takes a string \`s\` and returns \`True\` if it's a palindrome, and \`False\` otherwise. The function should be case-insensitive and ignore non-alphanumeric characters.

## Examples:
- is_palindrome("racecar") = True
- is_palindrome("A man, a plan, a canal: Panama") = True
- is_palindrome("hello") = False

Your solution should efficiently handle spaces, punctuation, and case differences.
      `,
      difficulty: "Easy",
      completions: 2104,
      estimatedTime: "15 mins",
      tags: ["Strings", "Algorithms"],
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: FileCode,
      started: false,
      progress: 0,
      completed: false,
      starterCode: {
        python: "def is_palindrome(s):\n    # Your implementation here\n    pass\n\n# Test your solution\nprint(is_palindrome(\"racecar\"))\nprint(is_palindrome(\"A man, a plan, a canal: Panama\"))\nprint(is_palindrome(\"hello\"))",
        javascript: "function isPalindrome(s) {\n    // Your implementation here\n}\n\n// Test your solution\nconsole.log(isPalindrome(\"racecar\"));\nconsole.log(isPalindrome(\"A man, a plan, a canal: Panama\"));\nconsole.log(isPalindrome(\"hello\"));",
        java: "public class Solution {\n    public static boolean isPalindrome(String s) {\n        // Your implementation here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"racecar\"));\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n        System.out.println(isPalindrome(\"hello\"));\n    }\n}",
        cpp: "#include <iostream>\n#include <string>\n\nbool isPalindrome(const std::string& s) {\n    // Your implementation here\n    return false;\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << isPalindrome(\"racecar\") << std::endl;\n    std::cout << isPalindrome(\"A man, a plan, a canal: Panama\") << std::endl;\n    std::cout << isPalindrome(\"hello\") << std::endl;\n    return 0;\n}"
      },
      testCases: [
        { input: "\"racecar\"", expected: "True", status: null, actual: null },
        { input: "\"A man, a plan, a canal: Panama\"", expected: "True", status: null, actual: null },
        { input: "\"hello\"", expected: "False", status: null, actual: null },
        { input: "\"12321\"", expected: "True", status: null, actual: null },
        { input: "\"No 'x' in Nixon\"", expected: "True", status: null, actual: null }
      ],
      hints: [
        "Remove non-alphanumeric characters and convert the string to lowercase",
        "You can check if a string is a palindrome by comparing it with its reverse",
        "You can also use a two-pointer approach (one from the start and one from the end)",
        "Be careful with edge cases like empty strings or single character strings"
      ],
      solution: {
        python: "def is_palindrome(s):\n    # Remove non-alphanumeric characters and convert to lowercase\n    s = ''.join(char.lower() for char in s if char.isalnum())\n    \n    # Check if the string is equal to its reverse\n    return s == s[::-1]\n\n# Test your solution\nprint(is_palindrome(\"racecar\"))\nprint(is_palindrome(\"A man, a plan, a canal: Panama\"))\nprint(is_palindrome(\"hello\"))",
        javascript: "function isPalindrome(s) {\n    // Remove non-alphanumeric characters and convert to lowercase\n    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n    \n    // Check if the string is equal to its reverse\n    const reversed = s.split('').reverse().join('');\n    return s === reversed;\n}\n\n// Test your solution\nconsole.log(isPalindrome(\"racecar\"));\nconsole.log(isPalindrome(\"A man, a plan, a canal: Panama\"));\nconsole.log(isPalindrome(\"hello\"));",
        java: "public class Solution {\n    public static boolean isPalindrome(String s) {\n        // Remove non-alphanumeric characters and convert to lowercase\n        s = s.toLowerCase().replaceAll(\"[^a-z0-9]\", \"\");\n        \n        // Check if the string is equal to its reverse\n        String reversed = new StringBuilder(s).reverse().toString();\n        return s.equals(reversed);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"racecar\"));\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n        System.out.println(isPalindrome(\"hello\"));\n    }\n}",
        cpp: "#include <iostream>\n#include <string>\n#include <algorithm>\n#include <cctype>\n\nbool isPalindrome(const std::string& s) {\n    std::string cleaned;\n    \n    // Remove non-alphanumeric characters and convert to lowercase\n    for (char c : s) {\n        if (std::isalnum(c)) {\n            cleaned += std::tolower(c);\n        }\n    }\n    \n    // Check if the string is equal to its reverse\n    std::string reversed = cleaned;\n    std::reverse(reversed.begin(), reversed.end());\n    return cleaned == reversed;\n}\n\nint main() {\n    std::cout << std::boolalpha;\n    std::cout << isPalindrome(\"racecar\") << std::endl;\n    std::cout << isPalindrome(\"A man, a plan, a canal: Panama\") << std::endl;\n    std::cout << isPalindrome(\"hello\") << std::endl;\n    return 0;\n}"
      }
    },
    {
      id: 4,
      title: "Graph Traversal",
      description: "Implement BFS and DFS algorithms for traversing a graph data structure.",
      detailedDescription: `
# Graph Traversal

Graph traversal is the process of visiting (checking and/or updating) each node in a graph. The two most common graph traversal algorithms are Breadth-First Search (BFS) and Depth-First Search (DFS).

## Problem Statement

Implement both BFS and DFS functions for a graph represented as an adjacency list. The functions should return the nodes in the order they are visited.

## Examples:
For the graph:
```
0 -- 1 -- 2
|    |
3 -- 4
```

- BFS starting from node 0 should return: [0, 1, 3, 2, 4] or [0, 3, 1, 4, 2]
- DFS starting from node 0 should return: [0, 1, 2, 4, 3] or [0, 3, 4, 1, 2] or similar

Your solution should handle both connected and disconnected graphs.
      `,
      difficulty: "Hard",
      completions: 682,
      estimatedTime: "45 mins",
      tags: ["Graphs", "Algorithms", "BFS", "DFS"],
      bgColor: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: FileCode2,
      completed: true,
      completedAt: "2 days ago",
      starterCode: {
        python: "def bfs(graph, start):\n    # Your BFS implementation here\n    pass\n\ndef dfs(graph, start):\n    # Your DFS implementation here\n    pass\n\n# Test your solution\ngraph = {\n    0: [1, 3],\n    1: [0, 2, 4],\n    2: [1],\n    3: [0, 4],\n    4: [1, 3]\n}\n\nprint(\"BFS:\", bfs(graph, 0))\nprint(\"DFS:\", dfs(graph, 0))",
        javascript: "function bfs(graph, start) {\n    // Your BFS implementation here\n}\n\nfunction dfs(graph, start) {\n    // Your DFS implementation here\n}\n\n// Test your solution\nconst graph = {\n    0: [1, 3],\n    1: [0, 2, 4],\n    2: [1],\n    3: [0, 4],\n    4: [1, 3]\n};\n\nconsole.log(\"BFS:\", bfs(graph, 0));\nconsole.log(\"DFS:\", dfs(graph, 0));",
        java: "import java.util.*;\n\npublic class Solution {\n    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {\n        // Your BFS implementation here\n        return new ArrayList<>();\n    }\n    \n    public static List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {\n        // Your DFS implementation here\n        return new ArrayList<>();\n    }\n    \n    public static void main(String[] args) {\n        Map<Integer, List<Integer>> graph = new HashMap<>();\n        graph.put(0, Arrays.asList(1, 3));\n        graph.put(1, Arrays.asList(0, 2, 4));\n        graph.put(2, Arrays.asList(1));\n        graph.put(3, Arrays.asList(0, 4));\n        graph.put(4, Arrays.asList(1, 3));\n        \n        System.out.println(\"BFS: \" + bfs(graph, 0));\n        System.out.println(\"DFS: \" + dfs(graph, 0));\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <queue>\n#include <stack>\n\nstd::vector<int> bfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {\n    // Your BFS implementation here\n    return {};\n}\n\nstd::vector<int> dfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {\n    // Your DFS implementation here\n    return {};\n}\n\nint main() {\n    std::unordered_map<int, std::vector<int>> graph = {\n        {0, {1, 3}},\n        {1, {0, 2, 4}},\n        {2, {1}},\n        {3, {0, 4}},\n        {4, {1, 3}}\n    };\n    \n    std::cout << \"BFS: \";\n    for (int node : bfs(graph, 0)) {\n        std::cout << node << \" \";\n    }\n    std::cout << std::endl;\n    \n    std::cout << \"DFS: \";\n    for (int node : dfs(graph, 0)) {\n        std::cout << node << \" \";\n    }\n    std::cout << std::endl;\n    \n    return 0;\n}"
      },
      testCases: [
        { input: "graph, 0", expected: "BFS contains all nodes 0-4", status: null, actual: null },
        { input: "graph, 2", expected: "BFS contains all nodes 0-4", status: null, actual: null },
        { input: "graph, 0", expected: "DFS contains all nodes 0-4", status: null, actual: null },
        { input: "graph, 2", expected: "DFS contains all nodes 0-4", status: null, actual: null },
        { input: "empty graph, 0", expected: "BFS and DFS return [0]", status: null, actual: null }
      ],
      hints: [
        "BFS uses a queue data structure to keep track of nodes to visit next",
        "DFS can be implemented either recursively or using a stack",
        "Don't forget to keep track of visited nodes to avoid cycles",
        "For disconnected graphs, you might need to iterate through all nodes as potential starting points"
      ],
      solution: {
        python: "def bfs(graph, start):\n    visited = []\n    queue = [start]\n    visited_set = set([start])  # For O(1) lookups\n    \n    while queue:\n        node = queue.pop(0)\n        visited.append(node)\n        \n        for neighbor in graph[node]:\n            if neighbor not in visited_set:\n                visited_set.add(neighbor)\n                queue.append(neighbor)\n                \n    return visited\n\ndef dfs(graph, start):\n    visited = []\n    stack = [start]\n    visited_set = set()  # For O(1) lookups\n    \n    while stack:\n        node = stack.pop()\n        if node not in visited_set:\n            visited_set.add(node)\n            visited.append(node)\n            \n            # Add neighbors in reverse order for the same result as recursive DFS\n            for neighbor in reversed(graph[node]):\n                if neighbor not in visited_set:\n                    stack.append(neighbor)\n                    \n    return visited\n\n# Test your solution\ngraph = {\n    0: [1, 3],\n    1: [0, 2, 4],\n    2: [1],\n    3: [0, 4],\n    4: [1, 3]\n}\n\nprint(\"BFS:\", bfs(graph, 0))\nprint(\"DFS:\", dfs(graph, 0))",
        javascript: "function bfs(graph, start) {\n    const visited = [];\n    const queue = [start];\n    const visitedSet = new Set([start]);\n    \n    while (queue.length > 0) {\n        const node = queue.shift();\n        visited.push(node);\n        \n        for (const neighbor of graph[node]) {\n            if (!visitedSet.has(neighbor)) {\n                visitedSet.add(neighbor);\n                queue.push(neighbor);\n            }\n        }\n    }\n    \n    return visited;\n}\n\nfunction dfs(graph, start) {\n    const visited = [];\n    const stack = [start];\n    const visitedSet = new Set();\n    \n    while (stack.length > 0) {\n        const node = stack.pop();\n        if (!visitedSet.has(node)) {\n            visitedSet.add(node);\n            visited.push(node);\n            \n            // Add neighbors in reverse order for the same result as recursive DFS\n            for (let i = graph[node].length - 1; i >= 0; i--) {\n                const neighbor = graph[node][i];\n                if (!visitedSet.has(neighbor)) {\n                    stack.push(neighbor);\n                }\n            }\n        }\n    }\n    \n    return visited;\n}\n\n// Test your solution\nconst graph = {\n    0: [1, 3],\n    1: [0, 2, 4],\n    2: [1],\n    3: [0, 4],\n    4: [1, 3]\n};\n\nconsole.log(\"BFS:\", bfs(graph, 0));\nconsole.log(\"DFS:\", dfs(graph, 0));",
        java: "import java.util.*;\n\npublic class Solution {\n    public static List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {\n        List<Integer> visited = new ArrayList<>();\n        Queue<Integer> queue = new LinkedList<>();\n        Set<Integer> visitedSet = new HashSet<>();\n        \n        queue.offer(start);\n        visitedSet.add(start);\n        \n        while (!queue.isEmpty()) {\n            int node = queue.poll();\n            visited.add(node);\n            \n            for (int neighbor : graph.get(node)) {\n                if (!visitedSet.contains(neighbor)) {\n                    visitedSet.add(neighbor);\n                    queue.offer(neighbor);\n                }\n            }\n        }\n        \n        return visited;\n    }\n    \n    public static List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {\n        List<Integer> visited = new ArrayList<>();\n        Stack<Integer> stack = new Stack<>();\n        Set<Integer> visitedSet = new HashSet<>();\n        \n        stack.push(start);\n        \n        while (!stack.isEmpty()) {\n            int node = stack.pop();\n            if (!visitedSet.contains(node)) {\n                visitedSet.add(node);\n                visited.add(node);\n                \n                // Add neighbors in reverse order for the same result as recursive DFS\n                List<Integer> neighbors = new ArrayList<>(graph.get(node));\n                for (int i = neighbors.size() - 1; i >= 0; i--) {\n                    int neighbor = neighbors.get(i);\n                    if (!visitedSet.contains(neighbor)) {\n                        stack.push(neighbor);\n                    }\n                }\n            }\n        }\n        \n        return visited;\n    }\n    \n    public static void main(String[] args) {\n        Map<Integer, List<Integer>> graph = new HashMap<>();\n        graph.put(0, Arrays.asList(1, 3));\n        graph.put(1, Arrays.asList(0, 2, 4));\n        graph.put(2, Arrays.asList(1));\n        graph.put(3, Arrays.asList(0, 4));\n        graph.put(4, Arrays.asList(1, 3));\n        \n        System.out.println(\"BFS: \" + bfs(graph, 0));\n        System.out.println(\"DFS: \" + dfs(graph, 0));\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <queue>\n#include <stack>\n#include <unordered_set>\n\nstd::vector<int> bfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {\n    std::vector<int> visited;\n    std::queue<int> queue;\n    std::unordered_set<int> visitedSet;\n    \n    queue.push(start);\n    visitedSet.insert(start);\n    \n    while (!queue.empty()) {\n        int node = queue.front();\n        queue.pop();\n        visited.push_back(node);\n        \n        for (int neighbor : graph.at(node)) {\n            if (visitedSet.find(neighbor) == visitedSet.end()) {\n                visitedSet.insert(neighbor);\n                queue.push(neighbor);\n            }\n        }\n    }\n    \n    return visited;\n}\n\nstd::vector<int> dfs(const std::unordered_map<int, std::vector<int>>& graph, int start) {\n    std::vector<int> visited;\n    std::stack<int> stack;\n    std::unordered_set<int> visitedSet;\n    \n    stack.push(start);\n    \n    while (!stack.empty()) {\n        int node = stack.top();\n        stack.pop();\n        \n        if (visitedSet.find(node) == visitedSet.end()) {\n            visitedSet.insert(node);\n            visited.push_back(node);\n            \n            // Add neighbors in reverse order for the same result as recursive DFS\n            const std::vector<int>& neighbors = graph.at(node);\n            for (int i = neighbors.size() - 1; i >= 0; i--) {\n                int neighbor = neighbors[i];\n                if (visitedSet.find(neighbor) == visitedSet.end()) {\n                    stack.push(neighbor);\n                }\n            }\n        }\n    }\n    \n    return visited;\n}\n\nint main() {\n    std::unordered_map<int, std::vector<int>> graph = {\n        {0, {1, 3}},\n        {1, {0, 2, 4}},\n        {2, {1}},\n        {3, {0, 4}},\n        {4, {1, 3}}\n    };\n    \n    std::cout << \"BFS: \";\n    for (int node : bfs(graph, 0)) {\n        std::cout << node << \" \";\n    }\n    std::cout << std::endl;\n    \n    std::cout << \"DFS: \";\n    for (int node : dfs(graph, 0)) {\n        std::cout << node << \" \";\n    }\n    std::cout << std::endl;\n    \n    return 0;\n}"
      }
    },
    {
      id: 5,
      title: "Array Sorting",
      description: "Implement two different sorting algorithms and compare their performance.",
      detailedDescription: `
# Array Sorting Algorithms

This challenge focuses on implementing and comparing different sorting algorithms.

## Problem Statement

Implement both Quick Sort and Merge Sort algorithms for sorting an array of integers in ascending order. Then, compare their performance on different input sizes.

## Examples:
- sort([5, 2, 9, 1, 5, 6]) should return [1, 2, 5, 5, 6, 9]
- sort([]) should return []
- sort([1]) should return [1]

Your solution should correctly handle edge cases like empty arrays or arrays with one element.
      `,
      difficulty: "Medium",
      completions: 1287,
      estimatedTime: "35 mins",
      tags: ["Sorting", "Algorithms", "Arrays"],
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500",
      icon: Code,
      started: false,
      progress: 0,
      completed: false,
      starterCode: {
        python: "def quick_sort(arr):\n    # Your quick sort implementation here\n    pass\n\ndef merge_sort(arr):\n    # Your merge sort implementation here\n    pass\n\n# Test your solution\narr = [5, 2, 9, 1, 5, 6]\nprint(\"Quick Sort:\", quick_sort(arr.copy()))\nprint(\"Merge Sort:\", merge_sort(arr.copy()))",
        javascript: "function quickSort(arr) {\n    // Your quick sort implementation here\n}\n\nfunction mergeSort(arr) {\n    // Your merge sort implementation here\n}\n\n// Test your solution\nconst arr = [5, 2, 9, 1, 5, 6];\nconsole.log(\"Quick Sort:\", quickSort([...arr]));\nconsole.log(\"Merge Sort:\", mergeSort([...arr]));",
        java: "import java.util.Arrays;\n\npublic class Solution {\n    public static int[] quickSort(int[] arr) {\n        // Your quick sort implementation here\n        return arr;\n    }\n    \n    public static int[] mergeSort(int[] arr) {\n        // Your merge sort implementation here\n        return arr;\n    }\n    \n    public static void main(String[] args) {\n        int[] arr = {5, 2, 9, 1, 5, 6};\n        \n        int[] quickSorted = quickSort(Arrays.copyOf(arr, arr.length));\n        System.out.print(\"Quick Sort: \");\n        for (int num : quickSorted) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n        \n        int[] mergeSorted = mergeSort(Arrays.copyOf(arr, arr.length));\n        System.out.print(\"Merge Sort: \");\n        for (int num : mergeSorted) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n\nstd::vector<int> quickSort(std::vector<int> arr) {\n    // Your quick sort implementation here\n    return arr;\n}\n\nstd::vector<int> mergeSort(std::vector<int> arr) {\n    // Your merge sort implementation here\n    return arr;\n}\n\nint main() {\n    std::vector<int> arr = {5, 2, 9, 1, 5, 6};\n    \n    std::cout << \"Quick Sort: \";\n    for (int num : quickSort(arr)) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl;\n    \n    std::cout << \"Merge Sort: \";\n    for (int num : mergeSort(arr)) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl;\n    \n    return 0;\n}"
      },
      testCases: [
        { input: "[5, 2, 9, 1, 5, 6]", expected: "[1, 2, 5, 5, 6, 9]", status: null, actual: null },
        { input: "[]", expected: "[]", status: null, actual: null },
        { input: "[1]", expected: "[1]", status: null, actual: null },
        { input: "[3, 3, 3]", expected: "[3, 3, 3]", status: null, actual: null },
        { input: "[10, 9, 8, 7, 6]", expected: "[6, 7, 8, 9, 10]", status: null, actual: null }
      ],
      hints: [
        "Quick sort has an average time complexity of O(n log n), but can degrade to O(n²) in worst-case scenarios",
        "Merge sort consistently runs in O(n log n) time, but requires additional space",
        "In quick sort, the choice of pivot can significantly affect performance",
        "For merge sort, the key is to correctly implement the merge step"
      ],
      solution: {
        python: "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    \n    return quick_sort(left) + middle + quick_sort(right)\n\ndef merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    \n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    \n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    i = j = 0\n    \n    while i < len(left) and j < len(right):\n        if left[i] <= right[j]:\n            result.append(left[i])\n            i += 1\n        else:\n            result.append(right[j])\n            j += 1\n    \n    result.extend(left[i:])\n    result.extend(right[j:])\n    return result\n\n# Test your solution\narr = [5, 2, 9, 1, 5, 6]\nprint(\"Quick Sort:\", quick_sort(arr.copy()))\nprint(\"Merge Sort:\", merge_sort(arr.copy()))",
        javascript: "function quickSort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    \n    const pivotIndex = Math.floor(arr.length / 2);\n    const pivot = arr[pivotIndex];\n    \n    const left = arr.filter((x, i) => x < pivot || (x === pivot && i < pivotIndex));\n    const middle = arr.filter(x => x === pivot);\n    const right = arr.filter((x, i) => x > pivot || (x === pivot && i > pivotIndex));\n    \n    return [...quickSort(left), ...middle, ...quickSort(right)];\n}\n\nfunction mergeSort(arr) {\n    if (arr.length <= 1) {\n        return arr;\n    }\n    \n    const mid = Math.floor(arr.length / 2);\n    const left = mergeSort(arr.slice(0, mid));\n    const right = mergeSort(arr.slice(mid));\n    \n    return merge(left, right);\n}\n\nfunction merge(left, right) {\n    const result = [];\n    let i = 0, j = 0;\n    \n    while (i < left.length && j < right.length) {\n        if (left[i] <= right[j]) {\n            result.push(left[i]);\n            i++;\n        } else {\n            result.push(right[j]);\n            j++;\n        }\n    }\n    \n    return [...result, ...left.slice(i), ...right.slice(j)];\n}\n\n// Test your solution\nconst arr = [5, 2, 9, 1, 5, 6];\nconsole.log(\"Quick Sort:\", quickSort([...arr]));\nconsole.log(\"Merge Sort:\", mergeSort([...arr]));",
        java: "import java.util.Arrays;\n\npublic class Solution {\n    public static int[] quickSort(int[] arr) {\n        if (arr.length <= 1) {\n            return arr;\n        }\n        \n        return quickSortHelper(arr, 0, arr.length - 1);\n    }\n    \n    private static int[] quickSortHelper(int[] arr, int low, int high) {\n        if (low < high) {\n            int pivotIndex = partition(arr, low, high);\n            quickSortHelper(arr, low, pivotIndex - 1);\n            quickSortHelper(arr, pivotIndex + 1, high);\n        }\n        return arr;\n    }\n    \n    private static int partition(int[] arr, int low, int high) {\n        int pivot = arr[high];\n        int i = low - 1;\n        \n        for (int j = low; j < high; j++) {\n            if (arr[j] <= pivot) {\n                i++;\n                \n                // Swap arr[i] and arr[j]\n                int temp = arr[i];\n                arr[i] = arr[j];\n                arr[j] = temp;\n            }\n        }\n        \n        // Swap arr[i+1] and arr[high] (pivot)\n        int temp = arr[i + 1];\n        arr[i + 1] = arr[high];\n        arr[high] = temp;\n        \n        return i + 1;\n    }\n    \n    public static int[] mergeSort(int[] arr) {\n        if (arr.length <= 1) {\n            return arr;\n        }\n        \n        int mid = arr.length / 2;\n        int[] left = Arrays.copyOfRange(arr, 0, mid);\n        int[] right = Arrays.copyOfRange(arr, mid, arr.length);\n        \n        return merge(mergeSort(left), mergeSort(right));\n    }\n    \n    private static int[] merge(int[] left, int[] right) {\n        int[] result = new int[left.length + right.length];\n        int i = 0, j = 0, k = 0;\n        \n        while (i < left.length && j < right.length) {\n            if (left[i] <= right[j]) {\n                result[k++] = left[i++];\n            } else {\n                result[k++] = right[j++];\n            }\n        }\n        \n        while (i < left.length) {\n            result[k++] = left[i++];\n        }\n        \n        while (j < right.length) {\n            result[k++] = right[j++];\n        }\n        \n        return result;\n    }\n    \n    public static void main(String[] args) {\n        int[] arr = {5, 2, 9, 1, 5, 6};\n        \n        int[] quickSorted = quickSort(Arrays.copyOf(arr, arr.length));\n        System.out.print(\"Quick Sort: \");\n        for (int num : quickSorted) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n        \n        int[] mergeSorted = mergeSort(Arrays.copyOf(arr, arr.length));\n        System.out.print(\"Merge Sort: \");\n        for (int num : mergeSorted) {\n            System.out.print(num + \" \");\n        }\n        System.out.println();\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\n\nstd::vector<int> merge(const std::vector<int>& left, const std::vector<int>& right) {\n    std::vector<int> result;\n    size_t i = 0, j = 0;\n    \n    while (i < left.size() && j < right.size()) {\n        if (left[i] <= right[j]) {\n            result.push_back(left[i++]);\n        } else {\n            result.push_back(right[j++]);\n        }\n    }\n    \n    while (i < left.size()) {\n        result.push_back(left[i++]);\n    }\n    \n    while (j < right.size()) {\n        result.push_back(right[j++]);\n    }\n    \n    return result;\n}\n\nstd::vector<int> mergeSort(std::vector<int> arr) {\n    if (arr.size() <= 1) {\n        return arr;\n    }\n    \n    size_t mid = arr.size() / 2;\n    std::vector<int> left(arr.begin(), arr.begin() + mid);\n    std::vector<int> right(arr.begin() + mid, arr.end());\n    \n    left = mergeSort(left);\n    right = mergeSort(right);\n    \n    return merge(left, right);\n}\n\nint partition(std::vector<int>& arr, int low, int high) {\n    int pivot = arr[high];\n    int i = low - 1;\n    \n    for (int j = low; j < high; j++) {\n        if (arr[j] <= pivot) {\n            i++;\n            std::swap(arr[i], arr[j]);\n        }\n    }\n    \n    std::swap(arr[i + 1], arr[high]);\n    return i + 1;\n}\n\nvoid quickSortHelper(std::vector<int>& arr, int low, int high) {\n    if (low < high) {\n        int pivotIndex = partition(arr, low, high);\n        quickSortHelper(arr, low, pivotIndex - 1);\n        quickSortHelper(arr, pivotIndex + 1, high);\n    }\n}\n\nstd::vector<int> quickSort(std::vector<int> arr) {\n    if (arr.size() <= 1) {\n        return arr;\n    }\n    \n    quickSortHelper(arr, 0, arr.size() - 1);\n    return arr;\n}\n\nint main() {\n    std::vector<int> arr = {5, 2, 9, 1, 5, 6};\n    \n    std::cout << \"Quick Sort: \";\n    for (int num : quickSort(arr)) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl;\n    \n    std::cout << \"Merge Sort: \";\n    for (int num : mergeSort(arr)) {\n        std::cout << num << \" \";\n    }\n    std::cout << std::endl;\n    \n    return 0;\n}"
      }
    },
    {
      id: 6,
      title: "Linked List Operations",
      description: "Implement basic operations on a singly linked list data structure.",
      detailedDescription: `
# Linked List Operations

A singly linked list is a data structure that consists of a sequence of nodes, where each node contains a value and a reference to the next node in the sequence.

## Problem Statement

Implement a singly linked list class with the following methods:
- append(value): Adds a new node with the given value to the end of the list
- prepend(value): Adds a new node with the given value to the beginning of the list
- delete(value): Removes the first node with the given value
- print(): Prints the list in the format "value1 -> value2 -> ... -> valueN"
- find(value): Returns true if the value exists in the list, false otherwise

## Example:
```
list = LinkedList()
list.append(1)
list.append(2)
list.prepend(0)
list.print()  # Output: 0 -> 1 -> 2
list.delete(1)
list.print()  # Output: 0 -> 2
list.find(2)  # Returns: true
list.find(1)  # Returns: false
```

Your implementation should handle edge cases like empty lists or deleting non-existent values.
      `,
      difficulty: "Medium",
      completions: 876,
      estimatedTime: "40 mins",
      tags: ["Linked Lists", "Data Structures"],
      bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
      icon: FileCode,
      started: true,
      progress: 30,
      completed: false,
      starterCode: {
        python: "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, value):\n        # Your implementation here\n        pass\n    \n    def prepend(self, value):\n        # Your implementation here\n        pass\n    \n    def delete(self, value):\n        # Your implementation here\n        pass\n    \n    def print(self):\n        # Your implementation here\n        pass\n    \n    def find(self, value):\n        # Your implementation here\n        pass\n\n# Test your solution\nlist = LinkedList()\nlist.append(1)\nlist.append(2)\nlist.prepend(0)\nlist.print()  # Should output: 0 -> 1 -> 2\nlist.delete(1)\nlist.print()  # Should output: 0 -> 2\nprint(list.find(2))  # Should output: True\nprint(list.find(1))  # Should output: False",
        javascript: "class Node {\n    constructor(value) {\n        this.value = value;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    constructor() {\n        this.head = null;\n    }\n    \n    append(value) {\n        // Your implementation here\n    }\n    \n    prepend(value) {\n        // Your implementation here\n    }\n    \n    delete(value) {\n        // Your implementation here\n    }\n    \n    print() {\n        // Your implementation here\n    }\n    \n    find(value) {\n        // Your implementation here\n    }\n}\n\n// Test your solution\nconst list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.prepend(0);\nlist.print();  // Should output: 0 -> 1 -> 2\nlist.delete(1);\nlist.print();  // Should output: 0 -> 2\nconsole.log(list.find(2));  // Should output: true\nconsole.log(list.find(1));  // Should output: false",
        java: "public class Solution {\n    static class Node {\n        int value;\n        Node next;\n        \n        Node(int value) {\n            this.value = value;\n            this.next = null;\n        }\n    }\n    \n    static class LinkedList {\n        Node head;\n        \n        public void append(int value) {\n            // Your implementation here\n        }\n        \n        public void prepend(int value) {\n            // Your implementation here\n        }\n        \n        public void delete(int value) {\n            // Your implementation here\n        }\n        \n        public void print() {\n            // Your implementation here\n        }\n        \n        public boolean find(int value) {\n            // Your implementation here\n            return false;\n        }\n    }\n    \n    public static void main(String[] args) {\n        LinkedList list = new LinkedList();\n        list.append(1);\n        list.append(2);\n        list.prepend(0);\n        list.print();  // Should output: 0 -> 1 -> 2\n        list.delete(1);\n        list.print();  // Should output: 0 -> 2\n        System.out.println(list.find(2));  // Should output: true\n        System.out.println(list.find(1));  // Should output: false\n    }\n}",
        cpp: "#include <iostream>\n\nclass Node {\npublic:\n    int value;\n    Node* next;\n    \n    Node(int value) {\n        this->value = value;\n        this->next = nullptr;\n    }\n};\n\nclass LinkedList {\nprivate:\n    Node* head;\n    \npublic:\n    LinkedList() {\n        this->head = nullptr;\n    }\n    \n    void append(int value) {\n        // Your implementation here\n    }\n    \n    void prepend(int value) {\n        // Your implementation here\n    }\n    \n    void delete_node(int value) {\n        // Your implementation here\n    }\n    \n    void print() {\n        // Your implementation here\n    }\n    \n    bool find(int value) {\n        // Your implementation here\n        return false;\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.append(1);\n    list.append(2);\n    list.prepend(0);\n    list.print();  // Should output: 0 -> 1 -> 2\n    list.delete_node(1);\n    list.print();  // Should output: 0 -> 2\n    std::cout << std::boolalpha;\n    std::cout << list.find(2) << std::endl;  // Should output: true\n    std::cout << list.find(1) << std::endl;  // Should output: false\n    return 0;\n}"
      },
      testCases: [
        { input: "append(1), append(2), prepend(0), print()", expected: "0 -> 1 -> 2", status: null, actual: null },
        { input: "delete(1), print()", expected: "0 -> 2", status: null, actual: null },
        { input: "find(2)", expected: "True", status: null, actual: null },
        { input: "find(1)", expected: "False", status: null, actual: null },
        { input: "delete non-existent value", expected: "No errors", status: null, actual: null }
      ],
      hints: [
        "For the append method, you need to handle the case when the list is empty",
        "The prepend method is simpler since you just need to update the head",
        "The delete method needs to handle several cases: deleting the head, deleting a node in the middle, and deleting the last node",
        "When deleting a node, you need to update the next pointer of the previous node",
        "For the find method, you need to traverse the list and compare each node's value with the target value"
      ],
      solution: {
        python: "class Node:\n    def __init__(self, value):\n        self.value = value\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n    \n    def append(self, value):\n        new_node = Node(value)\n        \n        if not self.head:\n            self.head = new_node\n            return\n        \n        current = self.head\n        while current.next:\n            current = current.next\n        \n        current.next = new_node\n    \n    def prepend(self, value):\n        new_node = Node(value)\n        new_node.next = self.head\n        self.head = new_node\n    \n    def delete(self, value):\n        if not self.head:\n            return\n        \n        if self.head.value == value:\n            self.head = self.head.next\n            return\n        \n        current = self.head\n        while current.next and current.next.value != value:\n            current = current.next\n        \n        if current.next:\n            current.next = current.next.next\n    \n    def print(self):\n        if not self.head:\n            print(\"Empty list\")\n            return\n        \n        result = []\n        current = self.head\n        while current:\n            result.append(str(current.value))\n            current = current.next\n        \n        print(\" -> \".join(result))\n    \n    def find(self, value):\n        current = self.head\n        while current:\n            if current.value == value:\n                return True\n            current = current.next\n        \n        return False\n\n# Test your solution\nlist = LinkedList()\nlist.append(1)\nlist.append(2)\nlist.prepend(0)\nlist.print()  # Should output: 0 -> 1 -> 2\nlist.delete(1)\nlist.print()  # Should output: 0 -> 2\nprint(list.find(2))  # Should output: True\nprint(list.find(1))  # Should output: False",
        javascript: "class Node {\n    constructor(value) {\n        this.value = value;\n        this.next = null;\n    }\n}\n\nclass LinkedList {\n    constructor() {\n        this.head = null;\n    }\n    \n    append(value) {\n        const newNode = new Node(value);\n        \n        if (!this.head) {\n            this.head = newNode;\n            return;\n        }\n        \n        let current = this.head;\n        while (current.next) {\n            current = current.next;\n        }\n        \n        current.next = newNode;\n    }\n    \n    prepend(value) {\n        const newNode = new Node(value);\n        newNode.next = this.head;\n        this.head = newNode;\n    }\n    \n    delete(value) {\n        if (!this.head) {\n            return;\n        }\n        \n        if (this.head.value === value) {\n            this.head = this.head.next;\n            return;\n        }\n        \n        let current = this.head;\n        while (current.next && current.next.value !== value) {\n            current = current.next;\n        }\n        \n        if (current.next) {\n            current.next = current.next.next;\n        }\n    }\n    \n    print() {\n        if (!this.head) {\n            console.log(\"Empty list\");\n            return;\n        }\n        \n        const result = [];\n        let current = this.head;\n        while (current) {\n            result.push(current.value);\n            current = current.next;\n        }\n        \n        console.log(result.join(\" -> \"));\n    }\n    \n    find(value) {\n        let current = this.head;\n        while (current) {\n            if (current.value === value) {\n                return true;\n            }\n            current = current.next;\n        }\n        \n        return false;\n    }\n}\n\n// Test your solution\nconst list = new LinkedList();\nlist.append(1);\nlist.append(2);\nlist.prepend(0);\nlist.print();  // Should output: 0 -> 1 -> 2\nlist.delete(1);\nlist.print();  // Should output: 0 -> 2\nconsole.log(list.find(2));  // Should output: true\nconsole.log(list.find(1));  // Should output: false",
        java: "public class Solution {\n    static class Node {\n        int value;\n        Node next;\n        \n        Node(int value) {\n            this.value = value;\n            this.next = null;\n        }\n    }\n    \n    static class LinkedList {\n        Node head;\n        \n        public void append(int value) {\n            Node newNode = new Node(value);\n            \n            if (head == null) {\n                head = newNode;\n                return;\n            }\n            \n            Node current = head;\n            while (current.next != null) {\n                current = current.next;\n            }\n            \n            current.next = newNode;\n        }\n        \n        public void prepend(int value) {\n            Node newNode = new Node(value);\n            newNode.next = head;\n            head = newNode;\n        }\n        \n        public void delete(int value) {\n            if (head == null) {\n                return;\n            }\n            \n            if (head.value == value) {\n                head = head.next;\n                return;\n            }\n            \n            Node current = head;\n            while (current.next != null && current.next.value != value) {\n                current = current.next;\n            }\n            \n            if (current.next != null) {\n                current.next = current.next.next;\n            }\n        }\n        \n        public void print() {\n            if (head == null) {\n                System.out.println(\"Empty list\");\n                return;\n            }\n            \n            StringBuilder result = new StringBuilder();\n            Node current = head;\n            while (current != null) {\n                result.append(current.value);\n                if (current.next != null) {\n                    result.append(\" -> \");\n                }\n                current = current.next;\n            }\n            \n            System.out.println(result.toString());\n        }\n        \n        public boolean find(int value) {\n            Node current = head;\n            while (current != null) {\n                if (current.value == value) {\n                    return true;\n                }\n                current = current.next;\n            }\n            \n            return false;\n        }\n    }\n    \n    public static void main(String[] args) {\n        LinkedList list = new LinkedList();\n        list.append(1);\n        list.append(2);\n        list.prepend(0);\n        list.print();  // Should output: 0 -> 1 -> 2\n        list.delete(1);\n        list.print();  // Should output: 0 -> 2\n        System.out.println(list.find(2));  // Should output: true\n        System.out.println(list.find(1));  // Should output: false\n    }\n}",
        cpp: "#include <iostream>\n\nclass Node {\npublic:\n    int value;\n    Node* next;\n    \n    Node(int value) {\n        this->value = value;\n        this->next = nullptr;\n    }\n};\n\nclass LinkedList {\nprivate:\n    Node* head;\n    \npublic:\n    LinkedList() {\n        this->head = nullptr;\n    }\n    \n    void append(int value) {\n        Node* newNode = new Node(value);\n        \n        if (head == nullptr) {\n            head = newNode;\n            return;\n        }\n        \n        Node* current = head;\n        while (current->next != nullptr) {\n            current = current->next;\n        }\n        \n        current->next = newNode;\n    }\n    \n    void prepend(int value) {\n        Node* newNode = new Node(value);\n        newNode->next = head;\n        head = newNode;\n    }\n    \n    void delete_node(int value) {\n        if (head == nullptr) {\n            return;\n        }\n        \n        if (head->value == value) {\n            Node* temp = head;\n            head = head->next;\n            delete temp;\n            return;\n        }\n        \n        Node* current = head;\n        while (current->next != nullptr && current->next->value != value) {\n            current = current->next;\n        }\n        \n        if (current->next != nullptr) {\n            Node* temp = current->next;\n            current->next = current->next->next;\n            delete temp;\n        }\n    }\n    \n    void print() {\n        if (head == nullptr) {\n            std::cout << \"Empty list\" << std::endl;\n            return;\n        }\n        \n        Node* current = head;\n        while (current != nullptr) {\n            std::cout << current->value;\n            if (current->next != nullptr) {\n                std::cout << \" -> \";\n            }\n            current = current->next;\n        }\n        std::cout << std::endl;\n    }\n    \n    bool find(int value) {\n        Node* current = head;\n        while (current != nullptr) {\n            if (current->value == value) {\n                return true;\n            }\n            current = current->next;\n        }\n        \n        return false;\n    }\n    \n    // Destructor to free memory\n    ~LinkedList() {\n        Node* current = head;\n        while (current != nullptr) {\n            Node* next = current->next;\n            delete current;\n            current = next;\n        }\n    }\n};\n\nint main() {\n    LinkedList list;\n    list.append(1);\n    list.append(2);\n    list.prepend(0);\n    list.print();  // Should output: 0 -> 1 -> 2\n    list.delete_node(1);\n    list.print();  // Should output: 0 -> 2\n    std::cout << std::boolalpha;\n    std::cout << list.find(2) << std::endl;  // Should output: true\n    std::cout << list.find(1) << std::endl;  // Should output: false\n    return 0;\n}"
      }
    },
  ];

  useEffect(() => {
    if (selectedChallenge) {
      setCode(selectedChallenge.starterCode[selectedLanguage]);
      setTestCases(selectedChallenge.testCases.map(testCase => ({...testCase})));
    }
  }, [selectedChallenge, selectedLanguage]);

  const handleRunCode = () => {
    // Simulate code execution
    setOutput("Running code...");
    
    setTimeout(() => {
      // Mock output based on the selected challenge
      let outputText;
      
      if (selectedChallenge?.id === 1) {  // Fibonacci
        outputText = "55\nExecution completed successfully in 0.08s";
      } else if (selectedChallenge?.id === 2) {  // Binary Search
        outputText = "2\nExecution completed successfully in 0.05s";
      } else if (selectedChallenge?.id === 3) {  // Palindrome
        outputText = "True\nTrue\nFalse\nExecution completed successfully in 0.04s";
      } else {
        outputText = "Execution completed successfully in 0.10s";
      }
      
      setOutput(outputText);
      toast({
        title: "Code executed",
        description: "Your code ran successfully",
      });
    }, 1000);
  };

  const handleRunTestCase = (index) => {
    const newTestCases = [...testCases];
    const testCase = newTestCases[index];
    
    // Simulate test case execution
    setTimeout(() => {
      // For demo purposes, let's randomly determine if the test passes
      const passes = Math.random() > 0.3;
      
      testCase.status = passes ? 'passed' : 'failed';
      testCase.actual = passes ? testCase.expected : (testCase.expected === 'True' ? 'False' : '0');
      
      setTestCases(newTestCases);
      
      if (passes) {
        toast({
          title: "Test Passed",
          description: `Test case ${index + 1} passed successfully!`,
        });
      } else {
        toast({
          title: "Test Failed",
          description: `Test case ${index + 1} failed. Check your implementation.`,
          variant: "destructive",
        });
      }
    }, 500);
  };
  
  const handleRunAllTests = () => {
    const newTestCases = [...testCases];
    
    // Simulate running all test cases with a slight delay
    newTestCases.forEach((testCase, index) => {
      setTimeout(() => {
        // For demo purposes, most tests pass but some fail
        const passes = Math.random() > 0.2;
        
        const updatedTestCases = [...testCases];
        updatedTestCases[index].status = passes ? 'passed' : 'failed';
        updatedTestCases[index].actual = passes ? testCase.expected : (testCase.expected === 'True' ? 'False' : '0');
        
        setTestCases(updatedTestCases);
      }, index * 300);
    });
    
    toast({
      title: "Running all tests",
      description: "Executing all test cases for your solution",
    });
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setActiveTab("code-editor");
    setCode(challenge.starterCode[selectedLanguage]);
    setTestCases(challenge.testCases.map(testCase => ({...testCase})));
    setOutput("");
  };

  const handleToggleBookmark = (id) => {
    if (bookmarkedChallenges.includes(id)) {
      setBookmarkedChallenges(bookmarkedChallenges.filter(bookmarkId => bookmarkId !== id));
      toast({
        title: "Challenge Unbookmarked",
        description: "Challenge removed from your bookmarks",
      });
    } else {
      setBookmarkedChallenges([...bookmarkedChallenges, id]);
      toast({
        title: "Challenge Bookmarked",
        description: "Challenge added to your bookmarks",
      });
    }
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-highlite-primary">Coding Labs</h1>
          <p className="text-muted-foreground mt-1">Practice, learn, and master coding skills</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Learning Resources
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Challenges Completed</p>
              <p className="text-3xl font-bold">7</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full dark:bg-green-900">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Current Streak</p>
              <p className="text-3xl font-bold">4 days</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-full dark:bg-amber-900">
              <Star className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Coding Points</p>
              <p className="text-3xl font-bold">825</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full dark:bg-purple-900">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Global Rank</p>
              <p className="text-3xl font-bold">#128</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full dark:bg-blue-900">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue={activeTab} className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="code-editor">Code Editor</TabsTrigger>
          <TabsTrigger value="progress">My Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges">
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-3 md:items-center bg-muted/50 p-4 rounded-lg">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search challenges..." className="pl-9" />
              </div>
              
              <div className="flex gap-2 items-center w-full md:w-auto">
                <ListFilter className="h-4 w-4 text-muted-foreground" />
                <ScrollArea className="w-full">
                  <div className="flex gap-2 pb-3">
                    <Button variant="default" size="sm">All</Button>
                    <Button variant="outline" size="sm">Easy</Button>
                    <Button variant="outline" size="sm">Medium</Button>
                    <Button variant="outline" size="sm">Hard</Button>
                    <Button variant="outline" size="sm">Arrays</Button>
                    <Button variant="outline" size="sm">Strings</Button>
                    <Button variant="outline" size="sm">Trees</Button>
                    <Button variant="outline" size="sm">Graphs</Button>
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {challenges.map((challenge) => (
              <motion.div key={challenge.id} variants={itemVariants}>
                <Card className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleBookmark(challenge.id);
                      }}
                    >
                      {bookmarkedChallenges.includes(challenge.id) ? (
                        <BookMarked className="h-4 w-4 text-amber-500" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div onClick={() => handleSelectChallenge(challenge)}>
                    <div className="relative">
                      <AspectRatio ratio={16/9}>
                        <div className={`w-full h-full ${challenge.bgColor} flex items-center justify-center`}>
                          <challenge.icon className="h-12 w-12 text-white" />
                        </div>
                      </AspectRatio>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant={challenge.difficulty === 'Easy' ? 'outline' : 
                              challenge.difficulty === 'Medium' ? 'secondary' : 'default'}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                      <CardDescription className="flex gap-2 items-center text-xs">
                        <Users className="h-3 w-3" />
                        {challenge.completions} completions
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3" />
                        {challenge.estimatedTime}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-2">{challenge.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {challenge.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="w-full">
                        {challenge.completed ? (
                          <div className="flex justify-between items-center text-sm text-green-500">
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Completed
                            </div>
                            <span>{challenge.completedAt}</span>
                          </div>
                        ) : (
                          challenge.started ? (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <Progress value={challenge.progress} className="h-1" />
                            </div>
                          ) : (
                            <Button size="sm" className="w-full mt-2">
                              <Play className="h-3 w-3 mr-2" /> Start Challenge
                            </Button>
                          )
                        )}
                      </div>
                    </CardFooter>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="code-editor">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {selectedChallenge && (
                  <Card className="mb-4">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{selectedChallenge.title}</CardTitle>
                          <CardDescription>{selectedChallenge.description}</CardDescription>
                        </div>
                        <Badge className={`${
                          selectedChallenge.difficulty === 'Easy' ? 'bg-green-500 hover:bg-green-600' :
                          selectedChallenge.difficulty === 'Medium' ? 'bg-blue-500 hover:bg-blue-600' :
                          'bg-red-500 hover:bg-red-600'
                        } text-white`}>
                          {selectedChallenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose dark:prose-invert max-w-none text-sm">
                        <ScrollArea className="h-[200px] pr-4">
                          <div className="markdown-content" dangerouslySetInnerHTML={{ __html: selectedChallenge.detailedDescription.replace(/\n/g, '<br>') }} />
                        </ScrollArea>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-4">
                        {selectedChallenge.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <CodeEditor 
                  language={selectedLanguage} 
                  code={code} 
                  onChange={setCode} 
                />
                
                <div className="flex justify-between gap-2">
                  <div>
                    <Button variant="outline" onClick={() => setCode(selectedChallenge?.starterCode[selectedLanguage])}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleRunAllTests}>
                      <Play className="mr-2 h-4 w-4" />
                      Run Tests
                    </Button>
                    <Button variant="outline">
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button onClick={handleRunCode}>
                      <Play className="mr-2 h-4 w-4" />
                      Run Code
                    </Button>
                  </div>
                </div>
                
                <TerminalOutput output={output} />
                
                {testCases.length > 0 && (
                  <TestCases testCases={testCases} runTestCase={handleRunTestCase} />
                )}
              </div>
            </div>
            
            <div className="space-y-6">
              <AIAssistant />
              
              {selectedChallenge?.hints && selectedChallenge.hints.length > 0 && (
                <HintsCard hints={selectedChallenge.hints} />
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your Coding Progress</CardTitle>
                  <CardDescription>Track your skill development</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm font-medium">Data Structures</h4>
                        <span className="text-sm">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm font-medium">Algorithms</h4>
                        <span className="text-sm">60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm font-medium">Problem Solving</h4>
                        <span className="text-sm">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm font-medium">Database Design</h4>
                        <span className="text-sm">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <h4 className="text-sm font-medium">System Design</h4>
                        <span className="text-sm">30%</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <AchievementsCard />
                <LeaderboardCard />
              </div>
            </div>
            
            <div>
              <LearningPathCard />
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Your latest coding sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { challenge: "Binary Search Algorithm", date: "Today", duration: "45 mins", completed: true },
                    { challenge: "Fibonacci Sequence", date: "Yesterday", duration: "30 mins", completed: false },
                    { challenge: "Graph Traversal", date: "3 days ago", duration: "1 hour", completed: true },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center pb-2 border-b last:border-b-0 last:pb-0">
                      <div>
                        <p className="font-medium text-sm">{activity.challenge}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs">{activity.duration}</p>
                        <p className={`text-xs ${activity.completed ? 'text-green-500' : 'text-amber-500'}`}>
                          {activity.completed ? 'Completed' : 'In progress'}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Practice</CardTitle>
                  <CardDescription>Based on your performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { topic: "Dynamic Programming", reason: "Improve problem-solving skills" },
                    { topic: "Tree Traversals", reason: "You struggled with related challenges" },
                    { topic: "Sorting Algorithms", reason: "Enhance efficiency understanding" },
                  ].map((suggestion, index) => (
                    <div key={index} className="bg-muted rounded-md p-3">
                      <p className="font-medium text-sm">{suggestion.topic}</p>
                      <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingLabs;

