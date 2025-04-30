'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X, Sparkles } from "lucide-react";
import { WorkExperience, Project, Skill, Education } from "@/lib/types";
import { useState } from 'react';
import Tiptap from "@/components/ui/tiptap";

const DIFF_HIGHLIGHT_CLASSES = "bg-green-300 px-1  rounded-sm";









function WorkExperienceSuggestion({ content, currentContent="space-y-2">
      
        
          
            {work.position.replace(/\*\*/g, '')}
          
          
            {work.company}
          
        
        
          {work.date}
        
      
      
        {work.description.map((point, index) => {
          const currentPoint = currentWork?.description?.[index];
          const comparedWords = currentPoint 
            ? compareDescriptions(currentPoint, point){ text: point.replace(/\*\*/g, ''), isNew, isBold, isStart, isEnd;

          return (
            
              •
              
                {comparedWords.map((word, wordIndex) => (
                  
                    {word.isBold ? (
                      {word.text}
                    ) : (
                      word.text
                    )}
                  
                ))}
              
            
          );
        })}
      
    
  );
}



function ProjectSuggestion({ content, currentContent="space-y-3">
      
        
          {project.name}
        
        {project.date && (
          
            {project.date}
          
        )}
      
      
        {project.description.map((point, index) => {
          const currentPoint = currentProject?.description?.[index];
          const comparedWords = currentPoint 
            ? compareDescriptions(currentPoint, point){ text: point.replace(/\*\*/g, ''), isNew, isBold, isStart, isEnd;

          return (
            
              •
              
                {comparedWords.map((word, wordIndex) => (
                  
                    {word.isBold ? (
                      {word.text}
                    ) : (
                      word.text
                    )}
                  
                ))}
              
            
          );
        })}
      
      {project.technologies && (
        
          {project.technologies.map((tech, index) => (
            
              {tech.replace(/\*\*/g, '')}
            
          ))}
        
      )}
    
  );
}



function SkillSuggestion({ content, currentContent="space-y-3">
      {/* Category Header */}
      
         {}}
          readOnly={true}
          variant="skill"
          className={cn(
            "text-sm font-semibold tracking-wide",
            "bg-transparent",
            "border-none shadow-none",
            !currentSkill || currentSkill.category !== skill.category && "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 px-2 py-1 rounded-md"
          )}
        />
      

      {/* Skills Grid */}
      
        {skill.items.map((item, index) => {
          const isNew = !currentSkill || isNewItem(currentSkill.items, skill.items, item);
          
          return (
            
              {/* Animated Background Gradient */}
              

              {/* Skill Content */}
              
                 {}}
                  readOnly={true}
                  variant="skill"
                  className={cn(
                    "border-none shadow-none p-0",
                    "text-sm",
                    "bg-transparent",
                    isNew ? "text-emerald-700" : "text-gray-700"
                  )}
                />
              

              {/* New Indicator */}
              {isNew && (
                
                  
                    
                    
                  
                
              )}
            
          );
        })}
      
    
  );
}



