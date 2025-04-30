import dynamic from 'next/dynamic';
import React from 'react';
;
import { LoadingFallback } from './shared/LoadingFallback';
;

;
  targetRole?;
}

;
}

;
}



;
}

export const WorkExperienceForm = dynamic(
  () => import('./forms/work-experience-form').then(mod => ({ default: mod.WorkExperienceForm }))=> ,
    ssr);

export const EducationForm = dynamic(
  () => import('./forms/education-form').then(mod => ({ default: mod.EducationForm }))=> ,
    ssr);

export const SkillsForm = dynamic(
  () => import('./forms/skills-form').then(mod => ({ default: mod.SkillsForm }))=> ,
    ssr);

export const ProjectsForm = dynamic(
  () => import('./forms/projects-form').then(mod => ({ default: mod.ProjectsForm }))=> ,
    ssr);


export const DocumentSettingsForm = dynamic(
  () => import('./forms/document-settings-form').then(mod => ({ 
    default: mod.DocumentSettingsForm 
  }))=> ,
    ssr);