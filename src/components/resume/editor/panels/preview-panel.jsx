'use client';

import { Resume } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ResumePreview } from "../preview/resume-preview";
import CoverLetter from "@/components/cover-letter/cover-letter";
import { ResumeContextMenu } from "../preview/resume-context-menu";



export function PreviewPanel({
  resume,
  // onResumeChange,
  width
}) {
  return (
    
      
      
          
        
      

       {
        //   if ('has_cover_letter' in data) {
        //     onResumeChange('has_cover_letter', data.has_cover_letter;
        //   }
        //   if ('cover_letter' in data) {    
        //     onResumeChange('cover_letter', data.cover_letter;
        //   }
        // }}
      />
    
  );
} 