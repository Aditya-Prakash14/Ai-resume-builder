/**
 * Resume Preview Component
 * 
 * This component generates a PDF resume using @react-pdf/renderer and displays it using react-pdf.
 * It supports two variants, with consistent styling and layout.
 * The PDF is generated client-side and updates whenever the resume data changes.
 */

"use client";

import { Resume } from "@/lib/types";
import { Document, Page, pdfjs } from 'react-pdf';
import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { ResumePDFDocument } from './resume-pdf-document';
import { useDebouncedValue } from '@/hooks/use-debounced-value';

// Import required CSS for react-pdf
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

// Cache for storing generated PDFs
const pdfCache = new Map CACHE_EXPIRATION_TIME) {
      URL.revokeObjectURL(url);
      pdfCache.delete(hash);
    }
  }
}

// Setup cache cleanup interval
if (typeof window !== 'undefined') {
  setInterval(cleanupCache, CACHE_CLEANUP_INTERVAL);
}

// Add custom styles for PDF annotations to ensure links are clickable
const customStyles = `
  .react-pdf__Page__annotations {
    pointer-events: auto !important;
    z-index: 10 !important;
  }
  .react-pdf__Page__annotations.annotationLayer {
    position;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`;



/**
 * ResumePreview Component
 * 
 * Displays a PDF preview of the resume using react-pdf.
 * Handles PDF generation and responsive display.
 */
export const ResumePreview = memo(function ResumePreview({ resume, variant = 'base', containerWidth }, setUrl] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const debouncedWidth = useDebouncedValue(containerWidth, 100);
  

  // Convert percentage to pixels based on parent container
  const getPixelWidth = useCallback(() => {
    if (typeof window === 'undefined') return 0;
    // console.log('debouncedWidth (INSIDE)'+containerWidth);
    // console.log('debouncedWidth * 10 (INSIDE)'+debouncedWidth * 10);
    return ((debouncedWidth));
  }, [debouncedWidth]);

  // Generate resume hash for caching
  const resumeHash = useMemo(() => generateResumeHash(resume), [resume]);

  // Add styles to document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Generate or retrieve PDF from cache
  useEffect(() => {
    let currentUrl= null;

    async function generatePDF() {
      // Check cache first
      const cached = pdfCache.get(resumeHash);
      if (cached) {
        currentUrl = cached.url;
        setUrl(cached.url);
        return;
      }

      // Generate new PDF if not in cache
      const blob = await pdf().toBlob();
      const newUrl = URL.createObjectURL(blob);
      currentUrl = newUrl;
      
      // Store in cache with timestamp
      pdfCache.set(resumeHash, { url, timestamp: Date.now() });
      setUrl(newUrl);
    }

    generatePDF();

    // Cleanup function
    return () => {
      if (currentUrl && !pdfCache.has(resumeHash)) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [resumeHash, variant, resume]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Final cleanup of this component's URL if not in cache
      if (url && !pdfCache.has(resumeHash)) {
        URL.revokeObjectURL(url);
      }
    };
  }, [resumeHash, url]);

  // Add state for text layer visibility
  const [shouldRenderTextLayer, setShouldRenderTextLayer] = useState(false);

  // Modify Page component to conditionally render text layer
  function onDocumentLoadSuccess({ numPages };
    // Enable text layer after document is stable
    setTimeout(() => setShouldRenderTextLayer(true), 1000);
  }

  // Disable text layer during updates
  useEffect(() => {
    setShouldRenderTextLayer(false);
  }, [resumeHash, variant]);

  // Show loading state while PDF is being generated
  if (!url) {
    return (
      
        
          {/* Header skeleton */}
          
            
            
              
              
              
            
          

          {/* Summary skeleton */}
          
            
            
              
              
            
          

          {/* Experience skeleton */}
          
            
            
              {[...Array(3)].map((_, i) => (
                
                  
                    
                    
                  
                  
                  
                
              ))}
            
          

          {/* Education skeleton */}
          
            
            
              {[...Array(2)].map((_, i) => (
                
                  
                    
                    
                  
                  
                
              ))}
            
          
        
      
    );
  }

  // Display the generated PDF using react-pdf
  return (
    
        
              
                {/* Header skeleton */}
                
                  
                  
                    
                    
                    
                  
                

                {/* Summary skeleton */}
                
                  
                  
                    
                    
                  
                

                {/* Experience skeleton */}
                
                  
                  
                    {[...Array(3)].map((_, i) => (
                      
                        
                          
                          
                        
                        
                        
                      
                    ))}
                  
                

                {/* Education skeleton */}
                
                  
                  
                    {[...Array(2)].map((_, i) => (
                      
                        
                          
                          
                        
                        
                      
                    ))}
                  
                
              
            
          }
        >
          {Array.from(new Array(numPages), (_, index) => (
            
          ))}
        
    
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to determine if re-render is needed
  return (
    prevProps.resume === nextProps.resume &&
    prevProps.variant === nextProps.variant &&
    prevProps.containerWidth === nextProps.containerWidth
  );
}); 