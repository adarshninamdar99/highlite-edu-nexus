
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface CodeEditorProps {
  language?: string;
  initialCode?: string;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  initialCode = "",
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode || getDefaultCodeTemplate(language));
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);

  useEffect(() => {
    // Update line numbers when code changes
    const lines = code.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [code]);

  useEffect(() => {
    // Update code when language changes
    setCode(getDefaultCodeTemplate(language));
  }, [language]);

  function handleCodeChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!readOnly) {
      setCode(e.target.value);
    }
  }

  return (
    <div className="relative h-full overflow-hidden font-mono text-sm bg-[#1E1E1E] rounded-md">
      <div className="flex h-full">
        {/* Line numbers */}
        <div className="py-2 px-2 bg-[#2D2D2D] text-gray-500 select-none text-right min-w-[40px]">
          {lineNumbers.map((num) => (
            <div key={num} className="leading-6">
              {num}
            </div>
          ))}
        </div>

        {/* Code editor */}
        <textarea
          value={code}
          onChange={handleCodeChange}
          className={cn(
            "flex-grow resize-none outline-none border-0 p-2 bg-[#1E1E1E] text-gray-200 leading-6",
            "w-full h-full",
            readOnly ? "cursor-default" : "cursor-text"
          )}
          readOnly={readOnly}
          spellCheck="false"
          wrap="off"
          data-language={language}
        />
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-2 py-1 bg-[#007ACC] text-white text-xs">
        <div className="flex items-center space-x-4">
          <span>{language.toUpperCase()}</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Ln {lineNumbers.length}</span>
          <span>Col {code.split('\n').pop()?.length || 0}</span>
        </div>
      </div>
    </div>
  );
};

// Default code templates based on language
function getDefaultCodeTemplate(language: string): string {
  switch (language.toLowerCase()) {
    case "javascript":
      return `/**
 * @param {Array} nums
 * @return {number}
 */
function solution(nums) {
  // Write your solution here
  
  return 0;
}

// Test your solution
console.log(solution([1, 2, 3, 4, 5]));
`;
    case "python":
      return `def solution(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your solution here
    
    return 0

# Test your solution
print(solution([1, 2, 3, 4, 5]))
`;
    case "java":
      return `import java.util.*;

class Solution {
    public static int solution(int[] nums) {
        // Write your solution here
        
        return 0;
    }
    
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4, 5};
        System.out.println(solution(nums));
    }
}
`;
    case "c++":
      return `#include <iostream>
#include <vector>
using namespace std;

int solution(vector<int>& nums) {
    // Write your solution here
    
    return 0;
}

int main() {
    vector<int> nums = {1, 2, 3, 4, 5};
    cout << solution(nums) << endl;
    return 0;
}
`;
    default:
      return `// Write your code here
`;
  }
}

export default CodeEditor;
