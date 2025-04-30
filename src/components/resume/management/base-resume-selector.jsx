import { cn } from "@/lib/utils";
import { Resume } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export function BaseResumeSelector({ 
  baseResumes,
  selectedResumeId,
  onResumeSelect,
  isInvalid 
}) {
  return (
    
      
        
      
      
        {baseResumes?.map((resume) => (
          
            {resume.name}
          
        ))}
      
    
  );
} 