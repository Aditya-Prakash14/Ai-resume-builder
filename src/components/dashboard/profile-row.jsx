'use client';

import { Profile } from "@/lib/types";
import { User, Briefcase, GraduationCap, Code, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";



export function ProfileRow({ profile }) {
  return (
    
      {/* Animated background gradient */}
      
      
      
        
          {/* Main container - stack on mobile, row on desktop */}
          
            {/* Left section with avatar, name and stats */}
            
              {/* Avatar and Name group */}
              
                {/* Enhanced Avatar Circle */}
                
                  
                    
                  
                

                {/* Name with enhanced gradient */}
                
                  {profile.first_name} {profile.last_name}
                
              

              {/* Stats Row - hidden on mobile, visible on sm and up */}
              
                {[
                  { 
                    icon, 
                    label: "Experience", 
                    count: profile.work_experience.length,
                    colors: {
                      bg: "from-cyan-50/50 to-cyan-100/50",
                      text: "text-cyan-700",
                      iconBg: "bg-cyan-100",
                      border: "border-cyan-200"
                    }
                  },
                  { 
                    icon, 
                    label: "Education", 
                    count: profile.education.length,
                    colors: {
                      bg: "from-indigo-50/50 to-indigo-100/50",
                      text: "text-indigo-700",
                      iconBg: "bg-indigo-100",
                      border: "border-indigo-200"
                    }
                  },
                  { 
                    icon, 
                    label: "Projects", 
                    count: profile.projects.length,
                    colors: {
                      bg: "from-violet-50/50 to-violet-100/50",
                      text: "text-violet-700",
                      iconBg: "bg-violet-100",
                      border: "border-violet-200"
                    }
                  },
                ].map((stat) => (
                  
                    
                      
                    
                    
                      {stat.count}
                      {stat.label}
                    
                  
                ))}
              
            

            {/* Edit Button with enhanced styling */}
              
              
                
                Edit Profile
              
            
          
        
      
    
  );
} 