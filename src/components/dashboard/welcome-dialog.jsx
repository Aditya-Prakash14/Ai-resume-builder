'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState, useEffect } from "react";



export function WelcomeDialog({ isOpen= useState(false);

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  return (
    
      
        
          
            Welcome to ResumeLM! 🎉
          
        
        
        
          Here&apos;s how to get started:
          
            
              
                1
              
              
                Fill out your profile with your work experience, education, and skills
              
            
            
              
                2
              
              
                Create base resumes for different types of roles you&apos;re interested in
              
            
            
              
                3
              
              
                Use your base resumes to create tailored versions for specific job applications
              
            
          
          
            
              
                Start by Filling Your Profile
              
            
             setIsOpen(false)}
            >
              I&apos;ll do this later
            
          
        
      
    
  );
} 