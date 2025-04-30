'use client';

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { LoadingDots } from "@/components/ui/loading-dots";

// Define the creation steps
export const CREATION_STEPS = [
  { id: 'analyzing', label: 'Analyzing Job Description' },
  { id: 'formatting', label: 'Formatting Requirements' },
  { id: 'tailoring', label: 'Tailoring Resume Content' },
  { id: 'finalizing', label: 'Finalizing Resume' },
];





export function LoadingOverlay({ currentStep }) {
  const currentStepIndex = CREATION_STEPS.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / CREATION_STEPS.length) * 100;

  return (
    
      
        {/* Progress bar */}
        
          
            Creating Resume
            {Math.round(progress)}%
          
          
        

        {/* Steps */}
        
          {CREATION_STEPS.map((step, index) => {
            const isActive = step.id === currentStep;
            const isCompleted = index 
                {isCompleted ? (
                  
                ) : isActive ? (
                  
                    
                  
                ) ="h-5 w-5 rounded-full border-2 border-muted" />
                )}
                
                  {step.label}
                
              
            );
          })}
        

        {/* Current action description */}
        
          
            {currentStep === 'analyzing' && "Reading and understanding the job requirements..."}
            {currentStep === 'formatting' && "Structuring the job information..."}
            {currentStep === 'tailoring' && "Optimizing your resume for the best match..."}
            {currentStep === 'finalizing' && "Putting the final touches..."}
          
        
      
    
  );
} 