'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Profile, WorkExperience, Education, Skill, Project, Resume } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { Loader2, FileText, Copy, Wand2, Plus, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { createBaseResume } from "@/utils/actions/resumes/actions";
// import pdfToText from "react-pdftotext";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { convertTextToResume } from "@/utils/actions/resumes/ai";
import { ApiErrorDialog } from "@/components/ui/api-error-dialog";



export function CreateBaseResumeDialog({ children, profile }, setOpen] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [importOption, setImportOption] = useState('import-profile');
  const [isTargetRoleInvalid, setIsTargetRoleInvalid] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    work_experience,
    education,
    skills,
    projects);
  const [resumeText, setResumeText] = useState('');
  const router = useRouter();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    title: "",
    description: ""
  });
  const [isDragging, setIsDragging] = useState(false);

  const getItemId = (type, item)=> {
    switch (type) {
      case 'work_experience':
        return `${(item.company}-${(item.position}-${(item.date}`;
      case 'projects').name;
      case 'education':
        return `${(item.school}-${(item.degree}-${(item.field}`;
      case 'skills').category;
      default:
        return '';
    }
  };

  const handleItemSelection = (section, id) => {
    setSelectedItems(prev => ({
      ...prev,
      [section]: prev[section].includes(id)
        ? prev[section].filter(x => x !== id)
        : [...prev[section], id]
    }));
  };

  const handleSectionSelection = (section, checked) => {
    setSelectedItems(prev => ({
      ...prev,
      [section]: checked
        ? profile[section].map(item => getItemId(section, item))
        );
  };

  const isSectionSelected = (section)=> {
    const sectionItems = profile[section].map(item => getItemId(section, item));
    return sectionItems.length > 0 && sectionItems.every(id => selectedItems[section].includes(id));
  };

  const isSectionPartiallySelected = (section)=> {
    const sectionItems = profile[section].map(item => getItemId(section, item));
    const selectedCount = sectionItems.filter(id => selectedItems[section].includes(id)).length;
    return selectedCount > 0 && selectedCount  {
    if (!targetRole.trim()) {
      setIsTargetRoleInvalid(true);
      setTimeout(() => setIsTargetRoleInvalid(false), 820);
      toast({
        title: "Required Field Missing",
        description: "Target role is a required field. Please enter your target role.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      if (importOption === 'import-resume') {
        if (!resumeText.trim()) {
          return;
        }

        // Create an empty resume to pass to convertTextToResume
        const emptyResume= {
          id: '',
          user_id: '',
          name,
          target_role,
          is_base_resume,
          first_name: '',
          last_name: '',
          email: '',
          work_experience,
          education,
          skills,
          projects,
          created_at).toISOString(),
          updated_at).toISOString(),
          has_cover_letter,
        };

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


        try {
          const convertedResume = await convertTextToResume(resumeText, emptyResume, targetRole, {
            model: selectedModel || '',
            apiKeys
          });

          // Extract content sections and basic info for createBaseResume
          const selectedContent = {
            // Basic Info
            first_name: convertedResume.first_name || '',
            last_name: convertedResume.last_name || '',
            email: convertedResume.email || '',
            phone_number: convertedResume.phone_number,
            location: convertedResume.location,
            website: convertedResume.website,
            linkedin_url: convertedResume.linkedin_url,
            github_url: convertedResume.github_url,

            // Content Sections
            work_experience: convertedResume.work_experience || [],
            education: convertedResume.education || [],
            skills: convertedResume.skills || [],
            projects: convertedResume.projects || [],
          };

          const resume = await createBaseResume(
            targetRole,
            'import-resume',
            selectedContent;

          toast({
            title: "Success",
            description: "Resume created successfully",
          });

          router.push(`/resumes/${resume.id}`);
          setOpen(false);
          return;
        } catch (error) {
          if (error instanceof Error && (
            error.message.toLowerCase().includes('api key') ||
            error.message.toLowerCase().includes('unauthorized') ||
            error.message.toLowerCase().includes('invalid key') ||
            error.message.toLowerCase().includes('invalid x-api-key')
          )) {
            setErrorMessage({
              title: "API Key Error",
              description: "There was an issue with your API key. Please check your settings and try again."
            });
          } else {
            setErrorMessage({
              title: "Error",
              description: "Failed to convert resume text. Please try again."
            });
          }
          setShowErrorDialog(true);
          setIsCreating(false);
          return;
        }
      }

      const selectedContent = {
        work_experience: profile.work_experience.filter(exp =>
          selectedItems.work_experience.includes(getItemId('work_experience', exp))
        ),
        education: profile.education.filter(edu =>
          selectedItems.education.includes(getItemId('education', edu))
        ),
        skills: profile.skills.filter(skill =>
          selectedItems.skills.includes(getItemId('skills', skill))
        ),
        projects: profile.projects.filter(project =>
          selectedItems.projects.includes(getItemId('projects', project))
        ),
      };


      const resume = await createBaseResume(
        targetRole,
        importOption === 'scratch' ? 'fresh' );



      toast({
        title: "Success",
        description: "Resume created successfully",
      });

      router.push(`/resumes/${resume.id}`);
      setOpen(false);
    } catch (error) {
      console.error('Create resume error:', error);
      setErrorMessage({
        title: "Error",
        description: "Failed to create resume. Please try again."
      });
      setShowErrorDialog(true);
    } finally {
      setIsCreating(false);
    }
  };

  // Initialize all items= () => {
    setSelectedItems({
      work_experience: profile.work_experience.map(exp => getItemId('work_experience', exp)),
      education: profile.education.map(edu => getItemId('education', edu)),
      skills: profile.skills.map(skill => getItemId('skills', skill)),
      projects: profile.projects.map(project => getItemId('projects', project))
    });
  };

  // Reset form and initialize selected items when dialog opens
  const handleOpenChange = (newOpen) => {
    if (!newOpen) {
      // Move focus back to the trigger when closing
      const trigger = document.querySelector('[data-state="open"]');
      if (trigger) {
        (trigger.focus();
      }
    }
    setOpen(newOpen);
    if (newOpen) {
      setTargetRole('');
      setImportOption('import-profile');
      initializeSelectedItems();
    }
  };

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
      } catch {
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
      } catch {
        toast({
          title: "PDF Processing Error",
          description: "Failed to extract text from the PDF. Please try again or paste the content manually.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    
      
        {children}
      
      
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
            20%, 40%, 60%, 80% { transform: translateX(2px); }
          }
          .shake {
            animation: shake 0.8s cubic-bezier(.36,.07,.19,.97) both;
          }
        `}
        {/* Header Section with Icon */}
        
          
            
              
            
            
              
                Create Base Resume
              
              
                Create a new base resume template that you can use for multiple job applications
              
            
          
        

        {/* Content Section */}
        
          
            
              
                Target Role *
              
               setTargetRole(e.target.value)}
                className={cn(
                  "bg-white/80 border-gray-200 h-12 text-base focus:border-purple-500 focus:ring-purple-500/20 placeholder:text-gray-400",
                  isTargetRoleInvalid && "border-red-500 shake"
                )}
                required
              />
            

            
              
                Resume Content
              
              
                
                   setImportOption(e.target.value'import-profile' | 'scratch' | 'import-resume')}
                    className="sr-only peer"
                  />
                  
                    
                      
                    
                    
                      Import from Profile
                      
                        Import your experience and skills
                      
                    
                  
                

                
                   setImportOption(e.target.value'import-profile' | 'scratch' | 'import-resume')}
                    className="sr-only peer"
                  />
                  
                    
                      
                    
                    
                      Import from Resume
                      
                        Paste your existing resume
                      
                    
                  
                

                
                   setImportOption(e.target.value'import-profile' | 'scratch' | 'import-resume')}
                    className="sr-only peer"
                  />
                  
                    
                      
                    
                    
                      Start Fresh
                      
                        Create a blank resume
                      
                    
                  
                
              

              {importOption === 'import-profile' && (
                
                  {/* Left Column */}
                  
                    
                      {/* Work Experience */}
                      
                        
                           handleSectionSelection('work_experience', checked={cn(
                              "mt-0.5 ml-2",
                              isSectionPartiallySelected('work_experience') && "data-[state=checked]:bg-purple-600/50"
                            )}
                          />
                          
                            
                              
                                Work Experience
                              
                              
                                {profile.work_experience.length} {profile.work_experience.length === 1 ? 'position' : 'positions'}
                              
                            
                          
                        
                        
                          
                            {profile.work_experience.map((exp) => {
                              const id = getItemId('work_experience', exp);
                              return (
                                
                                   handleItemSelection('work_experience', id)}
                                    className="mt-0.5 ml-2"
                                  />
                                   handleItemSelection('work_experience', id)}
                                  >
                                    
                                      {exp.position}
                                      {exp.date}
                                    
                                    {exp.company}
                                  
                                
                              );
                            })}
                          
                        
                      

                      {/* Skills */}
                      
                        
                           handleSectionSelection('skills', checked={cn(
                              "mt-0.5 ml-2",
                              isSectionPartiallySelected('skills') && "data-[state=checked]:bg-purple-600/50"
                            )}
                          />
                          
                            
                              
                                Skills
                              
                              
                                {profile.skills.length} {profile.skills.length === 1 ? 'category' : 'categories'}
                              
                            
                          
                        
                        
                          
                            {profile.skills.map((skill) => {
                              const id = getItemId('skills', skill);
                              return (
                                
                                   handleItemSelection('skills', id)}
                                    className="mt-0.5 ml-2"
                                  />
                                   handleItemSelection('skills', id)}
                                  >
                                    {skill.category}
                                    
                                      {skill.items.map((item, index) => (
                                        
                                          {item}
                                        
                                      ))}
                                    
                                  
                                
                              );
                            })}
                          
                        
                      
                    
                  

                  {/* Right Column */}
                  
                    
                      {/* Projects */}
                      
                        
                           handleSectionSelection('projects', checked={cn(
                              "mt-0.5 ml-2",
                              isSectionPartiallySelected('projects') && "data-[state=checked]:bg-purple-600/50"
                            )}
                          />
                          
                            
                              
                                Projects
                              
                              
                                {profile.projects.length} {profile.projects.length === 1 ? 'project' : 'projects'}
                              
                            
                          
                        
                        
                          
                            {profile.projects.map((project) => {
                              const id = getItemId('projects', project);
                              return (
                                
                                   handleItemSelection('projects', id)}
                                    className="mt-0.5 ml-2"
                                  />
                                   handleItemSelection('projects', id)}
                                  >
                                    
                                      {project.name}
                                      {project.date && (
                                        {project.date}
                                      )}
                                    
                                    {project.technologies && (
                                      
                                        {project.technologies.join(', ')}
                                      
                                    )}
                                  
                                
                              );
                            })}
                          
                        
                      

                      {/* Education */}
                      
                        
                           handleSectionSelection('education', checked={cn(
                              "mt-0.5 ml-2",
                              isSectionPartiallySelected('education') && "data-[state=checked]:bg-purple-600/50"
                            )}
                          />
                          
                            
                              
                                Education
                              
                              
                                {profile.education.length} {profile.education.length === 1 ? 'institution' : 'institutions'}
                              
                            
                          
                        
                        
                          
                            {profile.education.map((edu) => {
                              const id = getItemId('education', edu);
                              return (
                                
                                   handleItemSelection('education', id)}
                                    className="mt-0.5 ml-2"
                                  />
                                   handleItemSelection('education', id)}
                                  >
                                    
                                      {`${edu.degree} in ${edu.field}`}
                                      {edu.date}
                                    
                                    {edu.school}
                                  
                                
                              );
                            })}
                          
                        
                      
                    
                  
                
              )}

              {importOption === 'import-resume' && (
                
                  
                    
                    
                    
                      
                        Drop your PDF resume here
                      
                      
                        or click to browse files
                      
                    
                  
                  
                    
                      Or paste your resume text here
                    
                     setResumeText(e.target.value)}
                      placeholder="Start pasting your resume content here..."
                      className="min-h-[200px] bg-white/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 pt-4"
                    />
                  
                
              )}
            
          
        

        {/* Error Dialog */}
         {
          setShowErrorDialog(false);
          window.location.href = '/subscription';
        }}
        onSettings={() => {
          setShowErrorDialog(false);
          window.location.href = '/settings';
        }}
      />

        {/* Footer Section */}
        
          
             setOpen(false)}
              className={cn(
                "border-gray-200 text-gray-600",
                "hover:bg-white/60",
                "hover:border-purple-200"
              )}
            >
              Cancel
            
            
              {isCreating ? (
                
                  
                  Creating...
                
              ) : (
                'Create Resume'
              )}
            
          
        
      
    
  );
}