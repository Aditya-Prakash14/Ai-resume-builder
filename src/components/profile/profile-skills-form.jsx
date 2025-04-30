'use client';

import { Skill } from "@/lib/types";
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



export function ProfileSkillsForm({ skills, onChange }) {
  const addSkill = () => {
    onChange([...skills, {
      category: "",
      items);
  };

  const updateSkill = (index, field, value) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field];
    onChange(updated);
  };

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const [skillInputs, setSkillInputs] = React.useState(
    Object.fromEntries(skills.map((s, i) => [i, s.items?.join(', ') || '']))
  );

  React.useEffect(() => {
    setSkillInputs(Object.fromEntries(
      skills.map((s, i) => [i, s.items?.join(', ') || ''])
    ));
  }, [skills]);

  return (
    
       `skill-${index}`)}
      >
        {skills.map((skill, index) => (
          
            
              
                
                  {skill.category || "New Skill Category"}
                
                
                  {skill.items && skill.items.length > 0 && (
                    
                      {skill.items.join(", ")}
                    
                  )}
                
              
            
            
              
                {/* Category and Delete Button Row */}
                
                  
                     updateSkill(index, 'category', e.target.value)}
                      className="text-base bg-white/50 border-gray-200 rounded-md h-8
                        focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20
                        hover:border-rose-500/30 hover:bg-white/60 transition-colors
                        placeholder:text-gray-400"
                      placeholder="e.g., Programming Languages, Frameworks, Tools"
                    />
                    
                      CATEGORY
                    
                  
                   removeSkill(index)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-300 h-8 w-8"
                  >
                    
                  
                

                {/* Skills */}
                
                  
                    Skills
                    Separate with commas
                  
                   {
                      const newValue = e.target.value;
                      setSkillInputs(prev => ({ ...prev, [index]);
                      
                      if (newValue.endsWith(',')) {
                        const items = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateSkill(index, 'items', items);
                      } else {
                        const items = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateSkill(index, 'items', items);
                      }
                    }}
                    onBlur={(e) => {
                      const items = e.target.value
                        .split(',')
                        .map(t => t.trim())
                        .filter(Boolean);
                      updateSkill(index, 'items', items);
                      setSkillInputs(prev => ({ 
                        ...prev, 
                        [index]: items.join(', ') 
                      }));
                    }}
                    placeholder="e.g., TypeScript, React, Node.js, AWS"
                    className="bg-white/50 border-gray-200 rounded-md h-8
                      focus:border-rose-500/40 focus:ring-1 focus:ring-rose-500/20
                      hover:border-rose-500/30 hover:bg-white/60 transition-colors
                      placeholder:text-gray-400 text-sm"
                  />
                
              
            
          
        ))}
      

      
        
        Add Skill Category
      
    
  );
} 