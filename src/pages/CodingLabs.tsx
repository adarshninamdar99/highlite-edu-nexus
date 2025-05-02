
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
  Download
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
        <pre className="whitespace-pre-wrap">
          <code>
            {code}
          </code>
        </pre>
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
      setMessages([
        ...newMessages,
        { role: 'assistant', content: "I see you're working with loops. Remember that 'for' loops are best when you know the number of iterations in advance, while 'while' loops are better when you're waiting for a condition to change. What specific issue are you having?" }
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
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">Your Coding Path</CardTitle>
        <CardDescription>Personalized learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-blue-100">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-100">
              <CheckCircle className="h-3 w-3 text-blue-600" />
            </div>
            <h3 className="font-medium">Basics of Programming</h3>
            <p className="text-sm text-muted-foreground">Variables, conditionals, loops</p>
          </div>
          
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-blue-100">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-blue-600 bg-blue-600 text-white">
              <span className="text-xs">2</span>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium">Data Structures</h3>
              <p className="text-sm text-muted-foreground">Arrays, linked lists, trees</p>
              <Progress value={65} className="h-1.5 mt-1" />
            </div>
          </div>
          
          <div className="relative pl-8 before:absolute before:left-3 before:h-full before:w-0.5 before:bg-gray-100">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white">
              <span className="text-xs">3</span>
            </div>
            <h3 className="font-medium text-muted-foreground">Algorithms</h3>
            <p className="text-sm text-muted-foreground">Sorting, searching, recursion</p>
          </div>
          
          <div className="relative pl-8">
            <div className="absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white">
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
            <div className={`p-2 rounded-full ${achievement.earned ? 'bg-amber-100' : 'bg-gray-100'}`}>
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
              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
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

// Main Coding Labs page component
const CodingLabs = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("challenges");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState("# Write your code here\n\ndef solution(n):\n    # Your implementation\n    return n * 2\n\n# Test your solution\nprint(solution(5))");
  const [output, setOutput] = useState("");

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
      difficulty: "Easy",
      completions: 1458,
      estimatedTime: "20 mins",
      tags: ["Recursion", "Dynamic Programming", "Math"],
      bgColor: "bg-gradient-to-r from-green-500 to-teal-500",
      icon: BookText,
      started: true,
      progress: 75,
      completed: false
    },
    {
      id: 2,
      title: "Binary Search Algorithm",
      description: "Implement the binary search algorithm to find an element in a sorted array.",
      difficulty: "Medium",
      completions: 982,
      estimatedTime: "30 mins",
      tags: ["Searching", "Algorithms", "Divide & Conquer"],
      bgColor: "bg-gradient-to-r from-blue-500 to-indigo-500",
      icon: Code,
      started: false,
      progress: 0,
      completed: false
    },
    {
      id: 3,
      title: "Palindrome Checker",
      description: "Create a function that determines whether a given string is a palindrome.",
      difficulty: "Easy",
      completions: 2104,
      estimatedTime: "15 mins",
      tags: ["Strings", "Algorithms"],
      bgColor: "bg-gradient-to-r from-purple-500 to-pink-500",
      icon: FileCode,
      started: false,
      progress: 0,
      completed: false
    },
    {
      id: 4,
      title: "Graph Traversal",
      description: "Implement BFS and DFS algorithms for traversing a graph data structure.",
      difficulty: "Hard",
      completions: 682,
      estimatedTime: "45 mins",
      tags: ["Graphs", "Algorithms", "BFS", "DFS"],
      bgColor: "bg-gradient-to-r from-red-500 to-orange-500",
      icon: FileCode2,
      completed: true,
      completedAt: "2 days ago"
    },
    {
      id: 5,
      title: "Array Sorting",
      description: "Implement two different sorting algorithms and compare their performance.",
      difficulty: "Medium",
      completions: 1287,
      estimatedTime: "35 mins",
      tags: ["Sorting", "Algorithms", "Arrays"],
      bgColor: "bg-gradient-to-r from-yellow-500 to-amber-500",
      icon: Code,
      started: false,
      progress: 0,
      completed: false
    },
    {
      id: 6,
      title: "Linked List Operations",
      description: "Implement basic operations on a singly linked list data structure.",
      difficulty: "Medium",
      completions: 876,
      estimatedTime: "40 mins",
      tags: ["Linked Lists", "Data Structures"],
      bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
      icon: FileCode,
      started: true,
      progress: 30,
      completed: false
    },
  ];

  const handleRunCode = () => {
    // Simulate code execution
    setOutput("Running code...");
    
    setTimeout(() => {
      setOutput("10\nExecution completed successfully in 0.12s");
      toast({
        title: "Code executed",
        description: "Your code ran successfully",
      });
    }, 1000);
  };

  const handleSelectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setActiveTab("code-editor");
    
    // Set appropriate starter code based on the challenge
    if (challenge.id === 1) {
      setCode("# Fibonacci Sequence Challenge\n\ndef fibonacci(n):\n    # Your implementation here\n    pass\n\n# Test your solution\nprint(fibonacci(10))");
    } else if (challenge.id === 2) {
      setCode("# Binary Search Challenge\n\ndef binary_search(arr, target):\n    # Your implementation here\n    pass\n\n# Test your solution\nprint(binary_search([1, 2, 3, 4, 5], 3))");
    } else {
      setCode("# Challenge: " + challenge.title + "\n\n# Your implementation here\n\n# Test your solution");
    }
    
    setOutput("");
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
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Current Streak</p>
              <p className="text-3xl font-bold">4 days</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-full">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Coding Points</p>
              <p className="text-3xl font-bold">825</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Global Rank</p>
              <p className="text-3xl font-bold">#128</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
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
            <div className="flex flex-col md:flex-row gap-3 items-center bg-muted/50 p-4 rounded-lg">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search challenges..." className="pl-9" />
              </div>
              
              <div className="flex gap-2 items-center w-full md:w-auto">
                <ListFilter className="h-4 w-4 text-muted-foreground" />
                <ScrollArea className="w-full" orientation="horizontal">
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
                <ChallengeCard 
                  challenge={challenge} 
                  onSelect={handleSelectChallenge} 
                />
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
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{selectedChallenge.title}</CardTitle>
                          <CardDescription>{selectedChallenge.description}</CardDescription>
                        </div>
                        <Badge>{selectedChallenge.difficulty}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {selectedChallenge.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">{tag}</Badge>
                        ))}
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Example Input:</h4>
                          <pre className="bg-muted p-2 rounded text-sm">10</pre>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Expected Output:</h4>
                          <pre className="bg-muted p-2 rounded text-sm">55</pre>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <CodeEditor 
                  language={selectedLanguage} 
                  code={code} 
                  onChange={setCode} 
                />
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Reset</Button>
                  <Button variant="outline">Save</Button>
                  <Button onClick={handleRunCode}>
                    <Play className="mr-2 h-4 w-4" />
                    Run Code
                  </Button>
                </div>
                
                <TerminalOutput output={output} />
              </div>
            </div>
            
            <div className="h-[800px]">
              <AIAssistant />
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
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <AchievementsCard />
                <LeaderboardCard />
              </div>
            </div>
            
            <div>
              <LearningPathCard />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodingLabs;
