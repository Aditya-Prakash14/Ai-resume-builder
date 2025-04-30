

import { cn } from "@/lib/utils";



export function MiniResumePreview({
  name,
  type,
  createdAt,
  className
}) {

  function formatDate(dateString?) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  }

  const accentBorder = 
  const accentBg = 
  const accentText = 
  const glowColor = 

  return (
    
      {/* Paper texture */}
      
      
      {/* Content Container */}
      
        {/* Header Section */}
        
          
            {name}
          
          
            {
} 