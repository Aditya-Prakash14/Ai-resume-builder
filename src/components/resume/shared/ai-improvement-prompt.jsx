'use client';

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";



export function AIImprovementPrompt({
  value,
  onChange,
  onSubmit,
  isLoading,
  placeholder = "e.g., Make it more impactful and quantifiable",
  hideSubmitButton = false
}) {
  return (
    
      
        Prompt for AI (Optional)
         onChange(e.target.value)}
          placeholder={placeholder}
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
      
      {!hideSubmitButton && onSubmit && (
        
          {isLoading ? (
            
              
              Improving...
            
          ) ="h-3.5 w-3.5 mr-1.5" />
              Improve with AI
            
          )}
        
      )}
    
  );
} 