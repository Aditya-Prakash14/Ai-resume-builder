'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { LogoutButton } from "@/components/auth/logout-button";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    
      
        
          {/* Logo/Brand */}
          
            Resume.AI
          

          {/* Navigation Links */}
          
            
              Dashboard
            
            
              Jobs
            
          
        

        {/* Right Side Actions */}
        
          
        
      
    
  );
} 