'use client';

import { useRef } from "react";
import Link from "next/link";
import { Download, Code } from "lucide-react";
import { cn } from "@/lib/utils";
import { GradientHover } from "./gradient-hover";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";



export function Logo({ className, asLink = true }) {
  const logoRef = useRef(null);

  async function exportAsPNG() {
    try {
      // Create canvas with device pixel ratio for better quality
      const scale = window.devicePixelRatio || 1;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size (larger base size * device pixel ratio)
      canvas.width = 800 * scale;
      canvas.height = 200 * scale;

      // Scale context according to device pixel ratio
      ctx.scale(scale, scale);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 800, 0);
      gradient.addColorStop(0, '#7c3aed');
      gradient.addColorStop(1, '#4f46e5');

      // Set text properties with larger font size
      ctx.font = 'bold 128px Inter, system-ui, sans-serif';
      ctx.fillStyle = gradient;
      ctx.textBaseline = 'middle';

      // Draw text (centered)
      const text = 'AI Resume Builder';
      const textMetrics = ctx.measureText(text);
      const x = (800 - textMetrics.width) / 2;
      ctx.fillText(text, x, 100);

      // Export
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'ai-resume-builder-logo.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting logo:', error);
    }
  }

  function exportAsSVG() {
    try {
      const svgContent = `
        
          
            
              
              
            
          
          
            AI Resume Builder
          
        
      `;

      const blob = new Blob([svgContent], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'ai-resume-builder-logo.svg';
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting SVG:', error);
    }
  }

  const logoContent = (
    
      
        
          
            AI Resume Builder
          
        
      
      
        
          
          Save;

  if (asLink) {
    return (
      
        {logoContent}
      
    );
  }

  return logoContent;
}