'use client';

import { Profile, WorkExperience, Education, Project } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { User, Linkedin, Briefcase, GraduationCap, Wrench, FolderGit2, Upload, Save, Trash2} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { ProfileBasicInfoForm } from "@/components/profile/profile-basic-info-form";
import { ProfileWorkExperienceForm } from "@/components/profile/profile-work-experience-form";
import { ProfileProjectsForm } from "@/components/profile/profile-projects-form";
import { ProfileEducationForm } from "@/components/profile/profile-education-form";
import { ProfileSkillsForm } from "@/components/profile/profile-skills-form";
// import { ProfileEditorHeader } from "./profile-editor-header";
import { formatProfileWithAI } from "../../utils/actions/profiles/ai";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";


import { AlertTriangle } from "lucide-react";
import { importResume, updateProfile } from "@/utils/actions/profiles/actions";



export function ProfileEditForm({ profile= useState(initialProfile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isResumeDialogOpen, setIsResumeDialogOpen] = useState(false);
  const [isTextImportDialogOpen, setIsTextImportDialogOpen] = useState(false);
  const [resumeContent, setResumeContent] = useState("");
  const [textImportContent, setTextImportContent] = useState("");
  const [isProcessingResume, setIsProcessingResume] = useState(false);
  const [apiKeyError, setApiKeyError] = useState("");
  const router = useRouter();

  // Sync with server state when initialProfile changes
  useEffect(() => {
    setProfile(initialProfile);
  }, [initialProfile]);

  // Add useEffect to clear error when dialogs close
  useEffect(() => {
    if (!isResumeDialogOpen && !isTextImportDialogOpen) {
      setApiKeyError("");
    }
  }, [isResumeDialogOpen, isTextImportDialogOpen]);

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await updateProfile(profile);
      toast.success("Changes saved successfully", {
        position: "bottom-right",
        className: "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none",
      });
      // Force a server revalidation
      router.refresh();
    } catch (error) {
      void error;
      toast.error("Unable to save your changes. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async () => {
    try {
      setIsResetting(true);
      // Reset to empty profile locally
      const resetProfile = {
        id: profile.id,
        user_id: profile.user_id,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        location: '',
        website: '',
        linkedin_url: '',
        github_url: '',
        work_experience,
        education,
        skills,
        projects,
        created_at: profile.created_at,
        updated_at: profile.updated_at
      };

      // Update local state
      setProfile(resetProfile);

      // Save to database
      await updateProfile(resetProfile);

      toast.success("Profile reset successfully", {
        position: "bottom-right",
        className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none",
      });

      // Force a server revalidation
      router.refresh();
    } catch (error) {
      toast.error("Failed to reset profile. Please try again.", {
        position: "bottom-right",
      });
      console.error(error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleLinkedInImport = () => {
    toast.info("LinkedIn import feature coming soon!", {
      position: "bottom-right",
      className: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-none",
    });
  };

  const handleResumeUpload = async (content) => {
    try {
      setIsProcessingResume(true);

      // Get model and API key from local storage
      const MODEL_STORAGE_KEY = 'resumelm-default-model';
      const LOCAL_STORAGE_KEY = 'resumelm-api-keys';

      const selectedModel = localStorage.getItem(MODEL_STORAGE_KEY) || 'claude-3-sonnet-20240229';
      const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
      let apiKeys = [];

      try {
        apiKeys = storedKeys ? JSON.parse(storedKeys) ;
      } catch (error) {
        console.error('Error parsing API keys:', error);
      }

      const result = await formatProfileWithAI(content, {
        model);

      if (result) {
        // Clean and transform the data to match our database schema
        const cleanedProfile= {
          first_name: result.first_name || null,
          last_name: result.last_name || null,
          email: result.email || null,
          phone_number: result.phone_number || null,
          location: result.location || null,
          website: result.website || null,
          linkedin_url: result.linkedin_url || null,
          github_url: result.github_url || null,
          work_experience: Array.isArray(result.work_experience)
            ? result.work_experience.map((exp) => ({
                company: exp.company || '',
                position: exp.position || '',
                location: exp.location || '',
                date: exp.date || '',
                description: Array.isArray(exp.description)
                  ? exp.description
                  : [exp.description || ''],
                technologies: Array.isArray(exp.technologies)
                  ? exp.technologies
                  )
            ,
          education: Array.isArray(result.education)
            ? result.education.map((edu) => ({
                school: edu.school || '',
                degree: edu.degree || '',
                field: edu.field || '',
                location: edu.location || '',
                date: edu.date || '',
                gpa: edu.gpa ? parseFloat(edu.gpa.toString()) ,
                achievements: Array.isArray(edu.achievements)
                  ? edu.achievements
                  )
            ,
          skills: Array.isArray(result.skills)
            ? result.skills.map((skill: { category; skills?; items?) => ({
                category: skill.category || '',
                items: Array.isArray(skill.skills)
                  ? skill.skills
                  : Array.isArray(skill.items)
                    ? skill.items
                    )
            ,
          projects: Array.isArray(result.projects)
            ? result.projects.map((proj) => ({
                name: proj.name || '',
                description: Array.isArray(proj.description)
                  ? proj.description
                  : [proj.description || ''],
                technologies: Array.isArray(proj.technologies)
                  ? proj.technologies
                  ,
                url: proj.url || undefined,
                github_url: proj.github_url || undefined,
                date: proj.date || ''
              }))
            ;

        await importResume(cleanedProfile);

        setProfile(prev => ({
          ...prev,
          ...cleanedProfile
        }));
        toast.success("Content imported successfully - Don't forget to save your changes", {
          position: "bottom-right",
          className: "bg-gradient-to-r from-emerald-500 to-green-500 text-white border-none",
        });
        setIsResumeDialogOpen(false);
        setIsTextImportDialogOpen(false);
        setResumeContent("");
        setTextImportContent("");
      }
    } catch (error) {
        console.error('Resume upload error:', error);
        if (error.message.toLowerCase().includes('api key')) {
          setApiKeyError(
            'API key required. Please add your OpenAI API key in settings or upgrade to our Pro Plan.'
          );
        } else {
          toast.error("Failed to process content: " + error.message, {
            position: "bottom-right",
          });
        }
      }
    } finally {
      setIsProcessingResume(false);
    }
  };

  return (
    


      {/* Action Bar */}
      
        
          
            
              
                
                Profile Editor
              

              
                {/* Reset Profile Button */}
                
                  
                    
                      
                      {isResetting ? (
                        
                          
                          Resetting...
                        
                      ) : (
                        
                          
                          Reset
                        
                      )}
                    
                  
                  
                    
                      Reset Profile
                      
                        Are you sure you want to reset your profile? This action cannot be undone.
                      
                    
                    
                      Cancel
                      
                        {isResetting ? "Resetting..." : "Reset Profile"}
                      
                    
                  
                

                {/* Save Button */}
                
                  
                  {isSubmitting ? (
                    
                      
                      Saving...
                    
                  ) ="mr-2 h-4 w-4" />
                      Save Changes
                    
                  )}
                
              
            
          
        
      

      {/* Main content container with consistent styling */}
      
        {/* Import Actions Row */}
        
          
            

              {/* Import Options Text */}
              
                
                  
                  Import Options
                
              


              
                {/* LinkedIn Import Button */}
                
                  
                  
                    
                      
                    
                    
                      LinkedIn Import
                      Sync with your LinkedIn profile
                    
                  
                

                {/* Resume Upload Button */}
                
                  
                    
                      
                      
                        
                          
                        
                        
                          Resume Upload
                          Import from existing resume
                        
                      
                    
                  
                  
                    
                      
                        Upload Resume Content
                      
                      
                        
                          Let our AI analyze your resume and enhance your profile by adding new information.
                          Your existing profile information will be preserved. New entries will be added alongside your current data. Want to start fresh instead? Use the &quot;Reset Profile&quot; option before uploading.
                        
                      
                    
                    
                       setResumeContent(e.target.value)}
                        placeholder="Paste your resume content here..."
                        className="min-h-[100px] bg-white/50 border-white/40 focus:border-violet-500/40 focus:ring-violet-500/20 transition-all duration-300"
                      />
                    
                    {apiKeyError && (
                      
                        
                          
                        
                        
                          API Key Required
                          {apiKeyError}
                          
                             window.location.href = '/settings'}
                            >
                              Set API Keys in Settings
                            
                          
                        
                      
                    )}
                    
                       setIsResumeDialogOpen(false)}
                        className="bg-white/50 hover:bg-white/60 transition-all duration-300"
                      >
                        Cancel
                      
                       handleResumeUpload(resumeContent)}
                        disabled={isProcessingResume || !resumeContent.trim()}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-500 hover:scale-[1.02] disabled:hover:scale-100"
                      >
                        {isProcessingResume ? (
                          
                            
                            Processing...
                          
                        ) ="flex items-center gap-2">
                            
                            Process with AI
                          
                        )}
                      
                    
                  
                

                {/* Import From Text Button */}
                
                  
                    
                      
                      
                        
                          
                        
                        
                          Import From Text
                          Import from any text content
                        
                      
                    
                  
                  
                    
                      
                        Import From Text
                      
                      
                        
                          Paste any text content below (resume, job description, achievements, etc.). Our AI will analyze it and enhance your profile by adding relevant information.
                          Your existing profile information will be preserved. New entries will be added alongside your current data.
                        
                      
                    
                    
                       setTextImportContent(e.target.value)}
                        placeholder="Paste your text content here..."
                        className="min-h-[100px] bg-white/50 border-white/40 focus:border-violet-500/40 focus:ring-violet-500/20 transition-all duration-300"
                      />
                    
                    {apiKeyError && (
                      
                        
                          
                        
                        
                          API Key Required
                          {apiKeyError}
                          
                             window.location.href = '/settings'}
                            >
                              Set API Keys in Settings
                            
                          
                        
                      
                    )}
                    
                       setIsTextImportDialogOpen(false)}
                        className="bg-white/50 hover:bg-white/60 transition-all duration-300"
                      >
                        Cancel
                      
                       handleResumeUpload(textImportContent)}
                        disabled={isProcessingResume || !textImportContent.trim()}
                        className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all duration-500 hover:scale-[1.02] disabled:hover:scale-100"
                      >
                        {isProcessingResume ? (
                          
                            
                            Processing...
                          
                        ) ="flex items-center gap-2">
                            
                            Process with AI
                          
                        )}
                      
                    
                  
                
              
            
          
        

        {/* Enhanced Tabs with smooth transitions and connected design */}
        
          {/*  */}
          
            
              
                
                  
                    
                  
                  
                    Basic Info
                    
                  
                
                
                  
                    
                  
                  
                    Work Experience
                    
                  
                
                
                  
                    
                  
                  
                    Projects
                    
                  
                
                
                  
                    
                  
                  
                    Education
                    
                  
                
                
                  
                    
                  
                  
                    Skills
                    
                  
                

              
              
                {/* Content gradient overlay */}
                

                {/* Tab content with consistent card styling */}
                
                  
                    
                      
                      
                         {
                            if (field in profile) {
                              updateField(field;
                            }
                          }}
                        />
                      
                    
                  

                  
                    
                      
                      
                         updateField('work_experience', experiences)}
                        />
                      
                    
                  

                  
                    
                      
                      
                         updateField('projects', projects)}
                        />
                      
                    
                  

                  
                    
                      
                      
                         updateField('education', education)}
                        />
                      
                    
                  

                  
                    
                      
                      
                         updateField('skills', skills)}
                        />
                      
                    
                  


                
              
            
          
          
        
      
    
  );
}