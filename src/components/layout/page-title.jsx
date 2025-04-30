"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function getPageTitle(pathname){
  // Remove leading and trailing slashes and split into segments
  const segments = pathname.split("/").filter(Boolean);
  
  // Handle root path
  if (segments.length === 0) return "Dashboard";
  
  // Remove route groups (segments in parentheses)
  const cleanSegments = segments.filter(segment => !segment.startsWith("(") && !segment.endsWith(")"));
  
  if (cleanSegments.length === 0) return "Dashboard";
  
  // Get the last meaningful segment
  const lastSegment = cleanSegments[cleanSegments.length - 1];
  const parentSegment = cleanSegments[cleanSegments.length - 2];
  
  // Special cases first
  if (parentSegment === "resumes" && lastSegment !== "resumes") {
    return "custom"; // Return special value to indicate we should look for custom title
  }
  
  switch (lastSegment) {
    case "profile": return "My Profile";
    case "resumes": return "My Resumes";
    case "settings": return "Settings";
    default:
      // Format the segment (capitalize first letter, replace hyphens with spaces)
      return lastSegment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }
}

const MAX_TITLE_LENGTH = 50;


const truncateText = (text) => {
  if (text.length  truncateText(getPageTitle(pathname)));
  const [resumeType, setResumeType] = useState(null);

  useEffect(() => {
    const baseTitle = getPageTitle(pathname);
    if (baseTitle === "custom") {
      // Look for the data attributes in the main content
      const element = document.querySelector("[data-page-title]");
      const pageTitle = element?.getAttribute("data-page-title");
      const 
      
      setTitle(truncateText(pageTitle || "Resume Editor"));
      setResumeType(type);
    } else {
      setTitle(truncateText(baseTitle));
      setResumeType(null);
    }
  }, [pathname]);


  return (
    
      
        
          {title}
        
      
      {resumeType && (
        
          {resumeType}
        
      )}
    
  );
} 