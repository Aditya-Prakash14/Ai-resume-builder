'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";



export function ErrorDialog({ isOpen= useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsOpen(initialIsOpen);
  }, [initialIsOpen]);

  const errorMessage = isOpen ? (
    searchParams.get('error') === 'auth_code_missing' 
      ? 'We couldn\'t complete your sign-in. Please try again.' 
      : 'There was an issue with your email confirmation. Please check your inbox and try again.'
  ) ;

  return (
    
      
        
          
            
          
          
            Authentication Error
          
          {errorMessage}
        
        
        
          
            There was an error confirming your email address. This could be because:
          
          
            The confirmation link has expired
            The link was already used
            The link is invalid
          
          
            
              
                Try Logging In Again
              
            
            
              
                Contact Support
              
            
          
        
      
    
  );
} 