'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";



export function AIGenerationSettings({
  numPoints,
  customPrompt,
  onNumPointsChange,
  onCustomPromptChange,
  promptPlaceholder = "e.g., Focus on leadership and team management achievements"
}) {
  return (
    
      {/* Header */}
      
        
          
        
        AI Generation Settings
      

      {/* Number of Suggestions */}
      
        Points to Generate
         onNumPointsChange(parseInt(e.target.value) || 3)}
          className={cn(
            "h-7 mt-0.5",
            "bg-white",
            "border-purple-200",
            "focus:border-purple-400 focus:ring-1 focus:ring-purple-300",
            "hover:bg-white",
            "text-purple-900 text-xs"
          )}
        />
      

      {/* Custom Focus */}
      
        Prompt for AI (Optional)
         onCustomPromptChange(e.target.value)}
          placeholder={promptPlaceholder}
          className={cn(
            "h-14 mt-0.5 text-xs",
            "bg-white",
            "border-purple-200",
            "focus:border-purple-400 focus:ring-1 focus:ring-purple-300",
            "hover:bg-white",
            "resize-none",
            "text-purple-900 placeholder:text-purple-400"
          )}
        />
      
    
  );
} 