import CoverLetterEditor from "./cover-letter-editor";
import { useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useResumeContext } from '@/components/resume/editor/resume-editor-context';





export default function CoverLetter({ containerWidth }, dispatch } = useResumeContext();
  const contentRef = useRef(null);

  const handleContentChange = useCallback((data) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field: 'cover_letter',
      value: {
        content: data.content,
        lastUpdated).toISOString()
      }
    });
  }, [dispatch]);


  if (!state.resume.has_cover_letter) {
    return (
      
         dispatch({
            type: 'UPDATE_FIELD',
            field: 'has_cover_letter',
            value)}
        >
          
          Create Cover Letter
        
      
    );
  }

  return (
    
      {/* Print version */}
      
        
      
      
      {/* Interactive editor */}
      
        
      
      
      {/* 
        
        Export*/}
    
  );
}

