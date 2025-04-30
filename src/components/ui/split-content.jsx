import Image from "next/image";
import { cn } from "@/lib/utils";





export function SplitContent({
  imageSrc,
  heading,
  description,
  imageOnLeft = true,
  imageOverflowRight = false,
  className,
  children,
}) {
  return (
   
    
      {/* Floating gradient orbs */}
      
      
      
      
        
          {/* Content Section - Enhanced Typography and Layout */}
          {imageOverflowRight && (
            
              {/* Enhanced heading with gradient underline */}
              
                
                  
                    {heading}
                  
                
                
              
              
              {/* Enhanced description */}
              
                {description}
              

              {/* Optional children for interactive elements */}
              {children && (
                
                  {children}
                
              )}
            
          )}

          
          {/* Image Section - Enhanced for Screenshots */}
          
            {/* Enhanced decorative elements */}
            
            
            
            {/* Enhanced image container with deeper glass effect */}
            
              {/* Glass panel overlay */}
              
              
              {/* Main image */}
            
              
               
                
                
                {/* Subtle shine effect */}
                
              

            

          

          {/* Content Section - Enhanced Typography and Layout */}
          {!imageOverflowRight && (
            
              {/* Enhanced heading with gradient underline */}
              
                
                  
                    {heading}
                  
                
                
              
              
              {/* Enhanced description */}
              
                {description}
              

              {/* Optional children for interactive elements */}
              {children && (
                
                  {children}
                
              )}
            
          )}
        
      
    
 
  );
} 