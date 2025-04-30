'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Mail, User, CheckCircle2, XCircle } from "lucide-react";
import { joinWaitlist } from "@/app/auth/login/actions";
import { useState } from "react";

const gradientClasses = {
  base: "bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600",
  hover: "hover:from-violet-500 hover:via-blue-500 hover:to-violet-500",
  shadow: "shadow-lg shadow-violet-500/25",
  animation: "transition-all duration-500 animate-gradient-x",
};

export function WaitlistSection() {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const formData = new FormData(e.currentTarget);
      
      // Log form data
      const formDataObj = {
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
      };
      console.log('Submitting form with data:', formDataObj);

      const result = await joinWaitlist(formData);
      console.log('Received result from server:', result);

      if (result.success) {
        console.log('Successfully joined waitlist');
        setStatus('success');
        (e.target.reset();
      } else {
        console.error('Failed to join waitlist:', result.error);
        setStatus('error');
        setErrorMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }

  if (status === 'success') {
    return (
      
        
        
        
          
          Thank you for joining!
          We&apos;ll notify you when ResumeLM launches.
        
      
    );
  }

  return (
    
      {/* Background Effects */}
      
      
      
      {/* Content */}
      
        
          
            
            
              Early Access Waitlist
            
          
          Join the ResumeLM Waitlist
          
            Be among the first to experience our AI-powered resume builder
          
        

        
          
            
              
                
                
              
            
            
            
              
                
                
              
            
          

          
            
              
              
            
          

          {status === 'error' && (
            
              
              {errorMessage}
            
          )}

          
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            
          

          
            
              
              Benefits
              
            
            
              
                
                Priority Access
              
              
                
                Extended Trial
              
              
                
                Special Pricing
              
            
          
        
      
    
  );
} 