function EducationSuggestion({ content, currentContent="space-y-2 w-full">
      
        
          
            
              {education.degree.split(/(\*\*.*?\*\*)/).map((part, i) => 
                part.startsWith('**') && part.endsWith('**') ? 
                  {part.slice(2, -2)} )}
            
            {' in '}
            
              {education.field.split(/(\*\*.*?\*\*)/).map((part, i) => 
                part.startsWith('**') && part.endsWith('**') ? 
                  {part.slice(2, -2)} )}
            
          
          
            {education.school.replace(/\*\*/g, '')}
          
        
        
          {education.date.replace(/\*\*/g, '')}
        
      
      {education.achievements && (
        
          {education.achievements.map((achievement, index) => {
            const currentAchievement = currentEducation?.achievements?.[index];
            const comparedWords = currentAchievement 
              ? compareDescriptions(currentAchievement, achievement){ text: achievement.replace(/\*\*/g, ''), isNew, isBold, isStart, isEnd;

            return (
              
                •
                
                  {comparedWords.map((word, wordIndex) => (
                    
                      {word.isBold ? (
                        {word.text}
                      ) : (
                        word.text
                      )}
                    
                  ))}
                
              
            );
          })}
        
      )}
    
  );
}

function compareDescriptions(current, suggested){
  text;
  isNew;
  isBold;
  isStart;
  isEnd;
}[] {
  // Clean the text by normalizing spaces and removing extra whitespace
  const cleanText = (text)=> {
    return text.trim().replace(/\s+/g, ' ');
  };

  // Split text into words, preserving bold markdown
  const splitText = (text)=> {
    // First, split by bold markdown
    const parts = text.split(/(\*\*[^*]+\*\*)/).filter(Boolean);
    
    // Then split non-bold parts by spaces while preserving bold parts
    return parts.flatMap(part => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return [part];
      }
      return part.split(/\s+/).filter(Boolean);
    });
  };

  const currentText = cleanText(current);
  const suggestedText = cleanText(suggested);
  
  const currentWords = splitText(currentText);
  const suggestedWords = splitText(suggestedText);
  
  return suggestedWords.map((word, index) => {
    const isBold = word.startsWith('**') && word.endsWith('**');
    const cleanedWord = isBold ? word.slice(2, -2) ;
    
    // Check if the word exists in current text (considering bold status)
    const isNew = !currentWords.some(currentWord => {
      const currentIsBold = currentWord.startsWith('**') && currentWord.endsWith('**');
      const currentCleaned = currentIsBold ? currentWord.slice(2, -2) ;
      return currentCleaned === cleanedWord;
    });
    
    // Check if adjacent words are new
    const prevWord = index > 0 ? suggestedWords[index - 1] ;
    const nextWord = index (current, suggested, item){
  if (!current) return true;
  return !current.includes(item);
}

// const renderBoldText = (text) => {
//   return text.split(/(\*\*.*?\*\*)/).map((part, index) => {
//     if (part.startsWith('**') && part.endsWith('**')) {
//       return {part.slice(2, -2)};
//     }
//     return part;
//   });
// };

export function Suggestion({ type, content, currentContent, onAccept, onReject }, setStatus] = useState('pending');

  const handleAccept = () => {
    setStatus('accepted');
    onAccept();
  };

  const handleReject = () => {
    setStatus('rejected');
    onReject();
  };

  // Helper function to get status-based styles
  const getStatusStyles = () => {
    switch (status) {
      case 'accepted':
        return {
          card: "bg-gradient-to-br from-emerald-200/95 via-emerald-200/90 to-green-200/95 border-emerald-200/60",
          icon: "from-emerald-100/90 to-green-100/90",
          iconColor: "text-emerald-600",
          label: "text-emerald-600",
          text: "Accepted"
        };
      case 'rejected':
        return {
          card: "bg-gradient-to-br from-rose-200/95 via-rose-200/90 to-red-200/95 border-rose-200/60",
          icon: "from-rose-100/90 to-red-100/90",
          iconColor: "text-rose-600",
          label: "text-rose-600",
          text: "Rejected"
        };
      default:
        return {
          card: "bg-gradient-to-br from-white/95 via-purple-50/30 to-indigo-50/40 border-white/60",
          icon: "from-purple-100/90 to-indigo-100/90",
          iconColor: "text-purple-600",
          label: "text-gray-900",
          text: "AI Suggestion"
        };
    }
  };

  const statusStyles = getStatusStyles();

  // Helper function to render content based on 
      case 'project'={content={currentContent/>;
      case 'skill'={content={currentContent/>;
      case 'education'={content={currentContent/>;
    }
  };

  return (
    
      {/* Enhanced Background Pattern */}
      
      
      {/* Improved Floating Gradient Orbs */}

      {/* Content */}
      
        {/* Header */}
        
          
            
              
            
            {statusStyles.text}
          
        

        {/* Main Content */}
        
          {renderContent()}
        

        {/* Action Buttons */}
        {status === 'pending' && (
          
            
              {/* Animated background on hover */}
              
              
              
                
                Reject
              
            

            
              {/* Animated background on hover */}
              
              
              
                
                Accept
              
            
          
        )}
      
    
  );
}

export function WholeResumeSuggestion({ onReject }, setStatus] = useState('pending');

  const handleAccept = () => {
    setStatus('accepted');
    // No need to do anything;

  const handleReject = () => {
    setStatus('rejected');
    onReject();
  };

  const statusStyles = {
    pending: {
      card: "bg-gradient-to-br from-white/95 via-purple-50/30 to-indigo-50/40 border-white/60",
      icon: "from-purple-100/90 to-indigo-100/90",
      iconColor: "text-purple-600",
      label: "text-gray-900",
      text: "Modified Resume"
    },
    accepted: {
      card: "bg-gradient-to-br from-emerald-200/95 via-emerald-200/90 to-green-200/95 border-emerald-200/60",
      icon: "from-emerald-100/90 to-green-100/90",
      iconColor: "text-emerald-600",
      label: "text-emerald-600",
      text: "Changes Accepted"
    },
    rejected: {
      card: "bg-gradient-to-br from-rose-200/95 via-rose-200/90 to-red-200/95 border-rose-200/60",
      icon: "from-rose-100/90 to-red-100/90",
      iconColor: "text-rose-600",
      label: "text-rose-600",
      text: "Changes Rejected"
    }
  }[status];

  return (
    
      
        
          
        
        
          {statusStyles.text}
        
      

      {status === 'pending' && (
        
          
            
            
            
              
              Undo Changes
            
          

          
            
            
            
              
              Keep Changes
            
          
        
      )}
    
  );
}
