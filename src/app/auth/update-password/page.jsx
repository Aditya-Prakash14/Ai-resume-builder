"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is in password reset flow
    const checkSession = async () => {
      const { data= await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      }
    };

    checkSession();
  }, [router, supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);
    setIsLoading(true);

    if (password.length  {
        router.push("/auth/login");
      }, 2000);
    } catch (error) {
      setError("An unexpected error occurred");
      console.error("Password update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
      
        
          
            
              Update your password
            
            
              Enter your new password below.
            
          

          
            {error && (
              
                {error}
              
            )}
            
            {success ? (
              
                
                
                  Password updated successfully! Redirecting to login...
                
              
            ) ={handleSubmit} className="space-y-4">
                
                  New Password
                  
                    
                     setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="pl-10 bg-white/50 border-white/40 focus:border-violet-500/50 focus:ring-violet-500/30 transition-all duration-300"
                    />
                  
                

                
                  Confirm New Password
                  
                    
                     setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      minLength={6}
                      className="pl-10 bg-white/50 border-white/40 focus:border-violet-500/50 focus:ring-violet-500/30 transition-all duration-300"
                    />
                  
                

                
                  {isLoading ? (
                    
                      
                      Updating password...
                    
                  ) : (
                    "Update Password"
                  )}
                
              
            )}
          
        
      
    
  );
} 