'use client';

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";



export function UnsavedChangesDialog({
  isOpen,
  onOpenChange,
  onConfirm,
}) {
  return (
    
      
        
          Unsaved Changes
          
            You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
          
        
        
           onOpenChange(false)}>Cancel
          
            Leave Without Saving
          
        
      
    
  );
} 