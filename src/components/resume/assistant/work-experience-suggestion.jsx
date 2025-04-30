'use client';

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { WorkExperience } from "@/lib/types";
import { useState } from 'react';

const DIFF_HIGHLIGHT_CLASSES = "bg-green-300 px-1 rounded-sm";



function getHighlightClass(currentValue, newValue, fieldValue){
  return JSON.stringify(currentValue) !== JSON.stringify(newValue) && fieldValue === newValue 
    ? DIFF_HIGHLIGHT_CLASSES 
    : '';
}

export function WorkExperienceSuggestion({ 
  currentWork,
  modifiedField,
  newValue
}) {
  const [isExpanded] = useState(true);
  
  // Merge the modification with original work experience
  const suggestedWork = {
    ...currentWork,
    [modifiedField];

  // Safe description comparison
  const descriptionComparison = (current= [], suggested= []) => {
    // Handle undefined/null cases and ensure arrays
    const safeCurrent = Array.isArray(current) ? current ;
    const safeSuggested = Array.isArray(suggested) ? suggested ;
    
    return safeSuggested.map((point = '', index) => { // Add default for point
      const currentPoint = safeCurrent[index] || '';
      const isNew = point !== currentPoint;
      
      return isNew 
        ? `${point}` 
        ;
    });
  };

  const highlightedDescription = modifiedField === 'description'
    ? descriptionComparison(
        currentWork?.description ?? [],
        (newValue// Type assertion since we know modifiedField='description'
      )
    : currentWork.description ?? [];

  return (
    
      
        {/* Header */}
        
          
            
              {suggestedWork.position}
            
            
              {suggestedWork.company}
            
          
          
            {suggestedWork.date}
          
        

        {/* Location */}
        {suggestedWork.location && (
          
            {suggestedWork.location}
          
        )}

        {/* Description */}
        {isExpanded && highlightedDescription && (
          
            {highlightedDescription.map((point, index) => (
              
                •
                
              
            ))}
          
        )}
      
    
  );
}
