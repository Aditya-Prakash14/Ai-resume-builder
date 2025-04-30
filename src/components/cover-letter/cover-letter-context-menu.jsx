'use client';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Download, Copy } from "lucide-react";



export function CoverLetterContextMenu({ 
  children,
  onDownloadPDF,
  onCopyToClipboard
}) {
  return (
    
      
        {children}
      
      
        
          
          Download;
} 