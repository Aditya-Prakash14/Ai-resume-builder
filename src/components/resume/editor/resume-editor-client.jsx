'use client';

import React from 'react';
import { Resume, Profile, Job } from "@/lib/types";
import { useState, useEffect, useReducer } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { ResumeContext, resumeReducer } from './resume-editor-context';
import { createClient } from "@/utils/supabase/client";
import { EditorLayout } from "./layout/EditorLayout";
import { EditorPanel } from './panels/editor-panel';
import { PreviewPanel } from './panels/preview-panel';
import { UnsavedChangesDialog } from './dialogs/unsaved-changes-dialog';



export function ResumeEditorClient({
  initialResume,
  profile,
}) {
  const router = useRouter();
  const [state, dispatch] = useReducer(resumeReducer, {
    resume,
    isSaving,
    isDeleting,
    hasUnsavedChanges);

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const debouncedResume = useDebouncedValue(state.resume, 100);
  const [job, setJob] = useState(null);
  const [isLoadingJob, setIsLoadingJob] = useState(false);

  // Single job fetching effect
  useEffect(() => {
    async function fetchJob() {
      if (!state.resume.job_id) {
        setJob(null);
        return;
      }

      try {
        setIsLoadingJob(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', state.resume.job_id)
          .single();

        if (error) {
          void error
          setJob(null);
          return;
        }

        setJob(jobData);
      } catch {
        setJob(null);
      } finally {
        setIsLoadingJob(false);
      }
    }
    fetchJob();
  }, [state.resume.job_id]);

  const updateField = (field, value) => {
    
    if (field === 'document_settings') {
      // Ensure we're passing a valid DocumentSettings object
      if (typeof value === 'object' && value !== null) {
        dispatch({ type: 'UPDATE_FIELD', field, value });
      } else {
        console.error('Invalid document settings:', value);
      }
    } else {
      dispatch({ type: 'UPDATE_FIELD', field, value });
    }
  };

  // Track changes
  useEffect(() => {
    const hasChanges = JSON.stringify(state.resume) !== JSON.stringify(initialResume);
    dispatch({ type: 'SET_HAS_CHANGES', value);
  }, [state.resume, initialResume]);

  // Handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (state.hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.hasUnsavedChanges]);



  // Editor Panel
  const editorPanel = (
    
  );

  // Preview Panel
  const previewPanel = (width) => (
    
  );

  return (
    
      {/* Unsaved Changes Dialog */}
       {
          if (pendingNavigation) {
            router.push(pendingNavigation);
          }
          setShowExitDialog(false);
          setPendingNavigation(null);
        }}
      />

      {/* Editor Layout */}
      
    
  );
} 