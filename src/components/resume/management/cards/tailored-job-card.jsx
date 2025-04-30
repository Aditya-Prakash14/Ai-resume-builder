'use client';

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {  MapPin, Clock, DollarSign, Briefcase, Trash2, Loader2, Plus, Sparkles, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Job, Resume } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { updateResume } from "@/utils/actions/resumes/actions";
import { createJob, deleteJob } from "@/utils/actions/jobs/actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { useResumeContext } from "../../editor/resume-editor-context";
import { AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { BriefcaseIcon } from "lucide-react";
import { formatJobListing } from "@/utils/actions/jobs/ai";



export function TailoredJobCard({ 
  jobId, 
  job,
  isLoading= useRouter();
  const { state, dispatch } = useResumeContext();

  // Only use internal state if external job is not provided
  const [internalJob, setInternalJob] = useState(null);
  const [internalIsLoading, setInternalIsLoading] = useState(true);
  
  const effectiveJob = externalJob ?? internalJob;
  const effectiveIsLoading = externalIsLoading ?? internalIsLoading;

  // Only fetch if external job is not provided
  useEffect(() => {
    if (externalJob !== undefined) return;

    async function fetchJob() {
      if (!jobId) {
        setInternalJob(null);
        setInternalIsLoading(false);
        return;
      }

      try {
        setInternalIsLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') {
            throw error;
          }
          setInternalJob(null);
          return;
        }
        
        setInternalJob(jobData);
      } catch (error) {
        console.error('Error fetching job:', error);
        if (error instanceof Error && error.message !== 'No rows returned') {
          setInternalJob(null);
        }
      } finally {
        setInternalIsLoading(false);
      }
    }

    fetchJob();
  }, [jobId, externalJob]);

  const [isCreating, setIsCreating] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [isFormatting, setIsFormatting] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const formatWorkLocation = (workLocation: Job['work_location']) => {
    if (!workLocation) return 'Not specified';
    return workLocation.replace('_', ' ');
  };

  const validateJobDescription = (value) => {
    const errors: { jobDescription?= {};
    if (!value.trim()) {
      errors.jobDescription = "Job description is required";
    } else if (value.trim().length ) => {
    const value = e.target.value;
    setJobDescription(value);
    setValidationErrors(validateJobDescription(value));
  };

  const handleCreateJobWithAI = async () => {
    const errors = validateJobDescription(jobDescription);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      toast({
        title: "Validation Error",
        description: errors.jobDescription,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsFormatting(true);

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

      // Format job listing using AI
      const formattedJob = await formatJobListing(jobDescription, {
        model: selectedModel || '',
        apiKeys
      });

      setIsFormatting(false);
      setIsCreating(true);

      // Create job in database
      const newJob = await createJob(formattedJob);
      
      // Update resume with new job ID using context
      dispatch({ type: 'UPDATE_FIELD', field: 'job_id', value: newJob.id });
      
      // Save the changes to the database
      await updateResume(state.resume.id, {
        ...state.resume,
        job_id: newJob.id
      });
      
      // Close dialog and refresh
      setCreateDialogOpen(false);
      router.refresh();

    } catch (error) {
      console.error('Error creating job:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create job",
        variant: "destructive",
      });
    } finally {
      setIsFormatting(false);
      setIsCreating(false);
      setJobDescription('');
    }
  };

  // Enhanced loading skeleton with proper ARIA and animations
  const LoadingSkeleton = () => (
    
      
        
          
          
        
        
      
      
        {[1, 2, 3, 4].map((i) => (
          
            
            
          
        ))}
      
      
        {[1, 2, 3].map((i) => (
          
        ))}
      
    
  );

  // Enhanced error state with proper ARIA and animations
  const ErrorState = () => (
    
      
        
      
      
        Unable to Load Job
        
          This job listing is no longer available or there was an error loading it.
        
         router.refresh()}
          className="mt-4 bg-white/80 border-red-200 hover:bg-red-50/80 hover:border-red-300 text-red-700"
        >
          
            Try Again
          
        
      
    
  );

  if (!jobId) {
    return (
      
        
          
            
          
          
          
            
              No Job Currently Linked
            
            
              Create a new job listing to track the position you&apos;re applying for and tailor your resume accordingly.
            
          

          
            
              
                
                Create Job Listing
              
            

            
              
                Create New Job Listing
              
              
                Paste the job description below and let our AI format it automatically.
              

              
                
                  
                  {validationErrors.jobDescription && (
                    
                      
                      
                        {validationErrors.jobDescription}
                      
                    
                  )}
                

                
                   setCreateDialogOpen(false)}
                    className={cn(
                      "border-gray-200",
                      "hover:bg-gray-50",
                      "transition-colors duration-300"
                    )}
                  >
                    Cancel
                  
                  
                    {isFormatting ? (
                      
                        
                        Formatting...
                      
                    ) : isCreating ? (
                      
                        
                        Creating...
                      
                    ) ="w-4 h-4 mr-2" />
                        Create with AI
                      
                    )}
                  
                
              
            
          
        
      
    );
  }

  return (
    

      
        
          {effectiveIsLoading ? (
            
          ) : effectiveJob ? (
            
              {/* Job Details Grid */}
              
                {[
                  { icon, text: effectiveJob.location || 'Location not specified', color: 'pink' },
                  { icon, text: formatWorkLocation(effectiveJob.work_location), color: 'rose' },
                  { icon, text: effectiveJob.salary_range || 'Salary not specified', color: 'pink' },
                  { icon, text: effectiveJob.employment_type?.replace('_', ' ') || 'Employment 
}



export function TailoredJobAccordion({
  resume,
  job,
  isLoading
}, setIsDeleting] = useState(false);
  const router = useRouter();

  if (resume.is_base_resume) return null;

  const title = job?.position_title || "Target Job";
  const company = job?.company_name;

  const handleDelete = async () => {
    if (!resume.job_id) return;
    
    try {
      setIsDeleting(true);
      await deleteJob(resume.job_id);
      router.refresh();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    
      
        
          
            
              
            
            
              {title}
              {company && (
                {company}
              )}
            
          
        
      
      
        
          
          {job && (
            
              
                {isDeleting ? (
                  
                ) : (
                  
                )}
                Delete Job
              
            
          )}
        
      
    
  );
} 