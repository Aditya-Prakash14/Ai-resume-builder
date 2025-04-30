'use client';

import { Education, Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ImportFromProfileDialog } from "../../management/dialogs/import-from-profile-dialog";
import { memo } from 'react';
import { cn } from "@/lib/utils";
import Tiptap from "@/components/ui/tiptap";




function areEducationPropsEqual(
  prevProps,
  nextProps) {
  return (
    JSON.stringify(prevProps.education) === JSON.stringify(nextProps.education) &&
    prevProps.profile.id === nextProps.profile.id
  );
}

export const EducationForm = memo(function EducationFormComponent({
  education,
  onChange,
  profile
}) {
  const addEducation = () => {
    onChange([{
      school: "",
      degree: "",
      field: "",
      location: "",
      date: "",
      gpa,
      achievements, ...education]);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleImportFromProfile = (importedEducation) => {
    onChange([...importedEducation, ...education]);
  };

  return (
    
      
        
          
            
            Add Education
          

          
            profile={profile}
            onImport={handleImportFromProfile}
            type="education"
            buttonClassName={cn(
              "flex-1 mb-0 h-9 min-w-[120px]",
              "whitespace-nowrap text-[11px] @[300px]:text-sm",
              "bg-gradient-to-r from-indigo-500/5 via-indigo-500/10 to-blue-500/5",
              "hover:from-indigo-500/10 hover:via-indigo-500/15 hover:to-blue-500/10",
              "border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/40",
              "text-indigo-700 hover:text-indigo-800"
            )}
          />
        
      

      {education.map((edu, index) => (
        
          
            
              {/* School Name and Delete Button Row */}
              
                
                   updateEducation(index, 'school', e.target.value)}
                    className={cn(
                      "text-sm font-semibold h-9",
                      "bg-white/50 border-gray-200 rounded-lg",
                      "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                      "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                      "placeholder:text-gray-400"
                    )}
                    placeholder="Institution Name"
                  />
                  
                    INSTITUTION
                  
                
                 removeEducation(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  
                
              

              {/* Location */}
              
                 updateEducation(index, 'location', e.target.value)}
                  className={cn(
                    "h-9 bg-white/50 border-gray-200 rounded-lg",
                    "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                    "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                    "placeholder:text-gray-400",
                    "text-[10px] sm:text-xs"
                  )}
                  placeholder="City, Country"
                />
                
                  LOCATION
                
              

              {/* Degree and Field Row */}
              
                
                   updateEducation(index, 'degree', e.target.value)}
                    className={cn(
                      "h-9 bg-white/50 border-gray-200 rounded-lg",
                      "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                      "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                      "placeholder:text-gray-400",
                      "text-[10px] sm:text-xs"
                    )}
                    placeholder="Bachelor's, Master's, etc."
                  />
                  
                    DEGREE
                  
                
                
                   updateEducation(index, 'field', e.target.value)}
                    className={cn(
                      "h-9 bg-white/50 border-gray-200 rounded-lg",
                      "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                      "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                      "placeholder:text-gray-400",
                      "text-[10px] sm:text-xs"
                    )}
                    placeholder="Field of Study"
                  />
                  
                    FIELD OF STUDY
                  
                
              

              {/* Dates Row */}
              
                 updateEducation(index, 'date', e.target.value)}
                  className={cn(
                    "w-full h-9 bg-white/50 border-gray-200 rounded-lg",
                    "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                    "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                    "text-[10px] sm:text-xs"
                  )}
                  placeholder="e.g., &apos;2019 - 2023&apos; or &apos;2020 - Present&apos;"
                />
                
                  DATE
                
              

              {/* Current Status Note */}
              
                Use &apos;Present&apos; in the date field for current education
              

              {/* GPA */}
              
                 updateEducation(index, 'gpa', e.target.value ? parseFloat(e.target.value) )}
                  className={cn(
                    "h-9 bg-white/50 border-gray-200 rounded-lg",
                    "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                    "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                    "placeholder:text-gray-400",
                    "text-[10px] sm:text-xs"
                  )}
                  placeholder="0.00"
                />
                
                  GPA (OPTIONAL)
                
              

              {/* Achievements */}
              
                
                  Achievements & Activities
                  One achievement per line
                
                 updateEducation(index, 'achievements', 
                    newContent.split('\n').filter(Boolean)
                  )}
                  editorProps={{
                    attributes: {
                      placeholder: "• Dean's List 2020-2021\n• President of Computer Science Club\n• First Place in Hackathon 2022"
                    }
                  }}
                  className={cn(
                    "min-h-[120px] bg-white/50 border-gray-200 rounded-lg",
                    "focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/20",
                    "hover:border-indigo-500/30 hover:bg-white/60 transition-colors",
                    "placeholder:text-gray-400",
                    "text-[10px] sm:text-xs"
                  )}
                />
              
            
          
        
      ))}
    
  );
}, areEducationPropsEqual); 