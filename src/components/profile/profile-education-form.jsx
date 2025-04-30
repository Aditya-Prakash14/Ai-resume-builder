'use client';

import { Education } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";



export function ProfileEducationForm({ education, onChange }) {
  const addEducation = () => {
    onChange([...education, {
      school: "",
      degree: "",
      field: "",
      location: "",
      date: "",
      gpa,
      achievements);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    
       `education-${index}`)}
      >
        {education.map((edu, index) => (
          
            
              
                
                  {edu.degree ? `${edu.degree} ` : ''}{edu.field ? `in ${edu.field} ` : ''}{edu.school ? `at ${edu.school}` : 'New Education'}
                
                
                  {edu.date && {edu.date}}
                  {edu.gpa && GPA: {edu.gpa}}
                
              
            
            
              
                {/* School Name and Delete Button Row */}
                
                  
                     updateEducation(index, 'school', e.target.value)}
                      className="text-base bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                        hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400"
                      placeholder="Institution Name"
                    />
                    
                      INSTITUTION
                    
                  
                   removeEducation(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                  >
                    
                  
                

                {/* Location */}
                
                   updateEducation(index, 'location', e.target.value)}
                    className="bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                      hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                    placeholder="City, Country"
                  />
                  
                    LOCATION
                  
                

                {/* Degree and Field Row */}
                
                  
                     updateEducation(index, 'degree', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                        hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="Bachelor's, Master's, etc."
                    />
                    
                      DEGREE
                    
                  
                  
                     updateEducation(index, 'field', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                        hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="Field of Study"
                    />
                    
                      FIELD OF STUDY
                    
                  
                

                {/* Date and GPA Row */}
                
                  
                     updateEducation(index, 'date', e.target.value)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                        hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="e.g., '2019 - 2023' or '2020 - Present'"
                    />
                    
                      DATE
                    
                  
                  
                     updateEducation(index, 'gpa', e.target.value || undefined)}
                      className="bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                        hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400 text-sm"
                      placeholder="0.00"
                    />
                    
                      GPA (OPTIONAL)
                    
                  
                

                {/* Achievements */}
                
                  
                    Achievements & Activities
                    One achievement per line
                  
                   updateEducation(index, 'achievements', 
                      e.target.value.split('\n').filter(Boolean)
                    )}
                    placeholder="• Dean's List 2020-2021&#10;• President of Computer Science Club&#10;• First Place in Hackathon 2022"
                    className="min-h-[100px] bg-white/50 border-gray-200 rounded-md
                      focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20
                      hover:border-indigo-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                  />
                
              
            
          
        ))}
      

      
        
        Add Education
      
    
  );
} 