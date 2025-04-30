'use client';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, Mail, User } from "lucide-react";
import { Logo } from "@/components/ui/logo";

const gradientClasses = {
  base: "bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600",
  hover: "hover:from-violet-500 hover:via-blue-500 hover:to-violet-500",
  shadow: "shadow-lg shadow-violet-500/25",
  animation: "transition-all duration-500 animate-gradient-x",
};

export function WaitlistDialog() {
  return (
    
      
        
          Join the Waitlist
          
        
      

      
        
          
          
            
              
              
                Early Access Waitlist
              
            
            
              
            
            
              Join our waitlist to be among the first to experience our AI-powered resume builder 
              and receive exclusive early access benefits.
            
          
        

        
          {/* Decorative background elements */}
          
          
          {/* Form */}
          
            
              
                
                  First Name
                
                
                  
                  
                
              
              
              
                
                  Last Name
                
                
                  
                  
                
              
            

            
              
                Email Address
              
              
                
                
              
            

            
              Join Waitlist
              
            

            
              
                We&apos;ll notify you when we launch. No spam, just updates!
              
              
                
                Early Access Benefits
                
              
              
                
                  
                  Priority Access
                
                
                  
                  Extended Trial
                
                
                  
                  Special Pricing
                
              
            
          
        
      
    
  );
} 