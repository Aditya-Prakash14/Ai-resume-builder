'use client';

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { AIGenerationSettings } from "../../shared/ai-generation-settings";

;
  onNumPointsChange=> void;
  onCustomPromptChange=> void;
  colorClass: {
    button;
    border;
    hoverBorder;
    hoverBg;
    tooltipBg;
    tooltipBorder;
    tooltipShadow;
    text;
    hoverText;
  };
}

export function AIGenerationSettingsTooltip({
  index,
  loadingAI,
  generateAIPoints,
  aiConfig,
  onNumPointsChange,
  onCustomPromptChange,
  colorClass
}) {
  return (
    
      
        
           generateAIPoints(index)}
            disabled={loadingAI}
            className={cn(
              "flex-1 transition-colors text-[10px] sm:text-xs",
              colorClass.button,
              colorClass.border,
              colorClass.hoverBorder,
              colorClass.hoverBg,
              colorClass.hoverText
            )}
          >
            {loadingAI ? (
              
            ) ="h-4 w-4 mr-1" />
            )}
            {loadingAI ? 'Generating...' : 'Write points with AI'}
          
        
        
          
        
      
    
  );
} 