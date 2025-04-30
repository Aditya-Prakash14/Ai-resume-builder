'use client';

import { cn } from "@/lib/utils";



export function GradientHover({
  children,
  className,
  from = "violet-600",
  via = "blue-600",
  to = "violet-600",
  hoverFrom = "blue-600",
  hoverVia = "violet-600",
  hoverTo = "blue-600",
}) {
  return (
    
      {children}
    
  );
} 