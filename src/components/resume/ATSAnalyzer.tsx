
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';

interface Improvement {
  title: string;
  status: string;
  details: string;
}

interface ATSAnalyzerProps {
  score: number;
  improvements: Improvement[];
  isAnalyzing: boolean;
  onAnalyze: () => void;
}

const ATSAnalyzer: React.FC<ATSAnalyzerProps> = ({ score, improvements, isAnalyzing, onAnalyze }) => {
  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center rounded-full border-8 border-highlite-extralight p-4 h-32 w-32 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full">
              <circle
                className="text-gray-200"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="54"
                cx="64"
                cy="64"
              />
              <circle
                className={score >= 85 ? "text-green-500" : score >= 70 ? "text-amber-500" : "text-red-500"}
                strokeWidth="8"
                strokeDasharray={339.2}
                strokeDashoffset={339.2 * (1 - score / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="54"
                cx="64"
                cy="64"
                style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
              />
            </svg>
            <span className={`text-3xl font-bold absolute ${getScoreColor()}`}>
              {isAnalyzing ? "..." : `${score}%`}
            </span>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          {score >= 85 ? "Your resume is excellent!" : 
           score >= 70 ? "Your resume is good, with room for improvement" : 
           "Your resume needs significant improvements"}
        </p>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="font-medium mb-4">Suggested Improvements</h3>
        <ul className="space-y-3">
          {improvements.map((item, index) => (
            <li key={index}>
              <Collapsible>
                <div className="flex items-start">
                  <CollapsibleTrigger className="flex items-start text-left group">
                    {item.status === "success" ? (
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    ) : (
                      <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <span className="text-sm font-medium">{item.title}</span>
                      <ChevronDown className="h-3 w-3 inline ml-1 text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                    </div>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="pl-6 mt-1">
                  <p className="text-xs text-gray-600">{item.details}</p>
                </CollapsibleContent>
              </Collapsible>
            </li>
          ))}
        </ul>
      </div>
      
      <Separator />
      
      <Button 
        className="w-full bg-highlite-accent hover:bg-highlite-light"
        disabled={isAnalyzing}
        onClick={onAnalyze}
      >
        {isAnalyzing ? "Analyzing..." : "Analyze with AI"}
      </Button>
    </div>
  );
};

export default ATSAnalyzer;
