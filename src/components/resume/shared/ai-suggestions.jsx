'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, X } from "lucide-react";
import Tiptap from "@/components/ui/tiptap";





export function AISuggestions({ suggestions, onApprove, onDelete }) {
  if (suggestions.length === 0) return null;

  return (
    
      {/* Animated Background Pattern */}
      
      
      {/* Floating Gradient Orbs */}
      
      
      
      {/* Content */}
      
        
          
            
          
          AI Suggestions
        
        
        
          {suggestions.map((suggestion) => (
            
              
                
                   {}}
                    readOnly={true}
                    className={cn(
                      "min-h-[80px] text-sm",
                      "bg-white/60",
                      "border-purple-200/60",
                      "text-purple-900",
                      "focus:border-purple-300/60 focus:ring-2 focus:ring-purple-500/10",
                      "placeholder:text-purple-400",
                      "transition-all duration-300",
                      "hover:bg-white/80"
                    )}
                  />
                
                
                   onApprove(suggestion)}
                    className={cn(
                      "h-9 w-9",
                      "bg-green-100/80 hover:bg-green-200/80",
                      "text-green-600 hover:text-green-700",
                      "border border-green-200/60",
                      "shadow-sm",
                      "transition-all duration-300",
                      "hover:scale-105 hover:shadow-md",
                      "hover:-translate-y-0.5"
                    )}
                  >
                    
                  
                   onDelete(suggestion.id)}
                    className={cn(
                      "h-9 w-9",
                      "bg-rose-100/80 hover:bg-rose-200/80",
                      "text-rose-600 hover:text-rose-700",
                      "border border-rose-200/60",
                      "shadow-sm",
                      "transition-all duration-300",
                      "hover:scale-105 hover:shadow-md",
                      "hover:-translate-y-0.5"
                    )}
                  >
                    
                  
                
              
            
          ))}
        
      
    
  );
} 