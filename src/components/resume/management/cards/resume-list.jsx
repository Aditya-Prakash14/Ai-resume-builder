import { Resume } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

;
  emptyMessage: React.ReactNode;
  className?;
  itemClassName?;
}

export function ResumeList({
  resumes,
  type,
  accentColor,
  emptyMessage,
  className,
  itemClassName
}) {
  if (!resumes || resumes.length === 0) {
    return emptyMessage;
  }

  return (
    
      {resumes.map((resume) => (
        
          
            {/* Resume Header */}
            
              
                {
} 