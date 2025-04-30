'use client';

import { Project } from "@/lib/types";
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



export function ProfileProjectsForm({ projects, onChange }, setTechInputs] = React.useState(
    Object.fromEntries(projects.map((p, i) => [i, p.technologies?.join(', ') || '']))
  );

  React.useEffect(() => {
    setTechInputs(Object.fromEntries(
      projects.map((p, i) => [i, p.technologies?.join(', ') || ''])
    ));
  }, [projects]);

  const addProject = () => {
    onChange([...projects, {
      name: "",
      description,
      technologies,
      url: "",
      github_url: "",
      date: ""
    }]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeProject = (index) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    
       `project-${index}`)}
      >
        {projects.map((project, index) => (
          
            
              
                
                  {project.name || "Untitled Project"}
                
                
                  {project.date && {project.date}}
                  {project.technologies && project.technologies.length > 0 && (
                    
                      {project.technologies.join(", ")}
                    
                  )}
                
              
            
            
              
                {/* Project Name and Delete Button Row */}
                
                  
                     updateProject(index, 'name', e.target.value)}
                      className="text-base bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                        hover:border-violet-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400"
                      placeholder="Project Name"
                    />
                    
                      PROJECT NAME
                    
                  
                   removeProject(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                  >
                    
                  
                

                {/* URLs Row */}
                
                  
                     updateProject(index, 'url', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                        hover:border-violet-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="https://your-project.com"
                    />
                    
                      LIVE URL
                    
                  
                  
                     updateProject(index, 'github_url', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                        hover:border-violet-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="https://github.com/username/project"
                    />
                    
                      GITHUB URL
                    
                  
                

                {/* Technologies */}
                
                  
                    Technologies & Tools Used
                    Separate with commas
                  
                   {
                      const newValue = e.target.value;
                      setTechInputs(prev => ({ ...prev, [index]);
                      
                      if (newValue.endsWith(',')) {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateProject(index, 'technologies', technologies);
                      } else {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateProject(index, 'technologies', technologies);
                      }
                    }}
                    onBlur={(e) => {
                      const technologies = e.target.value
                        .split(',')
                        .map(t => t.trim())
                        .filter(Boolean);
                      updateProject(index, 'technologies', technologies);
                      setTechInputs(prev => ({ 
                        ...prev, 
                        [index]: technologies.join(', ') 
                      }));
                    }}
                    placeholder="React, TypeScript, Node.js, etc."
                    className="bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                      hover:border-violet-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                  />
                

                {/* Dates Row */}
                
                   updateProject(index, 'date', e.target.value)}
                    className="w-full bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                      hover:border-violet-500/30 hover:bg-white/60 transition-colors text-sm"
                    placeholder="e.g., &apos;Jan 2023 - Present&apos; or &apos;Summer 2023&apos;"
                  />
                  
                    DATE
                  
                

                {/* Description */}
                
                  
                    Description
                     {
                        const updated = [...projects];
                        updated[index].description = [...updated[index].description, ""];
                        onChange(updated);
                      }}
                      className="text-violet-600 hover:text-violet-700 transition-colors h-7 text-xs"
                    >
                      
                      Add Point
                    
                  
                  
                    {project.description.map((desc, descIndex) => (
                      
                        
                           {
                              const updated = [...projects];
                              updated[index].description[descIndex] = e.target.value;
                              onChange(updated);
                            }}
                            placeholder="Describe a key feature or achievement"
                            className="bg-white/50 border-gray-200 rounded-md h-8
                              focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20
                              hover:border-violet-500/30 hover:bg-white/60 transition-colors
                              placeholder:text-gray-400 text-sm"
                          />
                        
                         {
                            const updated = [...projects];
                            updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
                            onChange(updated);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                        >
                          
                        
                      
                    ))}
                    {project.description.length === 0 && (
                      
                        Add points to describe your project&apos;s features and achievements
                      
                    )}
                  
                
              
            
          
        ))}
      
      
        
        Add Project
      
    
  );
} 