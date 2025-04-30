'use client';

import { WorkExperience } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";



export function ProfileWorkExperienceForm({ experiences, onChange }) {
  const addExperience = () => {
    onChange([...experiences, {
      company: "",
      position: "",
      location: "",
      date: "",
      description,
      technologies);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeExperience = (index) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const [techInputs, setTechInputs] = React.useState(
    Object.fromEntries(experiences.map((exp, i) => [i, exp.technologies?.join(', ') || '']))
  );

  React.useEffect(() => {
    setTechInputs(Object.fromEntries(
      experiences.map((exp, i) => [i, exp.technologies?.join(', ') || ''])
    ));
  }, [experiences]);

  return (
    
       `experience-${index}`)}
      >
        {experiences.map((exp, index) => (
          
            
              
                
                  {exp.position || "Untitled Position"} {exp.company && `at ${exp.company}`}
                
                
                  {exp.date && {exp.date}}
                  {exp.technologies && exp.technologies.length > 0 && (
                    
                      {exp.technologies.join(", ")}
                    
                  )}
                
              
            
            
              
                {/* Position and Delete Button Row */}
                
                  
                     updateExperience(index, 'position', e.target.value)}
                      className="text-base bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                        hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400"
                      placeholder="Position Title"
                    />
                    
                      POSITION
                    
                  
                   removeExperience(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                  >
                    
                  
                

                {/* Company */}
                
                   updateExperience(index, 'company', e.target.value)}
                    className="bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                      hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                    placeholder="Company Name"
                  />
                  
                    COMPANY
                  
                

                {/* Date and Location Row */}
                
                  
                     updateExperience(index, 'date', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                        hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="e.g., Jan 2023 - Present"
                    />
                    
                      DATE
                    
                  
                  
                     updateExperience(index, 'location', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                        hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="e.g., Vancouver, BC"
                    />
                    
                      LOCATION
                    
                  
                

                {/* Technologies */}
                
                  
                    Technologies & Skills Used
                    Separate with commas
                  
                   {
                      const newValue = e.target.value;
                      setTechInputs(prev => ({ ...prev, [index]);
                      
                      if (newValue.endsWith(',')) {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateExperience(index, 'technologies', technologies);
                      } else {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateExperience(index, 'technologies', technologies);
                      }
                    }}
                    onBlur={(e) => {
                      const technologies = e.target.value
                        .split(',')
                        .map(t => t.trim())
                        .filter(Boolean);
                      updateExperience(index, 'technologies', technologies);
                      setTechInputs(prev => ({ 
                        ...prev, 
                        [index]: technologies.join(', ') 
                      }));
                    }}
                    placeholder="React, TypeScript, Node.js, etc."
                    className="bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                      hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                  />
                

                {/* Description */}
                
                  
                    Key Responsibilities & Achievements
                     {
                        const updated = [...experiences];
                        updated[index].description = [...updated[index].description, ""];
                        onChange(updated);
                      }}
                      className="text-cyan-600 hover:text-cyan-700 transition-colors h-7 text-xs"
                    >
                      
                      Add Point
                    
                  
                  
                    {exp.description.map((desc, descIndex) => (
                      
                        
                           {
                              const updated = [...experiences];
                              updated[index].description[descIndex] = e.target.value;
                              onChange(updated);
                            }}
                            placeholder="Start with a strong action verb"
                            className="bg-white/50 border-gray-200 rounded-md h-8
                              focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20
                              hover:border-cyan-500/30 hover:bg-white/60 transition-colors
                              placeholder:text-gray-400 text-sm"
                          />
                        
                         {
                            const updated = [...experiences];
                            updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
                            onChange(updated);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                        >
                          
                        
                      
                    ))}
                    {exp.description.length === 0 && (
                      
                        Add points to describe your responsibilities and achievements
                      
                    )}
                  
                
              
            
          
        ))}
      

      
        
        Add Work Experience
      
    
  );
} 