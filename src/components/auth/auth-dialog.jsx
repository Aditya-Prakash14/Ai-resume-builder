'use client';

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Sparkles, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { AuthProvider } from "./auth-context";
import { signInWithGithub } from "@/app/auth/login/actions";
import { Separator } from "@/components/ui/separator";

const gradientClasses = {
  base: "bg-gradient-to-r from-violet-600 via-blue-600 to-violet-600",
  hover: "hover:from-violet-500 hover:via-blue-500 hover:to-violet-500",
  shadow: "shadow-lg shadow-violet-500/25",
  animation: "transition-all duration-500 animate-gradient-x",
};





function TabButton({ value, children }) {
  const colors = value === "login" 
    ? { active: "violet", hover: "violet" }
    : { active: "blue", hover: "blue" };

  return (
    
      
      
        
        {children}
      
    
  );
}

function SocialAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGithubSignIn = async () => {
    console.log('🚀 Starting GitHub sign-in process...');
    try {
      setIsLoading(true);
      console.log('📡 Calling signInWithGithub server action...');
      const result = await signInWithGithub();
      
      console.log('📥 Received result from server action:', result);
      if (!result.success) {
        console.error('❌ GitHub sign in error:', result.error);
      } else if (result.url) {
        console.log('✅ Received OAuth URL:', result.url);
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('💥 Failed to sign in with GitHub:', error);
    } finally {
      setIsLoading(false);
      console.log('🔄 Sign-in process completed');
    }
  };

  return (
    
      
        
          
        
        
          
            Or continue with
          
        
      
      
        {isLoading ? (
          
            
            Connecting...
          
        ) ="mr-2 h-4 w-4" />
            GitHub
          
        )}
      
    
  );
}

export function AuthDialog({ children }, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  return (
    

      {/* AUTH DIALOG TRIGGER BUTTON */}
      
        {children || (
          
            
            
              Start Now
              
            
          
        )}
      

      
        
          
            
              
              
                AI-Powered Resume Builder
              
            
            
          
          
            Please Sign In or Sign Up to start your journey towards landing your dream job. 
          

           setActiveTab(value"login" | "signup")} 
            className="w-full relative mt-6"
          >
            
              Sign In
              Sign Up
            

            
              
              
              
              
                
                
              
              
                
                
              
            
          
        
      
    
  );
} 