'use client'

import React from 'react'
import { ResumeSortControls, 
    console.log('profile', profile);
    console.log('baseSort', baseSort);
    console.log('baseDirection', baseDirection);
  return (
    
    
      
        Base Resumes
      
      
        
      
    
    
    
      




        {baseResumes.map((resume) => (
          
            
              
                
                  
                
                
                  
                    
                      
                    
                  
                   {
                    // 'use server';
                    await copyResume(resume.id);
                  }}>
                    
                      
                    
                  
                
              

              
                
                  Delete Resume
                  
                    Are you sure you want to delete &quot;{resume.name}&quot;? This action cannot be undone.
                  
                
                
                  Cancel
                   {
                    // 'use server';
                    await deleteResume(resume.id);
                  }}>
                    
                      Delete
                    
                  
                
              
            
          
        ))}




        
          
            
              
            
            Create Base Resume
          
        
        {baseResumes.length === 0 && baseResumes.length + 1 
        )}
      
    
  
  )
}

export default resumeRow
