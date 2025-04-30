'use client';

import { User, Briefcase, FolderGit2, GraduationCap, Wrench, LayoutTemplate } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ResumeEditorTabs() {
  return (
    
      {/* Enhanced second row with Resume Score and Cover Letter */}
      
        
          
          {/* Resume Score */}
          
            
              
                
                
              
            
            
              Resume Score
              
            
          

          {/* Cover Letter */}
          
            
              
                
                
                
                
                
              
            
            
              Cover Letter
              
            
          
        
      

      
        {/* Basic Info Tab */}
        
          
            
          
          
            Basic Info
            
          
        

        {/* Work Tab */}
        
          
            
          
          
            Work
            
          
        

        {/* Projects Tab */}
        
          
            
          
          
            Projects
            
          
        

        {/* Education Tab */}
        
          
            
          
          
            Education
            
          
        

        {/* Skills Tab */}
        
          
            
          
          
            Skills
            
          
        

        {/* Settings Tab */}
        
          
            
          
          
            Layout
            
          
        
      

    
    
  );
} 