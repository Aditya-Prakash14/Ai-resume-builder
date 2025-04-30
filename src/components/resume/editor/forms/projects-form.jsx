'use client';

import { Project, Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, Loader2, Sparkles, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImportFromProfileDialog } from "../../management/dialogs/import-from-profile-dialog";
import { useState, useRef, useEffect, memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AISuggestions } from "../../shared/ai-suggestions";
import { generateProjectPoints, improveProject } from "@/utils/actions/resumes/ai";
import { Badge } from "@/components/ui/badge";
import { KeyboardEvent } from "react";
import Tiptap from "@/components/ui/tiptap";
import { AIImprovementPrompt } from "../../shared/ai-improvement-prompt";
import { AIGenerationSettingsTooltip } from "../components/ai-generation-tooltip";
import { ApiErrorDialog } from "@/components/ui/api-error-dialog";





; // projectIndex -> pointIndex -> prompt
}



function areProjectsPropsEqual(
  prevProps,
  nextProps) {
  return (
    JSON.stringify(prevProps.projects) === JSON.stringify(nextProps.projects) &&
    prevProps.profile.id === nextProps.profile.id
  );
}

export const ProjectsForm = memo(function ProjectsFormComponent({
  projects,
  onChange,
  profile
}, setAiSuggestions] = useState({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', description: '' });
  const textareaRefs = useRef {
    Object.entries(popoverOpen).forEach(([index, isOpen]) => {
      if (isOpen && textareaRefs.current[Number(index)]) {
        // Small delay to ensure the popover is fully rendered
        setTimeout(() => {
          textareaRefs.current[Number(index)]?.focus();
        }, 100);
      }
    });
  }, [popoverOpen]);

  const addProject = () => {
    onChange([{
      name: "",
      description,
      technologies,
      date: "",
      url: "",
      github_url: ""
    }, ...projects]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const handleImportFromProfile = (importedProjects) => {
    onChange([...importedProjects, ...projects]);
  };

  const generateAIPoints = async (index) => {
    const project = projects[index];
    const config = aiConfig[index] || { numPoints: 3, customPrompt: '' };
    setLoadingAI(prev => ({ ...prev, [index]);
    setPopoverOpen(prev => ({ ...prev, [index]);
    
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

      const result = await generateProjectPoints(
        project.name,
        project.technologies || [],
        "Software Engineer",
        config.numPoints,
        config.customPrompt,
        {
          model: selectedModel || '',
          apiKeys
        }
      );
      
      const suggestions = result.points.map((point) => ({
        id: Math.random().toString(36).substr(2, 9),
        point
      }));
      
      setAiSuggestions(prev => ({
        ...prev,
        [index]);
    } catch (error) {
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
          description: "Failed to generate AI points. Please try again."
        });
      }
      setShowErrorDialog(true);
    } finally {
      setLoadingAI(prev => ({ ...prev, [index]);
    }
  };

  const approveSuggestion = (projectIndex, suggestion) => {
    const updated = [...projects];
    updated[projectIndex].description = [...updated[projectIndex].description, suggestion.point];
    onChange(updated);
    
    // Remove the suggestion after approval
    setAiSuggestions(prev => ({
      ...prev,
      [projectIndex]: prev[projectIndex].filter(s => s.id !== suggestion.id)
    }));
  };

  const deleteSuggestion = (projectIndex, suggestionId) => {
    setAiSuggestions(prev => ({
      ...prev,
      [projectIndex]: prev[projectIndex].filter(s => s.id !== suggestionId)
    }));
  };

  const rewritePoint = async (projectIndex, pointIndex) => {
    const project = projects[projectIndex];
    const point = project.description[pointIndex];
    const customPrompt = improvementConfig[projectIndex]?.[pointIndex];
    
    setLoadingPointAI(prev => ({
      ...prev,
      [projectIndex]: { ...(prev[projectIndex] || {}), [pointIndex]);
    
    try {
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

      const improvedPoint = await improveProject(point, customPrompt, {
        model: selectedModel || '',
        apiKeys
      });

      setImprovedPoints(prev => ({
        ...prev,
        [projectIndex]: {
          ...(prev[projectIndex] || {}),
          [pointIndex];

      const updated = [...projects];
      updated[projectIndex].description[pointIndex] = improvedPoint;
      onChange(updated);
    } catch (error) {
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
          description: "Failed to improve point. Please try again."
        });
      }
      setShowErrorDialog(true);
    } finally {
      setLoadingPointAI(prev => ({
        ...prev,
        [projectIndex]: { ...(prev[projectIndex] || {}), [pointIndex]);
    }
  };

  const undoImprovement = (projectIndex, pointIndex) => {
    const improvedPoint = improvedPoints[projectIndex]?.[pointIndex];
    if (improvedPoint) {
      const updated = [...projects];
      updated[projectIndex].description[pointIndex] = improvedPoint.original;
      onChange(updated);
      
      // Remove the improvement from state
      setImprovedPoints(prev => {
        const newState = { ...prev };
        if (newState[projectIndex]) {
          delete newState[projectIndex][pointIndex];
          if (Object.keys(newState[projectIndex]).length === 0) {
            delete newState[projectIndex];
          }
        }
        return newState;
      });
    }
  };

  const addTechnology = (projectIndex) => {
    const techToAdd = newTechnologies[projectIndex]?.trim();
    if (!techToAdd) return;

    const updated = [...projects];
    const currentTechnologies = updated[projectIndex].technologies || [];
    
    if (!currentTechnologies.includes(techToAdd)) {
      updated[projectIndex] = {
        ...updated[projectIndex],
        technologies: [...currentTechnologies, techToAdd]
      };
      onChange(updated);
    }
    setNewTechnologies({ ...newTechnologies, [projectIndex]: '' });
  };

  const handleTechKeyPress = (e, projectIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(projectIndex);
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    const updated = [...projects];
    updated[projectIndex].technologies = (updated[projectIndex].technologies || [])
      .filter((_, i) => i !== techIndex);
    onChange(updated);
  };

  return (
    
      
        
          
            
              
              Add Project
            

            
              profile={profile}
              onImport={handleImportFromProfile}
              type="projects"
              buttonClassName={cn(
                "flex-1 mb-0 h-9 min-w-[120px]",
                "bg-gradient-to-r from-violet-500/5 via-violet-500/10 to-purple-500/5",
                "hover:from-violet-500/10 hover:via-violet-500/15 hover:to-purple-500/10",
                "border-2 border-dashed border-violet-500/30 hover:border-violet-500/40",
                "text-violet-700 hover:text-violet-800",
                "transition-all duration-300",
                "rounded-xl",
                "whitespace-nowrap text-[11px] @[300px]:text-sm"
              )}
            />
          
        

        {projects.map((project, index) => (
          
            
              
                
              
            
            
            
              {/* Header with Delete Button */}
              
                {/* Project Name - Full Width */}
                
                  
                     updateProject(index, 'name', e.target.value)}
                      className={cn(
                        "text-sm font-semibold tracking-tight h-9",
                        "bg-white/50 border-gray-200 rounded-lg",
                        "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                        "hover:border-violet-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="Project Name"
                    />
                    
                      PROJECT NAME
                    
                  
                   removeProject(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    
                  
                

                {/* URLs Row */}
                
                  
                     updateProject(index, 'url', e.target.value)}
                      className={cn(
                        "text-sm font-medium bg-white/50 border-gray-200 rounded-lg h-9",
                        "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                        "hover:border-violet-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="Live URL"
                    />
                    
                      LIVE URL
                    
                  
                  
                     updateProject(index, 'github_url', e.target.value)}
                      className={cn(
                        "h-9 bg-white/50 border-gray-200 rounded-lg",
                        "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                        "hover:border-violet-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="GitHub URL"
                    />
                    
                      GITHUB URL
                    
                  
                

                {/* Date */}
                
                   updateProject(index, 'date', e.target.value)}
                    className={cn(
                      "w-full bg-white/50 border-gray-200 rounded-lg h-9",
                      "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                      "hover:border-violet-500/30 hover:bg-white/60 transition-colors"
                    )}
                    placeholder="e.g., &apos;Jan 2023 - Present&apos; or &apos;2020 - 2022&apos;"
                  />
                  
                    DATE
                  
                

                {/* Description Section */}
                
                  
                    Key Features & Technical Achievements
                  
                  
                    {project.description.map((desc, descIndex) => (
                      
                        
                           {
                              const updated = [...projects];
                              updated[index].description[descIndex] = newContent;
                              onChange(updated);

                              if (improvedPoints[index]?.[descIndex]) {
                                setImprovedPoints(prev => {
                                  const newState = { ...prev };
                                  if (newState[index]) {
                                    delete newState[index][descIndex];
                                    if (Object.keys(newState[index]).length === 0) {
                                      delete newState[index];
                                    }
                                  }
                                  return newState;
                                });
                              }
                            }}
                            className={cn(
                              "min-h-[60px] text-xs md:text-sm bg-white/50 border-gray-200 rounded-lg",
                              "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                              "hover:border-violet-500/30 hover:bg-white/60 transition-colors",
                              "placeholder:text-gray-400",
                              improvedPoints[index]?.[descIndex] && [
                                "border-purple-400",
                                "bg-gradient-to-r from-purple-50/80 to-indigo-50/80",
                                "shadow-[0_0_15px_-3px_rgba(168,85,247,0.2)]",
                                "hover:bg-gradient-to-r hover:from-purple-50/90 hover:to-indigo-50/90"
                              ]
                            )}
                          />

                          {improvedPoints[index]?.[descIndex] && (
                            
                              
                                
                                AI Suggestion
                              
                            
                          )}
                        
                        
                          {improvedPoints[index]?.[descIndex] ? (
                            
                               {
                                  // Remove the improvement state after accepting
                                  setImprovedPoints(prev => {
                                    const newState = { ...prev };
                                    if (newState[index]) {
                                      delete newState[index][descIndex];
                                      if (Object.keys(newState[index]).length === 0) {
                                        delete newState[index];
                                      }
                                    }
                                    return newState;
                                  });
                                }}
                                className={cn(
                                  "p-0 group-hover/item:opacity-100",
                                  "h-8 w-8 rounded-lg",
                                  "bg-green-50/80 hover:bg-green-100/80",
                                  "text-green-600 hover:text-green-700",
                                  "border border-green-200/60",
                                  "shadow-sm",
                                  "transition-all duration-300",
                                  "hover:scale-105 hover:shadow-md",
                                  "hover:-translate-y-0.5"
                                )}
                              >
                                
                              
                               undoImprovement(index, descIndex)}
                                className={cn(
                                  "p-0 group-hover/item:opacity-100",
                                  "h-8 w-8 rounded-lg",
                                  "bg-rose-50/80 hover:bg-rose-100/80",
                                  "text-rose-600 hover:text-rose-700",
                                  "border border-rose-200/60",
                                  "shadow-sm",
                                  "transition-all duration-300",
                                  "hover:scale-105 hover:shadow-md",
                                  "hover:-translate-y-0.5"
                                )}
                              >
                                
                              
                            
                          ) ="ghost"
                                size="icon"
                                onClick={() => {
                                  const updated = [...projects];
                                  updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
                                  onChange(updated);
                                }}
                                className="p-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300"
                              >
                                
                              
                              
                                
                                  
                                     rewritePoint(index, descIndex)}
                                      disabled={loadingPointAI[index]?.[descIndex]}
                                      className={cn(
                                        "p-0 group-hover/item:opacity-100",
                                        "h-8 w-8 rounded-lg",
                                        "bg-purple-50/80 hover:bg-purple-100/80",
                                        "text-purple-600 hover:text-purple-700",
                                        "border border-purple-200/60",
                                        "shadow-sm",
                                        "transition-all duration-300",
                                        "hover:scale-105 hover:shadow-md",
                                        "hover:-translate-y-0.5"
                                      )}
                                    >
                                      {loadingPointAI[index]?.[descIndex] ? (
                                        
                                      ) ="h-4 w-4" />
                                      )}
                                    
                                  
                                  
                                     setImprovementConfig(prev => ({
                                        ...prev,
                                        [index]: {
                                          ...(prev[index] || {}),
                                          [descIndex])}
                                      onSubmit={() => rewritePoint(index, descIndex)}
                                      isLoading={loadingPointAI[index]?.[descIndex]}
                                    />
                                  
                                
                              
                            
                          )}
                        
                      
                    ))}

                    {/* AI Suggestions */}
                     approveSuggestion(index, suggestion)}
                      onDelete={(suggestionId) => deleteSuggestion(index, suggestionId)}
                    />

                    {project.description.length === 0 && !aiSuggestions[index]?.length && (
                      
                        Add points to describe your project&apos;s features and achievements
                      
                    )}
                  

                  
                     {
                        const updated = [...projects];
                        updated[index].description = [...updated[index].description, ""];
                        onChange(updated);
                      }}
                      className={cn(
                        "flex-1 text-violet-600 hover:text-violet-700 transition-colors text-[10px] sm:text-xs",
                        "border-violet-200 hover:border-violet-300 hover:bg-violet-50/50"
                      )}
                    >
                      
                      Add Point
                    

                    
                     setAiConfig(prev => ({
                        ...prev,
                        [index]: { ...prev[index], numPoints)}
                      onCustomPromptChange={(value) => setAiConfig(prev => ({
                        ...prev,
                        [index]: { ...prev[index], customPrompt)}
                      colorClass={{
                        button: "text-violet-600",
                        border: "border-violet-200",
                        hoverBorder: "hover:border-violet-300",
                        hoverBg: "hover:bg-violet-50/50",
                        tooltipBg: "bg-violet-50",
                        tooltipBorder: "border-2 border-violet-300",
                        tooltipShadow: "shadow-lg shadow-violet-100/50",
                        text: "text-violet-600",
                        hoverText: "hover:text-violet-700"
                      }}
                    />
                  
                

                {/* Technologies Section */}
                
                  
                    Technologies & Tools Used
                  
                  
                  
                    {/* Technologies Display */}
                    
                      {(project.technologies || []).map((tech, techIndex) => (
                        
                          {tech}
                           removeTechnology(index, techIndex)}
                            className="ml-1.5 hover:text-red-500 opacity-50 hover:opacity-100 transition-opacity"
                          >
                            ×
                          
                        
                      ))}
                    

                    {/* New Technology Input */}
                    
                       setNewTechnologies({ ...newTechnologies, [index]: e.target.value })}
                        onKeyPress={(e) => handleTechKeyPress(e, index)}
                        className={cn(
                          "h-9 bg-white/50 border-gray-200 rounded-lg",
                          "focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/20",
                          "hover:border-violet-500/30 hover:bg-white/60 transition-colors",
                          "placeholder:text-gray-400",
                          "text-[10px] sm:text-xs"
                        )}
                        placeholder="Type a technology and press Enter or click +"
                      />
                       addTechnology(index)}
                        className="h-9 px-2 bg-white/50 hover:bg-white/60"
                      >
                        
                      
                      
                        ADD TECHNOLOGY
                      
                    
                  
                
              
            
          
        ))}
      

      {/* Add Error Alert Dialog at the end */}
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
}, areProjectsPropsEqual); 