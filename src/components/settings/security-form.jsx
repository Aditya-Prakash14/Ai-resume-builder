'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { User } from "@supabase/supabase-js"
import { useState } from "react"
import { updateEmail, updatePassword } from "@/app/(dashboard)/settings/actions"
import { toast } from "sonner"
// import { testApiKey } from "@/app/settings/page"



export function SecurityForm({ user }, setIsUpdatingEmail] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [emailCurrentPassword, setEmailCurrentPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailUpdate = async () => {
    try {
      setIsUpdatingEmail(true);
      const formData = new FormData();
      formData.append('email', newEmail);
      formData.append('currentPassword', emailCurrentPassword);
      
      const result = await updateEmail(formData);
      
      if (!result.success) {
        toast.error(result.error || "Failed to update email");
        return;
      }
      
      toast.success("Please check your new email to confirm the change");
      setNewEmail("");
      setEmailCurrentPassword("");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      setIsUpdatingPassword(true);
      const formData = new FormData();
      formData.append('currentPassword', currentPassword);
      formData.append('newPassword', newPassword);
      
      const result = await updatePassword(formData);
      
      if (!result.success) {
        toast.error(result.error || "Failed to update password");
        return;
      }
      
      toast.success("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    
    
    {/* Test API Key */}
    
      {/* Email Change Section */}
      
        
          Email Address
          Current email: {user?.email}
          
            
               setNewEmail(e.target.value)}
                className="bg-white/50 flex-1"
              />
               setEmailCurrentPassword(e.target.value)}
                className="bg-white/50 flex-1"
              />
              
                
                {isUpdatingEmail ? "Updating..." : "Change Email"}
              
            
          
        
      

      {/* Password Reset Section */}
      
        
          Password
          
             setCurrentPassword(e.target.value)}
              className="bg-white/50"
            />
             setNewPassword(e.target.value)}
              className="bg-white/50"
            />
            
              
              {isUpdatingPassword ? "Updating..." : "Change Password"}
            
          
        
      
    
  )
} 