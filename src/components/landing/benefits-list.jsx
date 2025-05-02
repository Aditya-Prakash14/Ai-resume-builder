'use client';

import { CheckCircle2 } from "lucide-react";

const BENEFITS = [
  "Free and Open Source",
  "Comp Sci / AI & ML Focused",
  "Customizable Models and System Prompts"
];

export function BenefitsList() {
  return (
    
      {BENEFITS.map((benefit, i) => (
        
          
          {benefit}
        
      ))}
    
  );
} 
