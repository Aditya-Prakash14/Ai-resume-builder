'use client';

import Tiptap from "@/components/ui/tiptap";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Loader2, Trash2, Check, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AIImprovementPrompt } from "./ai-improvement-prompt";



export function DescriptionPoint({
  value,
  onChange,
  onDelete,
  onImprove,
  onAcceptImprovement,
  onUndoImprovement,
  isImproved,
  isLoading,
  placeholder = "Start with a strong action verb",
  improvementPrompt = "",
  onImprovementPromptChange,
  improvementPromptPlaceholder = "e.g., Focus on technical implementation details and performance metrics"
}) {
  return (
    
      
        
        {isImproved && (
          
            
              
              AI Suggestion
            
          
        )}
      
      
        {isImproved ? (
          
            
              
            
            
              
            
          
        ) ="ghost"
              size="icon"
              onClick={onDelete}
              className="p-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300"
            >
              
            
            
              
                
                  
                    {isLoading ? (
                      
                    ) ="h-4 w-4" />
                    )}
                  
                
                {onImprovementPromptChange && (
                  
                    
                  
                )}
              
            
          
        )}
      
    
  );
} 