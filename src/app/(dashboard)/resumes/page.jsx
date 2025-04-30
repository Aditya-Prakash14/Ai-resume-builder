import { getDashboardData } from "@/utils/actions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { MiniResumePreview } from "@/components/resume/shared/mini-resume-preview";
import { ResumeSortControls } from "@/components/resume/management/resume-sort-controls";
;

const RESUMES_PER_PAGE = 12;


  
  const { baseResumes, tailoredResumes } = await getDashboardData();
  
  // Combine and sort resumes
  const allResumes = [...baseResumes, ...tailoredResumes];
  const currentPage = Number(params.page) || 1;
  const sort = (params.sort'createdAt';
  const direction = (params.direction'desc';

  // Sort resumes
  const sortedResumes = allResumes.sort((a, b) => {
    const modifier = direction === 'asc' ? 1 : -1;
    switch (sort) {
      case 'name':
        return modifier * a.name.localeCompare(b.name);
      case 'jobTitle':
        return modifier * (a.target_role?.localeCompare(b.target_role || '') || 0);
      case 'createdAt':
      default:
        return modifier * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  });

  // Paginate resumes
  const totalPages = Math.ceil(sortedResumes.length / RESUMES_PER_PAGE);
  const paginatedResumes = sortedResumes.slice(
    (currentPage - 1) * RESUMES_PER_PAGE,
    currentPage * RESUMES_PER_PAGE
  );

  return (
    

      
      
        {/* Header with controls */}
        
          
            
              My Resumes
            
            
              Manage all your resumes in one place
            
          
          
          
            
              
            
            
              Create Resume
            
          
        

        {/* Resumes Grid */}
        
          }>
            
              {paginatedResumes.map((resume) => (
                
                  
                
              ))}
            
          
        

        {/* Pagination */}
        {totalPages > 1 && (
          
            {[...Array(totalPages)].map((_, i) => (
              
                {i + 1}
              
            ))}
          
        )}
      
    
  );
}

function ResumesLoadingSkeleton() {
  return (
    
      {[...Array(8)].map((_, i) => (
        
      ))}
    
  );
}
