'use client';

import { Resume } from "@/lib/types";
import { Logo } from "@/components/ui/logo";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";



export function ResumeEditorHeader({
  resume,
  hasUnsavedChanges,
}) {
  const router = useRouter();
  const capitalizeWords = (str) => {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleBackClick = () => {
    if (!hasUnsavedChanges) {
      router.push('/');
    }
  };

  // Dynamic color classes based on resume 

  return (
    
      {/* Gradient Overlays */}
      
      
      
      
      {/* Content Container */}
      
        {/* Left Section - Logo, Title  */}
        
          {hasUnsavedChanges ? (
            
              
                
                  
                
              
              
                
                  Unsaved Changes
                  
                    You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
                  
                
                
                  Cancel
                   router.push('/')}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Leave
                  
                
              
            
          ) ={handleBackClick}>
              
            
          )}
          
          
            {/* Resume Title Section */}
            
              
                
                  {resume.is_base_resume ? capitalizeWords(resume.target_role) : resume.name}
                
              
              
                {resume.is_base_resume ? (
                  
                    Base Resume
                  
                ) ="flex items-center gap-2">
                    Tailored Resume
                  
                )}
              
            
          
        
      
    
  );
} 