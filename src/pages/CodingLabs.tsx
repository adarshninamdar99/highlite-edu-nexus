
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, BookOpen, Code, Play, Star } from "lucide-react";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";
type Category = "Arrays" | "Strings" | "Dynamic Programming" | "Graphs" | "Trees" | "Math" | "Sorting";

interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  category: Category;
  solvedBy: number;
  successRate: number;
}

interface Contest {
  id: string;
  title: string;
  startDate: string;
  duration: string;
  registered: number;
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
    },
    {
      id: "PROB2",
      title: "Merge Sorted Arrays",
      difficulty: "Easy",
      category: "Arrays",
      solvedBy: 7213,
      successRate: 68,
    },
    {
      id: "PROB3",
      title: "String Manipulation",
      difficulty: "Medium",
      category: "Strings",
      solvedBy: 5428,
      successRate: 56,
    },
    {
      id: "PROB4",
      title: "Longest Common Subsequence",
      difficulty: "Hard",
      category: "Dynamic Programming",
      solvedBy: 3241,
      successRate: 42,
    },
    {
      id: "PROB5",
      title: "Graph Traversal",
      difficulty: "Medium",
      category: "Graphs",
      solvedBy: 4782,
      successRate: 51,
    },
    {
      id: "PROB6",
      title: "Binary Tree Inversion",
      difficulty: "Medium",
      category: "Trees",
      solvedBy: 6143,
      successRate: 59,
    },
    {
      id: "PROB7",
      title: "Prime Factorization",
      difficulty: "Hard",
      category: "Math",
      solvedBy: 2874,
      successRate: 38,
    },
    {
      id: "PROB8",
      title: "Quick Sort Implementation",
      difficulty: "Hard",
      category: "Sorting",
      solvedBy: 3527,
      successRate: 45,
    },
    {
      id: "PROB9",
      title: "Valid Parentheses",
      difficulty: "Easy",
      category: "Strings",
      solvedBy: 8936,
      successRate: 71,
    },
    {
      id: "PROB10",
      title: "Advanced Graph Algorithms",
      difficulty: "Expert",
      category: "Graphs",
      solvedBy: 1523,
      successRate: 29,
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

  const sortedProblems = [...problems].sort((a, b) => {
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
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Coding Labs</h1>
            <p className="text-muted-foreground mt-1">
              Enhance your coding skills with our curated collection of programming challenges
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="hidden md:flex">
              <BookOpen className="w-4 h-4 mr-2" />
              Learning Path
            </Button>
            <Button variant="default" className="highlite-gradient-bg">
              <Play className="w-4 h-4 mr-2" />
              Start Practicing
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-t-4 border-t-highlite-accent">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl flex items-center">
                <Code className="w-5 h-5 mr-2 text-highlite-accent" />
                Your Coding Progress
              </CardTitle>
              <CardDescription>
                Track your skill development across different areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Problem Solving</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress 
                    value={75} 
                    className="h-2 bg-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Data Structures</span>
                    <span className="text-muted-foreground">62%</span>
                  </div>
                  <Progress 
                    value={62} 
                    className="h-2 bg-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Algorithms</span>
                    <span className="text-muted-foreground">48%</span>
                  </div>
                  <Progress 
                    value={48} 
                    className="h-2 bg-slate-200"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-highlite-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl flex items-center">
                <Star className="w-5 h-5 mr-2 text-highlite-primary" />
                Your Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-highlite-primary">23</div>
                  <div className="text-sm text-muted-foreground">Problems Solved</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-highlite-secondary">5</div>
                  <div className="text-sm text-muted-foreground">Contests Joined</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-highlite-accent">12</div>
                  <div className="text-sm text-muted-foreground">Streak Days</div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-highlite-light">1250</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs 
          defaultValue="explore" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-2 md:w-[400px] mb-6">
            <TabsTrigger value="explore">Practice Problems</TabsTrigger>
            <TabsTrigger value="contests">Upcoming Contests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore" className="space-y-6">
            <Card className="border shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => requestSort("title")}
                        >
                          Problem {getSortIcon("title")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => requestSort("difficulty")}
                        >
                          Difficulty {getSortIcon("difficulty")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer"
                          onClick={() => requestSort("category")}
                        >
                          Category {getSortIcon("category")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-right"
                          onClick={() => requestSort("solvedBy")}
                        >
                          Solved By {getSortIcon("solvedBy")}
                        </TableHead>
                        <TableHead 
                          className="cursor-pointer text-right"
                          onClick={() => requestSort("successRate")}
                        >
                          Success Rate {getSortIcon("successRate")}
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProblems.map((problem) => (
                        <TableRow key={problem.id} className="hover:bg-slate-50/80 group">
                          <TableCell className="font-medium">{problem.title}</TableCell>
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
                          <TableCell className="text-right">
                            {problem.solvedBy.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <span>{problem.successRate}%</span>
                              <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
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
                              variant="outline" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                  <CardDescription>
                    Based on your recent activity and skill level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {problems.slice(0, 3).map((problem) => (
                      <div 
                        key={`rec-${problem.id}`}
                        className="flex justify-between items-center p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                      >
                        <div>
                          <div className="font-medium">{problem.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                            <Badge variant="outline" className={`${difficultyColor[problem.difficulty]}`}>
                              {problem.difficulty}
                            </Badge>
                            <span>•</span>
                            <span>{problem.category}</span>
                          </div>
                        </div>
                        <Button size="sm">Start</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills to Improve</CardTitle>
                  <CardDescription>
                    Focus on these areas to advance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Graph Theory</span>
                        <span className="text-muted-foreground">35%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-orange-500" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Dynamic Programming</span>
                        <span className="text-muted-foreground">42%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-yellow-500" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Bit Manipulation</span>
                        <span className="text-muted-foreground">28%</span>
                      </div>
                      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-red-500" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Skills
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {contests.map((contest) => (
                <Card key={contest.id} className="overflow-hidden">
                  <div className="h-2 w-full highlite-gradient-bg"></div>
                  <CardHeader>
                    <CardTitle className="truncate">{contest.title}</CardTitle>
                    <CardDescription>
                      {new Date(contest.startDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm pb-2">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{contest.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Participants:</span>
                      <span>{contest.registered.toLocaleString()}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant="outline">
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Past Contests Results</CardTitle>
                <CardDescription>
                  Review your performance in previous contests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Weekly Challenge #41</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        April 25, 2025
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rank: 178 / 1024</div>
                      <div className="text-sm text-muted-foreground">
                        Score: 350 points
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Data Structures Marathon</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        April 12, 2025
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rank: 215 / 872</div>
                      <div className="text-sm text-muted-foreground">
                        Score: 285 points
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-lg border">
                    <div>
                      <div className="font-medium">Coding Blitz #17</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        March 28, 2025
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Rank: 93 / 645</div>
                      <div className="text-sm text-muted-foreground">
                        Score: 420 points
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Results</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CodingLabs;
