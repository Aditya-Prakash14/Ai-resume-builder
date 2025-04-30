import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { FileText, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    
      {/* Background Layer */}
      
        
        
        
        
      

      {/* Main Content Layer */}
      
        {/* Dashboard Header */}
        
          
            
              
                
                
              
              
                
                
              
            
          
        

        {/* Main Dashboard Content */}
        
          
            {/* Main Row - Profile and Base Resumes side by side */}
            
              {/* Profile Card */}
              
                
                  {/* Profile Header */}
                  
                    
                      
                      
                    
                    
                      
                      
                      
                    
                  

                  {/* Profile Stats */}
                  
                    
                    
                      {[...Array(4)].map((_, i) => (
                        
                          
                          
                        
                      ))}
                    
                  

                  {/* Profile Completion */}
                  
                    
                      
                      
                    
                    
                  
                
              

              {/* Base Resumes */}
              
                
                  
                    {/* Header */}
                    
                      
                        
                          
                        
                        
                          
                          
                        
                      
                      
                    

                    {/* Resume Grid */}
                    
                      {[...Array(3)].map((_, i) => (
                        
                          
                            
                            
                          
                          
                            
                              
                              
                            
                            
                              
                              
                            
                          
                          
                            
                            
                          
                        
                      ))}
                    
                  
                
              
            

            {/* Tailored Resumes */}
            
              
                {/* Header */}
                
                  
                    
                      
                    
                    
                      
                      
                    
                  
                  
                

                {/* Resume Grid */}
                
                  {[...Array(3)].map((_, i) => (
                    
                      
                        
                        
                      
                      
                        
                          
                          
                        
                        
                          
                          
                        
                      
                      
                        
                        
                      
                    
                  ))}
                
              
            
          
        
      
    
  );
} 