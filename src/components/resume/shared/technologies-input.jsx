'use client';

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



export function TechnologiesInput({
  value,
  onChange,
  label = "Technologies & Tools Used",
  placeholder = "React, TypeScript, Node.js, etc."
}) {
  return (
    
      
        {label}
        Separate with commas
      
       onChange(
          e.target.value.split(',').map(t => t.trim()).filter(Boolean)
        )}
        placeholder={placeholder}
        className={cn(
          "bg-white/50 border-gray-200 rounded-lg",
          "focus:border-cyan-500/40 focus:ring-2 focus:ring-cyan-500/20",
          "hover:border-cyan-500/30 hover:bg-white/60 transition-colors",
          "placeholder:text-gray-400"
        )}
      />
    
  );
} 