'use client';

import { Profile, Resume } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Globe, Linkedin, Github, User, UserCircle2, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeContext } from '../resume-editor-context';
import { memo, useCallback } from 'react';



function areBasicInfoPropsEqual(
  prevProps,
  nextProps) {
  return prevProps.profile.id === nextProps.profile.id;
}

// Create memoized field component
const BasicInfoField = memo(function BasicInfoField({ 
  field, 
  value, 
  label, 
  icon,
  
  value;
  label;
  icon;
  placeholder;
  type?;
}) {
  const { dispatch } = useResumeContext();
  
  const handleChange = useCallback((e: React.ChangeEvent) => {
    dispatch({ type: 'UPDATE_FIELD', field, value: e.target.value });
  }, [dispatch, field]);

  return (
    
      
        
          
        
      
      
      
        {label}
      
    
  );
});

export const BasicInfoForm = memo(function BasicInfoFormComponent({
  profile
}, dispatch } = useResumeContext();
  const { resume } = state;

  const updateField = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const handleFillFromProfile = () => {
    if (!profile) return;
    
    // List of fields to copy from profile
    const fieldsToFill)[] = [
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'location',
      'website',
      'linkedin_url',
      'github_url'
    ];

    // Copy each field if it exists in the profile
    fieldsToFill.forEach((field) => {
      if (profile[field]) {
        updateField(field, profile[field];
      }
    });
  };

  return (
    
      
        
          {profile && (
            
              
                
                Fill from Profile
              
            
          )}

          
            {/* Name Row */}
            
              
              
            

            

            

            

            
              

              

              
            
          
        
      
    
  );
}, areBasicInfoPropsEqual); 