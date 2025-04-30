import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bot, Star, Briefcase, FileSearch } from "lucide-react";



const suggestions = [
  {
    text: "Rate my Resume out of 10",
    icon,
  {
    text: "Improve the work experience section",
    icon,
  {
    text: "Critique my resume",
    icon,
];

export function QuickSuggestions({ onSuggestionClick }) {
  return (
    
      
        
        
          Try one of these
        
      

      
        {suggestions.map((suggestion) => {
          const Icon = suggestion.icon;
          return (
             onSuggestionClick(suggestion.text)}
              className={cn(
                "h-9 px-3",
                "bg-white/40",
                "text-purple-700 text-sm",
                "border border-purple-100",
                "hover:bg-purple-50/60 hover:border-purple-200",
                "transition-colors"
              )}
            >
              
              {suggestion.text}
            
          );
        })}
      
    
  );
} 