'use client';

import { WorkExperience, Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, GripVertical, Check, X, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImportFromProfileDialog } from "../../management/dialogs/import-from-profile-dialog";
import { ApiErrorDialog } from "@/components/ui/api-error-dialog";

import { useState, useRef, useEffect, memo } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import Tiptap from "@/components/ui/tiptap";
import { generateWorkExperiencePoints, improveWorkExperience } from "@/utils/actions/resumes/ai";
import { AIImprovementPrompt } from "../../shared/ai-improvement-prompt";
import { AIGenerationSettingsTooltip } from "../components/ai-generation-tooltip";
import { AISuggestions } from "../../shared/ai-suggestions";








; // expIndex -> pointIndex -> prompt
}

// Create a comparison function
function areWorkExperiencePropsEqual(
  prevProps,
  nextProps) {
  return (
    prevProps.targetRole === nextProps.targetRole &&
    JSON.stringify(prevProps.experiences) === JSON.stringify(nextProps.experiences) &&
    prevProps.profile.id === nextProps.profile.id
  );
}

// Export the memoized component
export const WorkExperienceForm = memo(function WorkExperienceFormComponent({ 
  experiences, 
  onChange, 
  profile, 
  targetRole = "Software Engineer" 
}, setAiSuggestions] = useState({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ title: '', description: '' });

  // Effect to focus textarea when popover opens
  useEffect(() => {
    Object.entries(popoverOpen).forEach(([index, isOpen]) => {
      if (isOpen && textareaRefs.current[Number(index)]) {
        // Small delay to ensure the popover is fully rendered
        setTimeout(() => {
          textareaRefs.current[Number(index)]?.focus();
        }, 100);
      }
    });
  }, [popoverOpen]);

  const addExperience = () => {
    onChange([{
      company: "",
      position: "",
      location: "",
      date: "",
      description,
      technologies, ...experiences]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeExperience = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const handleImportFromProfile = (importedExperiences) => {
    onChange([...importedExperiences, ...experiences]);
  };

  const generateAIPoints = async (index) => {
    const exp = experiences[index];
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

      const result = await generateWorkExperiencePoints(
        exp.position,
        exp.company,
        exp.technologies || [],
        targetRole,
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

  const approveSuggestion = (expIndex, suggestion) => {
    const updated = [...experiences];
    updated[expIndex].description = [...updated[expIndex].description, suggestion.point];
    onChange(updated);
    
    // Remove the suggestion after approval
    setAiSuggestions(prev => ({
      ...prev,
      [expIndex]: prev[expIndex].filter(s => s.id !== suggestion.id)
    }));
  };

  const deleteSuggestion = (expIndex, suggestionId) => {
    setAiSuggestions(prev => ({
      ...prev,
      [expIndex]: prev[expIndex].filter(s => s.id !== suggestionId)
    }));
  };

  const rewritePoint = async (expIndex, pointIndex) => {
    const exp = experiences[expIndex];
    const point = exp.description[pointIndex];
    const customPrompt = improvementConfig[expIndex]?.[pointIndex];
    
    setLoadingPointAI(prev => ({
      ...prev,
      [expIndex]: { ...(prev[expIndex] || {}), [pointIndex]);
    
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

      const improvedPoint = await improveWorkExperience(point, customPrompt, {
        model: selectedModel || '',
        apiKeys
      });

      // Store both original and improved versions
      setImprovedPoints(prev => ({
        ...prev,
        [expIndex]: {
          ...(prev[expIndex] || {}),
          [pointIndex];

      // Update the experience with the improved version
      const updated = [...experiences];
      updated[expIndex].description[pointIndex] = improvedPoint;
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
        [expIndex]: { ...(prev[expIndex] || {}), [pointIndex]);
    }
  };

  const undoImprovement = (expIndex, pointIndex) => {
    const improvedPoint = improvedPoints[expIndex]?.[pointIndex];
    if (improvedPoint) {
      const updated = [...experiences];
      updated[expIndex].description[pointIndex] = improvedPoint.original;
      onChange(updated);
      
      // Remove the improvement from state
      setImprovedPoints(prev => {
        const newState = { ...prev };
        if (newState[expIndex]) {
          delete newState[expIndex][pointIndex];
          if (Object.keys(newState[expIndex]).length === 0) {
            delete newState[expIndex];
          }
        }
        return newState;
      });
    }
  };

  return (
    
      
        
          
            
              
              Add Work Experience
            

            
              profile={profile}
              onImport={handleImportFromProfile}
              type="work_experience"
              buttonClassName={cn(
                "flex-1 mb-0 h-9 min-w-[120px]",
                "whitespace-nowrap text-[11px] @[300px]:text-sm"
              )}
            />
          
        

        {experiences.map((exp, index) => (
          
            
              
                
              
            
            
            
              {/* Header with Delete Button */}
              
                {/* Position Title - Full Width */}
                
                  
                     updateExperience(index, 'position', e.target.value)}
                      className={cn(
                        "text-sm font-semibold tracking-tight h-9",
                        "bg-white/50 border-gray-200 rounded-lg",
                        "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
                        "hover:border-cyan-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="Position Title"
                    />
                    
                      POSITION
                    
                  
                   removeExperience(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                  >
                    
                  
                

                {/* Company and Location Row */}
                
                  
                     updateExperience(index, 'company', e.target.value)}
                      className={cn(
                        "text-sm font-medium bg-white/50 border-gray-200 rounded-lg h-9",
                        "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
                        "hover:border-cyan-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="Company Name"
                    />
                    
                      COMPANY
                    
                  
                  
                     updateExperience(index, 'location', e.target.value)}
                      className={cn(
                        "bg-white/50 border-gray-200 rounded-lg h-9",
                        "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
                        "hover:border-cyan-500/30 hover:bg-white/60 transition-colors",
                        "placeholder:text-gray-400"
                      )}
                      placeholder="Location"
                    />
                    
                      LOCATION
                    
                  
                

                {/* Dates Row */}
                
                   updateExperience(index, 'date', e.target.value)}
                    className={cn(
                      "w-full bg-white/50 border-gray-200 rounded-lg h-9",
                      "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
                      "hover:border-cyan-500/30 hover:bg-white/60 transition-colors"
                    )}
                    placeholder="e.g., &apos;Jan 2023 - Present&apos; or &apos;2020 - 2022&apos;"
                  />
                  
                    DATE
                  
                  Use &apos;Present&apos; in the date field for current positions
                

                {/* Description Section */}
                
                  
                    Key Responsibilities & Achievements
                  
                  
                    {exp.description.map((desc, descIndex) => (
                      
                        
                           {
                              const updated = [...experiences];
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
                              "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
                              "hover:border-cyan-500/30 hover:bg-white/60 transition-colors",
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
                                  const updated = [...experiences];
                                  updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
                                  onChange(updated);
                                }}
                                className="p-0 group-hover/item:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300"
                              >
                                
                              

                              {/* AI IMPROVEMENT */}
                              
                                
                                  
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

                    {exp.description.length === 0 && !aiSuggestions[index]?.length && (
                      
                        Add points to describe your responsibilities and achievements
                      
                    )}
                  
                  
                     {
                        const updated = [...experiences];
                        updated[index].description = [...updated[index].description, ""];
                        onChange(updated);
                      }}
                      className={cn(
                        "flex-1 text-cyan-600 hover:text-cyan-700 transition-colors text-[10px] sm:text-xs",
                        "border-cyan-200 hover:border-cyan-300 hover:bg-cyan-50/50"
                      )}
                    >
                      
                      Add Point
                    


                    {/* AI GENERATION SETTINGS */}
                     setAiConfig(prev => ({
                        ...prev,
                        [index]: { ...prev[index], numPoints)}
                      onCustomPromptChange={(value) => setAiConfig(prev => ({
                        ...prev,
                        [index]: { ...prev[index], customPrompt)}
                      colorClass={{
                        button: "text-purple-600",
                        border: "border-purple-200",
                        hoverBorder: "hover:border-purple-300",
                        hoverBg: "hover:bg-purple-50/50",
                        tooltipBg: "bg-purple-50",
                        tooltipBorder: "border-2 border-purple-300",
                        tooltipShadow: "shadow-lg shadow-purple-100/50",
                        text: "text-purple-600",
                        hoverText: "hover:text-purple-700"
                      }}
                    />
                  
                
              
            
          
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
}, areWorkExperiencePropsEqual); 