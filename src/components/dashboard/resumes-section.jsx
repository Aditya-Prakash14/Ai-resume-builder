'use client';

import { Trash2, Copy, FileText, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { MiniResumePreview } from '@/components/resume/shared/mini-resume-preview';
import { CreateResumeDialog } from '@/components/resume/management/dialogs/create-resume-dialog';
import { ResumeSortControls, 

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 7
  });

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedResumes = resumes.slice(startIndex, endIndex);

  function handlePageChange(page) {
    setPagination(prev => ({
      ...prev,
      currentPage);
  }

  // Create Resume Card Component
  const CreateResumeCard = () => (
     (
    
      
        
          
            
          
          
            {

  return (
    
      
        
          
            {
                  const totalPages = Math.ceil(resumes.length / pagination.itemsPerPage);
                  
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= pagination.currentPage - 1 && pageNumber 
                         handlePageChange(pageNumber)}
                          className={cn(
                            "h-8 w-8 p-0",
                            "text-muted-foreground hover:text-foreground",
                            pagination.currentPage === pageNumber && "font-medium text-foreground"
                          )}
                        >
                          {pageNumber}
                        
                      
                    );
                  }

                  if (
                    pageNumber === 2 && pagination.currentPage > 3 ||
                    pageNumber === totalPages - 1 && pagination.currentPage 
                        ...
                      
                    );
                  }

                  return null;
                })}

                
                   handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === Math.ceil(resumes.length / pagination.itemsPerPage)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  >
                    
                  
                
              
            
          
        )}
      

      
        {/* Mobile View */}
        
          {/* Mobile Create Resume Button Row */}
          {canCreateMore ? (
            
              
            
          ) ="px-4 w-full">
              
            
          )}

          {/* Mobile Resumes Carousel */}
          {paginatedResumes.length > 0 && (
            
              
                
                  {paginatedResumes.map((resume) => (
                    
                      
                        
                          
                            
                              
                            
                            
                              
                                
                                  
                                
                              
                               {
                                await copyResume(resume.id);
                              }}>
                                
                                  
                                
                              
                            
                          
                          
                            
                              Delete Resume
                              
                                Are you sure you want to delete &quot;{resume.name}&quot;? This action cannot be undone.
                              
                            
                            
                              Cancel
                               {
                                await deleteResume(resume.id);
                              }}>
                                
                                  Delete
                                
                              
                            
                          
                        
                      
                    
                  ))}
                
                
                  
                  
                
              
            
          )}
        

        {/* Desktop Grid View */}
        
          {canCreateMore ? (
            
          ) : (
            
          )}

          {paginatedResumes.map((resume) => (
            
              
                
                  
                    
                  
                  
                    
                      
                        
                      
                    
                     {
                      await copyResume(resume.id);
                    }}>
                      
                        
                      
                    
                  
                
                
                  
                    Delete Resume
                    
                      Are you sure you want to delete &quot;{resume.name}&quot;? This action cannot be undone.
                    
                  
                  
                    Cancel
                     {
                      await deleteResume(resume.id);
                    }}>
                      
                        Delete
                      
                    
                  
                
              
            
          ))}
          {resumes.length === 0 && resumes.length + 1 
          )}
        
      
    
  );
} 