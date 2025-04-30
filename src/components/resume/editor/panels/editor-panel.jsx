'use client';

import { Resume, Profile, Job, DocumentSettings } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Accordion } from "@/components/ui/accordion";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Suspense, useRef } from "react";
import { cn } from "@/lib/utils";
import { ResumeEditorActions } from "../actions/resume-editor-actions";
import { TailoredJobAccordion } from "../../management/cards/tailored-job-card";
import { BasicInfoForm } from "../forms/basic-info-form";
import ChatBot from "../../assistant/chatbot";
import { CoverLetterPanel } from "./cover-letter-panel";
import {
  WorkExperienceForm,
  EducationForm,
  SkillsForm,
  ProjectsForm,
  DocumentSettingsForm
} from '../dynamic-components';
import { ResumeEditorTabs } from "../header/resume-editor-tabs";
import ResumeScorePanel from "./resume-score-panel";





export function EditorPanel({
  resume,
  profile,
  job,
  isLoadingJob,
  onResumeChange,
}) {
  const scrollAreaRef = useRef(null);

  return (
    
      
        
          
            
              
                
              
            


            {/* Tailored Job Accordion */}
            
              
            

            {/* Tabs */}  
            
              

              {/* Basic Info Form */}
              
                
              

              {/* Work Experience Form */}
              
                
                    
                    
                    
                  
                }>
                   onResumeChange('work_experience', experiences)}
                    profile={profile}
                    targetRole={resume.target_role}
                  />
                
              

              {/* Projects Form */}
              
                
                    
                    
                  
                }>
                   onResumeChange('projects', projects)}
                    profile={profile}
                  />
                
              

              {/* Education Form */}
              
                
                    
                    
                  
                }>
                   onResumeChange('education', education)}
                    profile={profile}
                  />
                
              

              {/* Skills Form */}
              
                
                    
                    
                  
                }>
                   onResumeChange('skills', skills)}
                    profile={profile}
                  />
                
              

              {/* Document Settings Form */}
              
                
                    
                    
                  
                }>
                   {
                      onResumeChange('document_settings', value);
                    }}
                  />
                
              

              {/* Cover Letter Form */}
              
                
              


              {/* Resume Score Form */}
              
                
              
            
          
        
      

      
        
      
    
  );
} 