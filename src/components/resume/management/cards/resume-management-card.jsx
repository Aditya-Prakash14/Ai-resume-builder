import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight } from "lucide-react";

import { ResumeList } from "./resume-list";
import { Resume } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Profile } from "@/lib/types";
import { CreateResumeDialog } from "../dialogs/create-resume-dialog";

;
}

export function ResumeManagementCard({
  type,
  resumes,
  baseResumes,
  profile,
  icon,
  title,
  description,
  emptyTitle,
  emptyDescription,
  gradientFrom,
  gradientTo,
  accentColor,
}) {
  const isDisabled = 
  const buttonText = 

  return (
    
      {/* Multi-layered animated gradient background */}
      
        {/* Primary gradient layer */}
        
        
        {/* Secondary floating orbs */}
        
        
      

      {/* Header Section */}
      
        {/* Background Pattern */}
        
          
        
        
        {/* Header Content */}
        
          
            
              
                {icon}
              
            
            
              
                {title}
              
              
                {description} • {resumes.length} active
              
            
          
          
            <CreateResumeDialog type={type} baseResumes={
} 