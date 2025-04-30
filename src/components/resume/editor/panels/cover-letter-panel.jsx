import { Resume, Job } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Plus, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from 'react';
import { readStreamableValue } from 'ai/rsc';
;
import { AIImprovementPrompt } from "../../shared/ai-improvement-prompt";
import { generate } from "@/utils/actions/cover-letter/actions";
import { useResumeContext } from "../resume-editor-context";
import { ApiErrorDialog } from "@/components/ui/api-error-dialog";
import { CreateTailoredResumeDialog } from "@/components/resume/management/dialogs/create-tailored-resume-dialog";




export function CoverLetterPanel({
  resume,
  job,
  aiConfig,
}) {
  const { dispatch } = useResumeContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', description: '' });

  const updateField = (field, value) => {
    dispatch({ 
      type: 'UPDATE_FIELD',
      field,
      value
    });
  };

  const generateCoverLetter = async () => {
    if (!job) return;
    
    setIsGenerating(true);
    
    try {
      // Get model and API key from local storage
      const MODEL_STORAGE_KEY = 'resumelm-default-model';
      const LOCAL_STORAGE_KEY = 'resumelm-api-keys';

      const selectedModel = localStorage.getItem(MODEL_STORAGE_KEY);
      const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
      let apiKeys = [];

      try {
        apiKeys = storedKeys ? JSON.parse(storedKeys) ;
      } catch (error) {
        console.error('Error parsing API keys:', error);
      }

      // Prompt
      const prompt = `Write a professional cover letter for the following job using my resume information:
      ${JSON.stringify(job)}
      
      ${JSON.stringify(resume)}
      
      Today's date is ${new Date().toLocaleDateString()}.

      Please use my contact information in the letter:
      Full Name: ${resume.first_name} ${resume.last_name}
      Email: ${resume.email}
      ${resume.phone_number ? `Phone: ${resume.phone_number}` : ''}
      ${resume.linkedin_url ? `LinkedIn: ${resume.linkedin_url}` : ''}
      ${resume.github_url ? `GitHub: ${resume.github_url}` : ''}

      ${customPrompt ? `\nAdditional requirements: ${customPrompt}` : ''}`;
      

      // Call The Model
      const { output } = await generate(prompt, {
        ...aiConfig,
        model: selectedModel || '',
        apiKeys
      });

      // Generated Content
      let generatedContent = '';


      // Update Resume Context
      for await (const delta of readStreamableValue(output)) {
        generatedContent += delta;
        // Update resume context directly
        // console.log('Generated Content:', generatedContent);
        updateField('cover_letter', {
          content);
      }
      
      
    } catch (error) {
      console.error('Generation error:', error);
      if (error instanceof Error && (
          error.message.toLowerCase().includes('api key') || 
          error.message.toLowerCase().includes('unauthorized') ||
          error.message.toLowerCase().includes('invalid key') ||
          error.message.toLowerCase().includes('invalid x-api-key'))
      ) {
        setErrorMessage({
          title: "API Key Error",
          description: "There was an issue with your API key. Please check your settings and try again."
        });
      } else {
        setErrorMessage({
          title: "Error",
          description: "Failed to generate cover letter. Please try again."
        });
      }
      setShowErrorDialog(true);
    } finally {
      setIsGenerating(false);
    }
  };

  if (resume.is_base_resume) {
    return (
      
        
          
            
          
          Cover Letter
        
        
        
          To generate a cover letter, please first tailor this base resume to a specific job.
        
        
        
          
            
            Tailor This Resume
          
        
      
    );
  }

  return (
    
      
        
          
        
        Cover Letter
      

      {resume.has_cover_letter ? (
        
          
            
          

          
            
              {isGenerating ? (
                
                  
                  Generating...
                
              ) ="h-4 w-4 mr-2" />
                  Generate with AI
                
              )}
            

             updateField('has_cover_letter', false)}
            >
              
              Delete Cover Letter
            
          
        
      ) ="space-y-4">
          
            No cover letter has been created for this resume yet.
          
           updateField('has_cover_letter', true)}
          >
            
            Create Cover Letter
          
        
      )}

       {
          setShowErrorDialog(false);
          window.location.href = '/subscription';
        }}
        onSettings={() => {
          setShowErrorDialog(false);
          window.location.href = '/settings';
        }}
      />
    
  );
} 