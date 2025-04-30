import { User } from "lucide-react";
import { cn } from "@/lib/utils";



export function ProfileCard({ title, description, className }) {
  const styles = {
    border: "border-teal-200/60",
    bg: "bg-gradient-to-br from-teal-50/80 via-cyan-50/80 to-teal-50/80",
    text: "from-teal-600 to-cyan-600",
    hover: "hover:bg-gradient-to-br hover:from-teal-100/80 hover:via-cyan-100/80 hover:to-teal-100/80",
  };

  return (
    
      {/* Animated background elements */}
      
      
      
        {/* Decorative circles */}
        
        

        {/* Icon container */}
        
          
        

        {/* Title */}
        
          {title}
        

        {/* Description */}
        
          {description}
        

        {/* Updated text section */}
        
          A central place for all your work experiences, projects, skills, and accomplishments
        
      
    
  );
} 