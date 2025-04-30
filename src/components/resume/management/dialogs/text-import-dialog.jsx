'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, AlertTriangle } from "lucide-react";
import { Resume } from "@/lib/types";

import { toast } from "@/hooks/use-toast";
import { addTextToResume } from "@/utils/actions/resumes/ai";
// import pdfToText from "react-pdftotext";
import { cn } from "@/lib/utils";




export function TextImportDialog({
  resume,
  onResumeChange,
  trigger
}, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [apiKeyError, setApiKeyError] = useState("");

  useEffect(() => {
    if (!open) {
      setApiKeyError("");
    }
  }, [open]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.
    } else if (e.
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.

    if (pdfFile) {
      try {
        // PDF extraction disabled
        toast({
          title: "PDF Processing Disabled",
          description: "PDF extraction is currently disabled.",
          variant: "destructive",
        });
      } catch (err) {
        console.error('PDF processing error:', err);
        toast({
          title: "PDF Processing Error",
          description: "Failed to extract text from the PDF. Please try again or paste the content manually.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid File",
        description: "Please drop a PDF file.",
        variant: "destructive",
      });
    }
  };

  const handleFileInput = async (e: React.ChangeEvent) => {
    const file = e.target.files?.[0];
    if (file && file.
      } catch (err) {
        console.error('PDF processing error:', err);
        toast({
          title: "PDF Processing Error",
          description: "Failed to extract text from the PDF. Please try again or paste the content manually.",
          variant: "destructive",
        });
      }
    }
  };

  const handleImport = async () => {
    setApiKeyError("");
    if (!content.trim()) {
      toast({
        title: "No content",
        description: "Please enter some text to import.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const updatedResume = await addTextToResume(content, resume);

      // Update each field of the resume
      (Object.keys(updatedResume).forEach((key) => {
        onResumeChange(key, updatedResume[key];
      });

      toast({
        title: "Import successful",
        description: "Your resume has been updated with the imported content.",
      });
      setOpen(false);
      setContent("");
    } catch (error) {
      console.error('Import error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      if (errorMessage.includes('API key')) {
        setApiKeyError(
          'API key required. Please add your OpenAI API key in settings or upgrade to our Pro Plan.'
        );
      } else {
        toast({
          title: "Import failed",
          description: "Failed to process the text. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    
      
        {trigger}
      
      
        
          
            Import Resume Content
          
          
            
              Choose one of these options:
              
                Upload your PDF resume by dropping it below or clicking to browse
                Paste your resume text directly into the text area
              
            
          
        
        
          
            
            
            
              
                Drop your PDF resume here
              
              
                or click to browse files
              
            
          
          
            
              Or paste your resume text here
            
             setContent(e.target.value)}
              placeholder="Start pasting your resume content here..."
              className="min-h-[100px] bg-white/50 border-black/40 focus:border-violet-500/40 focus:ring-violet-500/20 transition-all duration-300 pt-4"
            />
          
        
        {apiKeyError && (
          
            
              
            
            
              API Key Required
              {apiKeyError}
              
                 window.location.href = '/settings'}
                >
                  Set API Keys in Settings
                
              
            
          
        )}
        
           setOpen(false)}
            className="border-gray-200"
          >
            Cancel
          
          
            {isProcessing ? (
              
                
                Processing...
              
            ) : (
              'Import'
            )}
          
        
      
    
  );
}