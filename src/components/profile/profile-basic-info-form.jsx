'use client';

import { Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User } from "lucide-react";



export function ProfileBasicInfoForm({ profile, onChange }) {
  return (
    
      {/* Personal Details */}
      
        
          
            {/* Name Row */}
            
              
                
                  
                    
                  
                
                 onChange('first_name', e.target.value)}
                  className="pr-12 text-lg font-semibold bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="First Name"
                />
                
                  FIRST NAME
                
              
              
                
                  
                    
                  
                
                 onChange('last_name', e.target.value)}
                  className="pr-12 text-lg font-semibold bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="Last Name"
                />
                
                  LAST NAME
                
              
            

            {/* Contact Info */}
            
              
                
                  
                    
                  
                
                 onChange('email', e.target.value)}
                  className="pr-12 bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="email@example.com"
                />
                
                  EMAIL
                
              
              
                
                  
                    
                  
                
                 onChange('phone_number', e.target.value)}
                  className="pr-12 bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="+1 (555) 000-0000"
                />
                
                  PHONE
                
              
            

            {/* Location */}
            
              
                
                  
                
              
               onChange('location', e.target.value)}
                className="pr-12 bg-white/50 border-gray-200 rounded-lg
                  focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                  hover:border-teal-500/30 hover:bg-white/60 transition-colors
                  placeholder:text-gray-400"
                placeholder="City, State, Country"
              />
              
                LOCATION
              
            
          
        
      

      {/* Online Presence */}
      
        
          
            {/* Website and LinkedIn */}
            
              
                
                  
                    
                  
                
                 onChange('website', e.target.value)}
                  className="pr-12 bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="https://your-website.com"
                />
                
                  WEBSITE
                
              
              
                
                  
                    
                  
                
                 onChange('linkedin_url', e.target.value)}
                  className="pr-12 bg-white/50 border-gray-200 rounded-lg
                    focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                    hover:border-teal-500/30 hover:bg-white/60 transition-colors
                    placeholder:text-gray-400"
                  placeholder="https://linkedin.com/in/username"
                />
                
                  LINKEDIN
                
              
            

            {/* GitHub */}
            
              
                
                  
                
              
               onChange('github_url', e.target.value)}
                className="pr-12 bg-white/50 border-gray-200 rounded-lg
                  focus:border-teal-500/40 focus:ring-2 focus:ring-teal-500/20
                  hover:border-teal-500/30 hover:bg-white/60 transition-colors
                  placeholder:text-gray-400"
                placeholder="https://github.com/username"
              />
              
                GITHUB
              
            
          
        
      
    
  );
} 