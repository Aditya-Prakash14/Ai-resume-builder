import { Skeleton } from "@/components/ui/skeleton";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function ResumeEditorLoading() {
  return (
    
      
        
          {/* Editor Panel */}
          
            
              {/* Editor Header Skeleton */}
              
                
                  
                  
                    
                    
                  
                
                
                  {[...Array(5)].map((_, i) => (
                    
                  ))}
                
              

              {/* Form Fields Skeleton */}
              
                {[...Array(4)].map((_, i) => (
                  
                    
                    
                      
                      
                    
                  
                ))}
              

              {/* Chatbot Skeleton */}
              
                
                  
                    
                    
                  
                  
                
              
            
          

          {/* Resize Handle */}
          

          {/* Preview Panel */}
          
            
              
                
                  {/* Resume Preview Skeleton */}
                  
                    {/* Header */}
                    
                      
                      
                        
                        
                      
                    

                    {/* Sections */}
                    
                      {/* Experience */}
                      
                        
                        {[...Array(3)].map((_, i) => (
                          
                            
                              
                              
                            
                            
                            
                          
                        ))}
                      

                      {/* Education */}
                      
                        
                        {[...Array(2)].map((_, i) => (
                          
                            
                              
                              
                            
                            
                          
                        ))}
                      
                    
                  
                
              
            
          
        
      
    
  );
} 