'use client';

import { Skill, Profile } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ImportFromProfileDialog } from "../../management/dialogs/import-from-profile-dialog";
import { useState, KeyboardEvent } from 'react';



export function SkillsForm({
  skills,
  onChange,
  profile
}, setNewSkills] = useState {
    onChange([{
      category: "",
      items, ...skills]);
  };

  const updateSkillCategory = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeSkillCategory = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const addSkill = (categoryIndex) => {
    const skillToAdd = newSkills[categoryIndex]?.trim();
    if (!skillToAdd) return;

    const updated = [...skills];
    const currentItems = updated[categoryIndex].items || [];
    if (!currentItems.includes(skillToAdd)) {
      updated[categoryIndex] = {
        ...updated[categoryIndex],
        items: [...currentItems, skillToAdd]
      };
      onChange(updated);
    }
    setNewSkills({ ...newSkills, [categoryIndex]: '' });
  };

  const handleKeyPress = (e, categoryIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(categoryIndex);
    }
  };

  const removeSkill = (categoryIndex, skillIndex) => {
    const updated = skills.map((skill, idx) => {
      if (idx === categoryIndex) {
        return {
          ...skill,
          items: skill.items.filter((_, i) => i !== skillIndex)
        };
      }
      return skill;
    });
    onChange(updated);
  };

  const handleImportFromProfile = (importedSkills) => {
    onChange([...importedSkills, ...skills]);
  };

  return (
    
      
        
          
            
            Add Skill Category
          

          
            profile={profile}
            onImport={handleImportFromProfile}
            type="skills"
            buttonClassName={cn(
              "flex-1 mb-0 h-9 min-w-[120px]",
              "whitespace-nowrap text-[11px] @[300px]:text-sm",
              "bg-gradient-to-r from-rose-500/5 via-rose-500/10 to-pink-500/5",
              "hover:from-rose-500/10 hover:via-rose-500/15 hover:to-pink-500/10",
              "border-2 border-dashed border-rose-500/30 hover:border-rose-500/40",
              "text-rose-700 hover:text-rose-800"
            )}
          />
        
      

      {skills.map((skill, index) => (
        
          
            
              {/* Category Name and Delete Button Row */}
              
                
                   updateSkillCategory(index, 'category', e.target.value)}
                    className={cn(
                      "text-sm font-medium h-9",
                      "bg-white/50 border-gray-200 rounded-lg",
                      "focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/20",
                      "hover:border-rose-500/30 hover:bg-white/60 transition-colors",
                      "placeholder:text-gray-400"
                    )}
                    placeholder="Category Name"
                  />
                  
                    CATEGORY
                  
                
                 removeSkillCategory(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                >
                  
                
              

              {/* Skills Display */}
              
                
                  {skill.items.map((item, skillIndex) => (
                    
                      {item}
                       removeSkill(index, skillIndex)}
                        className="ml-1.5 hover:text-red-500 opacity-50 hover:opacity-100 transition-opacity"
                      >
                        ×
                      
                    
                  ))}
                

                {/* New Skill Input */}
                
                   setNewSkills({ ...newSkills, [index]: e.target.value })}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    className={cn(
                      "h-9 bg-white/50 border-gray-200 rounded-lg",
                      "focus:border-rose-500/40 focus:ring-2 focus:ring-rose-500/20",
                      "hover:border-rose-500/30 hover:bg-white/60 transition-colors",
                      "placeholder:text-gray-400",
                      "text-[10px] sm:text-xs"
                    )}
                    placeholder="Type a skill and press Enter or click +"
                  />
                   addSkill(index)}
                    className="h-9 px-2 bg-white/50 hover:bg-white/60"
                  >
                    
                  
                  
                    ADD SKILL
                  
                
              
            
          
        
      ))}
    
  );
} 