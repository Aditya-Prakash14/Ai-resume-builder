"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { resetPasswordForEmail } from "@/app/auth/login/actions";
import Link from "next/link";



export function ResetPasswordForm() {
  const [formState, setFormState] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState({});
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      const result = await resetPasswordForEmail(formData);
      
      if (!result.success) {
        setFormState({ error: result.error || "Failed to send reset email" });
        return;
      }
      
      setEmail("");
      setFormState({ success);
    } catch (error) {
      console.error("Password reset error:", error);
      setFormState({ error: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    
      {formState.error && (
        
          {formState.error}
        
      )}
      
      {formState.success ? (
        
          
          
            Check your email for a password reset link.
          
        
      ) ={handleSubmit} className="space-y-4">
          
            Email
            
              
               setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="pl-10 bg-white/50 border-white/40 focus:border-violet-500/50 focus:ring-violet-500/30 transition-all duration-300"
              />
            
          

          
            {isLoading ? (
              
                
                Sending reset link...
              
            ) : (
              "Send Reset Link"
            )}
          

          
            
              Back to login
            
          
        
      )}
    
  );
} 