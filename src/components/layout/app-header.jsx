'use client';

import { LogoutButton } from "@/components/auth/logout-button";
import { SettingsButton } from "@/components/settings/settings-button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { PageTitle } from "./page-title";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";



export function AppHeader({ children }, setIsOpen] = useState(false);

  return (
    
      {/* Enhanced gradient backdrop with advanced blur */}
      

      {/* Advanced Gradient Overlays with animations */}
      
      
      

      {/* Animated particles */}
      
        
        
        
      

      {/* Border glow effect */}
      

      {/* Content Container with enhanced styling */}
      
        {/* Left Section - Logo and Title with enhanced styling */}
        
          
          
          
            
              
            
          
        

        {/* Right Section - Navigation Items */}
        
          {children ? (
            children
          ){/* Enhanced Desktop Navigation */}
              

                
                  
                    
                    
                    Profile
                  
                  
                  
                    
                    
                      
                    
                  
                  
                  
                    
                    
                      
                    
                  
                
              

              {/* Enhanced Mobile Menu */}
              
                
                  
                    
                    
                  
                
                
                  
                    Menu
                  
                  

                     setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 mx-4 rounded-lg relative overflow-hidden group",
                        "text-sm font-medium text-purple-600/80 hover:text-purple-800",
                        "hover:bg-white/50 transition-all duration-300"
                      )}
                    >
                      
                      
                      Profile
                    

                    
                      
                      
                        
                      
                    

                    
                      
                      
                        
                      
                    

                    {/* Decorative elements */}
                    
                      
                      
                        
                        
                        
                      
                    
                  
                
              
            
          )}
        
      
    
  );
}