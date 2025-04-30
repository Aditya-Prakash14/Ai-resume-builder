import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Brain } from "lucide-react";
import { ComponentPropsWithoutRef } from "react";



function ImportMethodRadioItem({
  title,
  description,
  icon,
  id,
  ...props
}) {
  return (
    
      
      
        
          
            {icon}
          
          {title}
          {description}
        
      
    
  );
}



export function ImportMethodRadioGroup({ value, onChange }) {
  return (
    
       onChange('ai')}
        title="Tailor with AI"
        description="Let AI analyze the job description and optimize your resume for the best match"
        icon={}
      />
      
       onChange('import-profile')}
        title="Copy Base Resume"
        description="Create a copy of your base resume. Add a job description to link it to a specific position."
        icon={}
      />
    
  );
} 