'use client';

import { AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

;
  onUpgrade) => void;
  onSettings) => void;
}

export function ApiErrorDialog({ 
  open, 
  onOpenChange,
  errorMessage,
  onUpgrade,
  onSettings
}) {
  return (
    
      
        
          
            
              
            
            
              {errorMessage.title}
            
            
              {errorMessage.description}
            
          

          
          
          
            Unlock premium features and advanced AI capabilities
          
          
          
            
              
              
              
              
                
                
                  Upgrade to Pro
                
              
            
            
            
              Set API Keys
            
          

          
             onOpenChange(false)}
              className={cn(
                " text-xs text-gray-700 hover:text-gray-900",
                "h-7 px-2",
                "hover:bg-gray-50/50",
                "transition-colors duration-200 border border-gray-500 bg-gray-200" 
              )}
            >
              Dismiss
            
          
        
      
    
  );
} 