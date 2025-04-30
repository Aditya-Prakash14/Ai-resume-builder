'use client';

import { Resume } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, Loader2, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { pdf } from '@react-pdf/renderer';
import { TextImport } from "../../text-import";
import { ResumePDFDocument } from "../preview/resume-pdf-document";
import { cn } from "@/lib/utils";
import { useResumeContext } from "../resume-editor-context";

import { updateResume } from "@/utils/actions/resumes/actions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";



export function ResumeEditorActions({
  onResumeChange
}, dispatch } = useResumeContext();
  const { resume, isSaving } = state;
  const [downloadOptions, setDownloadOptions] = useState({
    resume,
    coverLetter);

  // Save Resume
  const handleSave = async () => {
    try {
      dispatch({ type: 'SET_SAVING', value);
      await updateResume(state.resume.id, state.resume);
      toast({
        title: "Changes saved",
        description: "Your resume has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "Unable to save your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      dispatch({ type: 'SET_SAVING', value);
    }
  };


  // Dynamic color classes based on resume 

  
  const buttonBaseStyle = cn(
    "transition-all duration-300",
    "relative overflow-hidden",
    "h-8 px-3 text-[11px] font-medium",
    "rounded-md border-none",
    "text-white shadow-sm",
    "hover:shadow-md hover:-translate-y-[1px]",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:translate-y-0"
  );

  const importButtonClasses = cn(
    buttonBaseStyle,
    colors.importBg,
    colors.importHover,
    colors.importShadow
  );

  const actionButtonClasses = cn(
    buttonBaseStyle,
    colors.actionBg,
    colors.actionHover,
    colors.actionShadow
  );

  return (
    
      
        {/* Text Import Button */}
        

        {/* Download Button */}
        
          
            
               {
                  try {
                    // Download Resume if selected
                    if (downloadOptions.resume) {
                      const blob = await pdf().toBlob();
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `${resume.first_name}_${resume.last_name}_Resume.pdf`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }

                    // Download Cover Letter if selected and exists
                    if (downloadOptions.coverLetter && resume.has_cover_letter) {
                      // Dynamically import html2pdf only when needed
                      const html2pdf = (await import('html2pdf.js')).default;
                      
                      const coverLetterElement = document.getElementById('cover-letter-content');
                      if (!coverLetterElement) {
                        throw new Error('Cover letter content not found');
                      }

                      const opt = {
                        margin: [0, 0, -0.5, 0],
                        filename: `${resume.first_name}_${resume.last_name}_Cover_Letter.pdf`,
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: {
                          backgroundColor: 'red',
                          useCORS,
                          letterRendering,
                          // width: 700,
                          // height: 1000,
                          // windowWidth: 700,
                          logging,
                          // windowHeight: 2000
                        },
                        jsPDF: { 
                          unit: 'in', 
                          format: 'letter', 
                          orientation: 'portrait' 
                        }
                      };

                      await html2pdf().set(opt).from(coverLetterElement).save();
                    }

                    toast({
                      title: "Download started",
                      description: "Your documents are being downloaded.",
                    });
                  } catch (error) {
                    console.error(error);
                    toast({
                      title: "Download failed",
                      description: error instanceof Error ? error.message : "Unable to download your documents. Please try again.",
                      variant: "destructive",
                    });
                  }
                }}
                className={actionButtonClasses}
              >
                
                Download
              
            
            
              
                
                   
                      setDownloadOptions(prev => ({ ...prev, resume)
                    }
                    className={cn(
                      resume.is_base_resume 
                        ? "border-indigo-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                        : "border-rose-400 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    )}
                  />
                  Resume
                
                
                   
                      setDownloadOptions(prev => ({ ...prev, coverLetter)
                    }
                    className={cn(
                      resume.is_base_resume 
                        ? "border-indigo-400 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                        : "border-rose-400 data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600"
                    )}
                  />
                  Cover Letter
                
              
            
          
        

        {/* Save Button */}
        
          {isSaving ? (
            
              
              Saving...
            
          ) ="mr-1.5 h-3.5 w-3.5" />
              Save
            
          )}
        
      
    
  );
} 