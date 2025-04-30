'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Code, FileText, PlayCircle, Sparkles, Zap } from 'lucide-react';

export function HeroVideoSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    
      {/* Section Header */}
      
        
          See ResumeLM in Action
        
        
          Watch how our AI-powered platform transforms your resume in minutes
        
      

      {/* Main Video Container */}
      
        
          
            {/* Advanced Container with Layered Design */}
            
              {/* Video Thumbnail - CSS-based design instead of image */}
              
                {/* Animated code blocks */}
                
                  
                    
                    resume.json
                  
                  
                    
                    
                    
                    
                    
                    
                    
                    
                  
                

                {/* Resume preview */}
                
                  
                    
                    
                    
                      
                      
                      
                      
                      
                      
                      
                      
                      
                      
                    
                  
                

                {/* AI processing visualization */}
                
                  
                    
                  
                  
                

                {/* Enhanced Gradient Overlays */}
                
                

                {/* Improved Play Button */}
                
                  
                    
                    
                  
                
              
            

            {/* Decorative Elements */}
            
            
          
        

        {/* Enhanced Video Dialog */}
        
          Demo Video
          
            Watch how ResumeLM transforms your resume with AI
          
          
            
          
        
      

      {/* Feature Highlights */}
      
        
          
            
          
          AI-Powered
          Advanced AI models optimize your resume for ATS systems
        

        
          
            
          
          Tailored Content
          Customized for specific job descriptions to increase interview chances
        

        
          
            
          
          Professional Design
          Clean, modern templates that highlight your skills effectively
        
      
    
  );
}