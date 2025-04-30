'use client';

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function SuggestionSkeleton() {
  return (
    
      {/* Background Pattern */}
      
      
      {/* Floating Gradient Orbs */}
      
      

      {/* Content */}
      
        {/* Header */}
        
          
            
          
          
        

        {/* Main Content */}
        
          {/* Title Area */}
          
            
              
              
            
            
          

          {/* Description Lines */}
          
            {[...Array(3)].map((_, i) => (
              
                
                
              
            ))}
          

          {/* Tags */}
          
            {[...Array(4)].map((_, i) => (
              
            ))}
          
        

        {/* Action Buttons */}
        
          
          
        
      
    
  );
} 