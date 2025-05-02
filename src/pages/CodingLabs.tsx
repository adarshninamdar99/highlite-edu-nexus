
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
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
  Play,
  Filter,
  Search,
  SlidersHorizontal,
  Trophy,
  Users,
  Info,
  Heart,
  Bookmark,
  CheckSquare,
  Download,
  Share2
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
  author?: string;
  editorial?: boolean;
  solutions?: number;
  discussions?: number;
}

// Mock challenges data (expanded with additional fields)
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
    author: "LeetCode",
    editorial: true,
    solutions: 1245,
    discussions: 78,
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
    author: "LeetCode",
    editorial: true,
    solutions: 987,
    discussions: 45,
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
    author: "HighliteX",
    editorial: false,
    solutions: 435,
    discussions: 23,
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
    author: "LeetCode",
    editorial: true,
    solutions: 324,
    discussions: 56,
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
  },
  {
    id: "ch005",
    title: "Subset Sum Problem",
    difficulty: "medium",
    tags: ["dynamic programming", "algorithms", "backtracking"],
    description: `Given a set of non-negative integers and a value sum, determine if there is a subset of the given set with sum equal to sum.

For example:
If N = 6, array = [3, 34, 4, 12, 5, 2] and sum = 9, 
Output: True (as there exists a subset {4, 5} with sum 9)`,
    constraints: "1 <= N <= 100\n1 <= array[i] <= 10^5\n1 <= sum <= 10^5",
    inputFormat: "First line: N (number of elements)\nSecond line: N integers separated by space\nThird line: Target sum",
    outputFormat: "True if subset exists, False otherwise",
    testCases: [
      {
        input: "6\n3 34 4 12 5 2\n9",
        output: "True"
      },
      {
        input: "5\n1 2 3 4 5\n10",
        output: "True"
      },
      {
        input: "3\n1 2 3\n7",
        output: "False"
      }
    ],
    timeLimit: 2,
    memoryLimit: 256,
    points: 30,
    successRate: 61.5,
    submissions: 932,
    author: "GeeksForGeeks",
    editorial: true,
    solutions: 456,
    discussions: 32,
    sampleCode: {
      python: `def is_subset_sum(array, n, sum):
    # Your code here
    pass`,
      javascript: `function isSubsetSum(array, n, sum) {
    // Your code here
}`,
      java: `public class Solution {
    public boolean isSubsetSum(int arr[], int n, int sum) {
        // Your code here
        return false;
    }
}`,
      cpp: `bool isSubsetSum(vector<int>& arr, int n, int sum) {
    // Your code here
    return false;
}`
    }
  },
  {
    id: "ch006",
    title: "Merge Sorted Arrays",
    difficulty: "easy",
    tags: ["arrays", "two pointers", "sorting"],
    description: `You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.`,
    constraints: "nums1.length == m + n\nnums2.length == n\n0 <= m, n <= 200\n1 <= m + n <= 200\n-10^9 <= nums1[i], nums2[j] <= 10^9",
    inputFormat: "First line: m n (number of elements in array1 and array2)\nSecond line: m+n integers for array1 (last n are placeholder zeros)\nThird line: n integers for array2",
    outputFormat: "Merged sorted array",
    testCases: [
      {
        input: "3 3\n1 2 3 0 0 0\n2 5 6",
        output: "1 2 2 3 5 6"
      },
      {
        input: "1 0\n1\n",
        output: "1"
      },
      {
        input: "0 1\n0\n1",
        output: "1"
      }
    ],
    timeLimit: 1,
    memoryLimit: 128,
    points: 10,
    successRate: 79.2,
    submissions: 1234,
    author: "LeetCode",
    editorial: false,
    solutions: 765,
    discussions: 22,
    sampleCode: {
      python: `def merge(nums1, m, nums2, n):
    # Your code here
    pass`,
      javascript: `function merge(nums1, m, nums2, n) {
    // Your code here
}`,
      java: `public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        // Your code here
    }
}`,
      cpp: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    // Your code here
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSolved, setShowSolved] = useState(false);
  const [favoriteChallenges, setFavoriteChallenges] = useState<string[]>(["ch001"]);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>(["ch002"]);
  const [sortBy, setSortBy] = useState<"difficulty" | "successRate" | "submissions">("difficulty");
  
  // Add filters
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
  
  // Filter and sort challenges
  let filteredChallenges = filterChallengesByTag(activeFilter)
    .filter(challenge => activeDifficultyFilter === "all" || challenge.difficulty === activeDifficultyFilter);
  
  // Apply search filter
  if (searchQuery) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      challenge.author?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // Favorites filter
  if (showFavorites) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      favoriteChallenges.includes(challenge.id)
    );
  }
  
  // Solved filter
  if (showSolved) {
    filteredChallenges = filteredChallenges.filter(challenge => 
      solvedChallenges.includes(challenge.id)
    );
  }
  
  // Sort challenges
  filteredChallenges = [...filteredChallenges].sort((a, b) => {
    if (sortBy === "difficulty") {
      const difficultyOrder = { "easy": 1, "medium": 2, "hard": 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    } else if (sortBy === "successRate") {
      return b.successRate - a.successRate;
    } else {
      return b.submissions - a.submissions;
    }
  });
  
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
      
      // If passed, add to solved challenges
      if (passed && selectedChallenge && !solvedChallenges.includes(selectedChallenge.id)) {
        setSolvedChallenges(prev => [...prev, selectedChallenge.id]);
      }
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
  
  const toggleFavorite = (challengeId: string) => {
    if (favoriteChallenges.includes(challengeId)) {
      setFavoriteChallenges(prev => prev.filter(id => id !== challengeId));
    } else {
      setFavoriteChallenges(prev => [...prev, challengeId]);
    }
  };
  
  // Calculate progress stats
  const completedChallenges = solvedChallenges.length;
  const totalChallenges = challengesData.length;
  const completionPercentage = (completedChallenges / totalChallenges) * 100;
  
  // Get difficulty distribution
  const easyCount = challengesData.filter(c => c.difficulty === "easy").length;
  const mediumCount = challengesData.filter(c => c.difficulty === "medium").length;
  const hardCount = challengesData.filter(c => c.difficulty === "hard").length;
  
  const easyDoneCount = solvedChallenges.filter(id => 
    challengesData.find(c => c.id === id && c.difficulty === "easy")
  ).length;
  
  const mediumDoneCount = solvedChallenges.filter(id => 
    challengesData.find(c => c.id === id && c.difficulty === "medium")
  ).length;
  
  const hardDoneCount = solvedChallenges.filter(id => 
    challengesData.find(c => c.id === id && c.difficulty === "hard")
  ).length;

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
          <Button variant="outline" className="gap-1">
            <Users className="h-4 w-4" />
            Community
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="challenges" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 mb-2">
          <TabsTrigger value="challenges">Problem Set</TabsTrigger>
          <TabsTrigger value="contests">Contests</TabsTrigger>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
          <TabsTrigger value="my-progress">My Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="challenges" className="space-y-4">
          {/* Filter and search bar */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search problems by name, tag, or author"
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    <span>Sort by</span>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="difficulty">Difficulty</SelectItem>
                    <SelectItem value="successRate">Success Rate</SelectItem>
                    <SelectItem value="submissions">Popularity</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2" onClick={() => setShowFavorites(!showFavorites)}>
                  <Heart className={cn("h-4 w-4", showFavorites ? "fill-red-500 text-red-500" : "")} />
                  Favorites
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => setShowSolved(!showSolved)}>
                  <CheckSquare className={cn("h-4 w-4", showSolved ? "fill-green-500 text-green-500" : "")} />
                  Solved
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
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
                onClick={() => setActiveFilter("dynamic programming")}
                variant={activeFilter === "dynamic programming" ? "default" : "outline"}
                size="sm" 
                className="rounded-full"
              >
                Dynamic Programming
              </Button>
              <Button 
                onClick={() => setActiveFilter("graph")}
                variant={activeFilter === "graph" ? "default" : "outline"}
                size="sm" 
                className="rounded-full"
              >
                Graphs
              </Button>
              <Button 
                onClick={() => setActiveFilter("string")}
                variant={activeFilter === "string" ? "default" : "outline"}
                size="sm" 
                className="rounded-full"
              >
                Strings
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
          </Card>
          
          {/* Problems table - CodeChef style */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Problems ({filteredChallenges.length})</CardTitle>
              <CardDescription>Click on a problem to start coding</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-3 text-left">Code</th>
                      <th className="p-3 text-left">Problem</th>
                      <th className="p-3 text-center">Difficulty</th>
                      <th className="p-3 text-center">Success Rate</th>
                      <th className="p-3 text-center">Points</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChallenges.map((challenge) => (
                      <tr key={challenge.id} className="border-b cursor-pointer hover:bg-muted/30" onClick={() => handleSelectChallenge(challenge)}>
                        <td className="p-3 font-mono text-sm">{challenge.id}</td>
                        <td className="p-3">
                          <div className="flex items-start gap-2">
                            <div>
                              <div className="font-medium">{challenge.title}</div>
                              <div className="text-xs text-muted-foreground flex flex-wrap gap-1 mt-1">
                                {challenge.tags.map(tag => (
                                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center">
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
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-sm">{challenge.successRate}%</span>
                            <div className="h-1.5 w-16 bg-gray-200 rounded-full">
                              <div 
                                className={cn(
                                  "h-full rounded-full",
                                  challenge.successRate > 70 ? "bg-green-500" :
                                  challenge.successRate > 40 ? "bg-yellow-500" : "bg-red-500"
                                )}
                                style={{ width: `${challenge.successRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className="font-medium">{challenge.points}</span>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-center gap-2">
                            {solvedChallenges.includes(challenge.id) && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            <button 
                              className="text-muted-foreground hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(challenge.id);
                              }}
                            >
                              <Heart className={cn(
                                "h-5 w-5", 
                                favoriteChallenges.includes(challenge.id) ? "fill-red-500 text-red-500" : ""
                              )} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredChallenges.length === 0 && (
                  <div className="p-8 text-center text-muted-foreground">
                    No problems match your current filters.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Selected challenge detail */}
          {selectedChallenge && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-2xl">{selectedChallenge.title}</CardTitle>
                      <button 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => toggleFavorite(selectedChallenge.id)}
                      >
                        <Heart className={cn(
                          "h-5 w-5", 
                          favoriteChallenges.includes(selectedChallenge.id) ? "fill-red-500 text-red-500" : ""
                        )} />
                      </button>
                    </div>
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
              
              <CardContent className="pb-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left side - Problem details */}
                  <div className="lg:w-1/2">
                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="solutions" className="relative">
                          Solutions
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {selectedChallenge.solutions || 0}
                          </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="discussions" className="relative">
                          Discussions
                          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                            {selectedChallenge.discussions || 0}
                          </Badge>
                        </TabsTrigger>
                        <TabsTrigger value="submissions">My Submissions</TabsTrigger>
                        <TabsTrigger value="editorial" disabled={!selectedChallenge.editorial}>Editorial</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="description" className="pt-4 space-y-4">
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                          <div>
                            <h3 className="font-semibold text-sm mb-1">Problem Statement</h3>
                            <p className="text-sm whitespace-pre-line">{selectedChallenge.description}</p>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-4">
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
                                <div key={idx} className="border rounded-md overflow-hidden">
                                  <div className="bg-muted px-3 py-1 font-semibold text-xs">Test Case {idx + 1}</div>
                                  <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="p-2 text-xs border-r">
                                      <div className="font-semibold">Input:</div>
                                      <pre className="whitespace-pre-wrap mt-1 bg-zinc-100 p-2 rounded">{testCase.input}</pre>
                                    </div>
                                    <div className="p-2 text-xs">
                                      <div className="font-semibold">Output:</div>
                                      <pre className="whitespace-pre-wrap mt-1 bg-zinc-100 p-2 rounded">{testCase.output}</pre>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-4">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download PDF
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Share2 className="h-4 w-4" />
                              Share
                            </Button>
                            {selectedChallenge.author && (
                              <div className="ml-auto flex items-center text-xs text-muted-foreground">
                                <span>Author: {selectedChallenge.author}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="solutions">
                        <div className="p-6 text-center">
                          <div className="flex flex-col items-center">
                            <div className="rounded-full bg-muted p-3 mb-2">
                              <Info className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-medium">Community Solutions</h3>
                            <p className="text-muted-foreground mt-1">
                              View solutions from other developers after you've solved this problem.
                            </p>
                            <Button className="mt-4">Solve to Unlock Solutions</Button>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="discussions">
                        <div className="p-6">
                          <div className="space-y-4">
                            <div className="flex justify-between">
                              <h3 className="text-lg font-medium">Discussions</h3>
                              <Button size="sm">New Post</Button>
                            </div>
                            <div className="border rounded-md p-4 text-center text-muted-foreground">
                              Join the discussion about this problem.
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="submissions">
                        <div className="p-6">
                          <div className="flex flex-col items-center justify-center py-8">
                            {solvedChallenges.includes(selectedChallenge.id) ? (
                              <div className="text-center">
                                <div className="flex justify-center">
                                  <Trophy className="h-12 w-12 text-yellow-500" />
                                </div>
                                <h3 className="text-xl font-medium mt-2">Challenge Completed!</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  You've successfully solved this challenge.
                                </p>
                                <Button className="mt-4">View Your Submission</Button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <p className="text-muted-foreground">
                                  You haven't submitted any solutions for this problem yet.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="editorial">
                        <div className="p-6">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Problem Editorial</h3>
                            <Separator />
                            <div className="text-center p-8 text-muted-foreground">
                              {selectedChallenge.editorial ? (
                                <>
                                  <p>Editorial content is available after you solve the problem.</p>
                                  <Button variant="outline" className="mt-4">Solve to Unlock</Button>
                                </>
                              ) : (
                                <p>No editorial is available for this problem.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Right side - Code Editor */}
                  <div className="lg:w-1/2">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div className="text-sm font-medium">Solution</div>
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
                      
                      {/* Code editor mockup */}
                      <div className="relative mb-3">
                        <div className="font-mono text-sm bg-zinc-900 text-zinc-50 p-4 rounded-md h-[320px] overflow-auto">
                          <pre>
                            {selectedChallenge.sampleCode[codeLanguage]}
                          </pre>
                        </div>
                      </div>
                      
                      <div className="flex justify-between gap-2">
                        <div className="flex gap-2">
                          <Button
                            onClick={handleRunCode}
                            disabled={isRunning}
                            variant="outline"
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
                            Submit
                          </Button>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Ask AI
                          </Button>
                        </div>
                      </div>
                      
                      {/* Output Section */}
                      {output && (
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-1">Output</div>
                          <div className="font-mono text-sm bg-zinc-900 text-zinc-50 p-4 rounded-md max-h-[200px] overflow-auto">
                            <pre className="whitespace-pre-wrap">{output}</pre>
                          </div>
                        </div>
                      )}
                      
                      {/* Challenge metadata */}
                      <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          <span>Time Limit: {selectedChallenge.timeLimit}s</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Code className="h-3.5 w-3.5" />
                          <span>Memory Limit: {selectedChallenge.memoryLimit} MB</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="h-3.5 w-3.5" />
                          <span>{selectedChallenge.points} Points</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Contests Tab */}
        <TabsContent value="contests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Contests</CardTitle>
              <CardDescription>
                Participate in coding competitions and win prizes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Weekly Challenge #42</h3>
                      <p className="text-sm text-muted-foreground mt-1">May 10, 2025 - 48 hours</p>
                      <div className="flex gap-1 mt-2">
                        <Badge variant="outline">Algorithms</Badge>
                        <Badge variant="outline">Data Structures</Badge>
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">HighliteX Hackathon</h3>
                      <p className="text-sm text-muted-foreground mt-1">May 15-17, 2025 - 48 hours</p>
                      <div className="flex gap-1 mt-2">
                        <Badge variant="outline">Full Stack</Badge>
                        <Badge variant="outline">AI/ML</Badge>
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Data Science Competition</h3>
                      <p className="text-sm text-muted-foreground mt-1">June 5, 2025 - 7 days</p>
                      <div className="flex gap-1 mt-2">
                        <Badge variant="outline">Data Science</Badge>
                        <Badge variant="outline">Machine Learning</Badge>
                      </div>
                    </div>
                    <Button size="sm">Register</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Past Contests</CardTitle>
              <CardDescription>
                View results and practice problems from past contests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Weekly Challenge #41</h3>
                      <p className="text-sm text-muted-foreground mt-1">May 3, 2025</p>
                      <div className="flex gap-1 mt-2">
                        <Badge variant="outline">Dynamic Programming</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Problems</Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Code Sprint 2025</h3>
                      <p className="text-sm text-muted-foreground mt-1">April 15-20, 2025</p>
                      <div className="flex gap-1 mt-2">
                        <Badge variant="outline">Algorithms</Badge>
                        <Badge variant="outline">Optimization</Badge>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">View Problems</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <span>{easyDoneCount}/{easyCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={(easyDoneCount / easyCount) * 100} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-green-600 rounded-full" 
                        style={{ width: `${(easyDoneCount / easyCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Medium</span>
                      <span>{mediumDoneCount}/{mediumCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={(mediumDoneCount / mediumCount) * 100} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-yellow-600 rounded-full" 
                        style={{ width: `${(mediumDoneCount / mediumCount) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Hard</span>
                      <span>{hardDoneCount}/{hardCount}</span>
                    </div>
                    <div className="relative w-full">
                      <Progress value={(hardDoneCount / hardCount) * 100} className="h-2 bg-muted" />
                      <div 
                        className="absolute top-0 left-0 h-2 bg-red-600 rounded-full" 
                        style={{ width: `${(hardDoneCount / hardCount) * 100}%` }}
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
                      <p className="text-sm font-medium">Solved: Valid Parentheses</p>
                      <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <Play className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Attempted: BFS Graph Traversal</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:12 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-muted rounded-full p-1.5">
                      <Heart className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Favorited: Dynamic Programming: Coin Change</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Skill Proficiency</CardTitle>
              <CardDescription>Your proficiency across different algorithm categories</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Arrays & Strings</span>
                    <span>Advanced</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Data Structures</span>
                    <span>Intermediate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "60%" }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Algorithms</span>
                    <span>Intermediate</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: "55%" }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Dynamic Programming</span>
                    <span>Beginner</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Graphs</span>
                    <span>Beginner</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 border rounded-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Recommended Next Steps</h3>
                    <p className="text-sm text-muted-foreground mt-1">Based on your skills and progress</p>
                  </div>
                  <Button size="sm">View Path</Button>
                </div>
                <ul className="mt-3 space-y-2">
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Complete the Dynamic Programming challenges</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Attempt medium difficulty Graph problems</span>
                  </li>
                  <li className="flex gap-2 items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                    <span>Take the Algorithms Advanced course</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingLabs;

