'use client';

import { Resume } from "@/lib/types";
import { Document'@react-pdf/renderer';
import { memo, useMemo, useCallback } from 'react';
;

// Base styles that don't depend on resume settings
const baseStyles = {
  link: {
    color: '#2563eb',
    textDecoration: 'none',
  },
  bulletSeparator: {
    color: '#4b5563',
    marginHorizontal: 2,
  },
  bulletDot: {
    width: 8,
    marginRight: 4,
  },
};

// Create a cache outside of components to persist between renders
const textProcessingCache = new Map();

// Memoized text processing function
function useTextProcessor() {
  const processText = useCallback((text, ignoreMarkdown = false) => {
    // Check cache first
    const cacheKey = `${text}-${ignoreMarkdown}`;
    if (textProcessingCache.has(cacheKey)) {
      return textProcessingCache.get(cacheKey);
    }

    // If ignoring markdown, extract content between asterisks or return plain text
    if (ignoreMarkdown) {
      const content = text.match(/\*\*(.*?)\*\*/)?.[1] || text;
      const processed = [{content}];
      textProcessingCache.set(cacheKey, processed);
      return processed;
    }

    // Process text if not in cache
    const parts = text.split(/(\*\*.*?\*\*)/g);
    const processed = parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return {part.slice(2, -2)};
      }
      return {part};
    });

    // Store in cache
    textProcessingCache.set(cacheKey, processed);
    return processed;
  }, []);

  return processText;
}

// Memoized section components
const HeaderSection = memo(function HeaderSection({
  resume,
  styles
}: {
  resume;
  styles;
}) {
  return (
    
      {resume.first_name} {resume.last_name}
      
        {resume.location && (
          
            {resume.location}
            {(resume.email || resume.phone_number || resume.website || resume.linkedin_url || resume.github_url) && (
              •
            )}
          
        )}
        {resume.email && (
          
            {resume.email}
            {(resume.phone_number || resume.website || resume.linkedin_url || resume.github_url) && (
              •
            )}
          
        )}
        {resume.phone_number && (
          
            {resume.phone_number}
            {(resume.website || resume.linkedin_url || resume.github_url) && (
              •
            )}
          
        )}
        {resume.website && (
          
            
              {resume.website}
            
            {(resume.linkedin_url || resume.github_url) && (
              •
            )}
          
        )}
        {resume.linkedin_url && (
          
            
              {resume.linkedin_url}
            
            {resume.github_url && •}
          
        )}
        {resume.github_url && (
          
            {resume.github_url}
          
        )}
      
    
  );
});

const SkillsSection = memo(function SkillsSection({
  skills,
  styles
}: {
  skills: Resume['skills'];
  styles;
}) {
  if (!skills?.length) return null;

  return (
    
      Skills
      
        {skills.map((skillCategory, index) => (
          
            {skillCategory.category}:
            {skillCategory.items.join(', ')}
          
        ))}
      
    
  );
});

const ExperienceSection = memo(function ExperienceSection({
  experiences,
  styles
}: {
  experiences: Resume['work_experience'];
  styles;
}) {
  const processText = useTextProcessor();
  if (!experiences?.length) return null;

  return (
    
      Experience
      {experiences.map((experience, index) => (
        
          
            
              {processText(experience.position, true)}
              {processText(experience.company, true)}
            
            {experience.date}
          
          {experience.description.map((bullet, bulletIndex) => (
            
              •
              
                
                  {processText(bullet)}
                
              
            
          ))}
        
      ))}
    
  );
});

const ProjectsSection = memo(function ProjectsSection({
  projects,
  styles
}: {
  projects: Resume['projects'];
  styles;
}) {
  const processText = useTextProcessor();
  if (!projects?.length) return null;

  return (
    
      Projects
      {projects.map((project, index) => (
        
          
            
              {processText(project.name, true)}
              
                {project.date && {project.date}}
                {(project.url || project.github_url) && (
                  
                    {project.url && (
                      
                        {project.url}
                      
                    )}
                    {project.url && project.github_url && ' | '}
                    {project.github_url && (
                      
                        {project.github_url}
                      
                    )}
                  
                )}
              
            
            {project.technologies && (
              
                {project.technologies.map(tech => tech.replace(/\*\*/g, '')).join(', ')}
              
            )}
          

          {project.description.map((bullet, bulletIndex) => (
            
              •
              
                
                  {processText(bullet)}
                
              
            
          ))}
        
      ))}
    
  );
});

const EducationSection = memo(function EducationSection({
  education,
  styles
}: {
  education: Resume['education'];
  styles;
}) {
  const processText = useTextProcessor();
  if (!education?.length) return null;

  return (
    
      Education
      {education.map((edu, index) => (
        
          
            
              {processText(edu.school, true)}
              {processText(`${edu.degree} ${edu.field}`)}
            
            {edu.date}
          
          {edu.achievements && edu.achievements.map((achievement, bulletIndex) => (
            
              •
              
                {processText(achievement)}
              
            
          ))}
        
      ))}
    
  );
});

// Style factory function
function createResumeStyles(settings: Resume['document_settings'] = {
  document_font_size: 10,
  document_line_height: 1.5,
  document_margin_vertical: 36,
  document_margin_horizontal: 36,
  header_name_size: 24,
  header_name_bottom_spacing: 24,
  skills_margin_top: 2,
  skills_margin_bottom: 2,
  skills_margin_horizontal: 0,
  skills_item_spacing: 2,
  experience_margin_top: 2,
  experience_margin_bottom: 2,
  experience_margin_horizontal: 0,
  experience_item_spacing: 4,
  projects_margin_top: 2,
  projects_margin_bottom: 2,
  projects_margin_horizontal: 0,
  projects_item_spacing: 4,
  education_margin_top: 2,
  education_margin_bottom: 2,
  education_margin_horizontal: 0,
  education_item_spacing: 4,
  footer_width: 80,
}) {
  const {
    document_font_size = 10,
    document_line_height = 1.5,
    document_margin_vertical = 36,
    document_margin_horizontal = 36,
    header_name_size = 24,
    header_name_bottom_spacing = 24,
    skills_margin_top = 2,
    skills_margin_bottom = 2,
    skills_margin_horizontal = 0,
    skills_item_spacing = 2,
    experience_margin_top = 2,
    experience_margin_bottom = 2,
    experience_margin_horizontal = 0,
    experience_item_spacing = 4,
    projects_margin_top = 2,
    projects_margin_bottom = 2,
    projects_margin_horizontal = 0,
    projects_item_spacing = 4,
    education_margin_top = 2,
    education_margin_bottom = 2,
    education_margin_horizontal = 0,
    education_item_spacing = 4,
    footer_width = 95,
  } = settings;

  return StyleSheet.create({
    ...baseStyles,
    // Base page configuration
    page: {
      paddingTop: document_margin_vertical,
      paddingBottom: document_margin_vertical + 28,
      paddingLeft: document_margin_horizontal,
      paddingRight: document_margin_horizontal,
      fontFamily: 'Helvetica',
      color: '#111827',
      fontSize: document_font_size,
      lineHeight: document_line_height,
      position: 'relative',
      // backgroundColor: '#32a852',  // Bright green color that should be very visible for testing
    },
    header: {
      alignItems: 'center',
    },
    name: {
      fontSize: header_name_size,
      fontFamily: 'Helvetica-Bold',
      marginBottom: header_name_bottom_spacing,
      color: '#111827',
      textAlign: 'center',
    },
    contactInfo: {
      fontSize: document_font_size,
      color: '#374151',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: 4,
    },
    sectionTitle: {
      fontSize: document_font_size,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 4,
      color: '#111827',
      textTransform: 'uppercase',
      borderBottom: '0.5pt solid #e5e7eb',
      paddingBottom: 0,
    },
    // Skills section
    skillsSection: {
      marginTop: skills_margin_top,
      marginBottom: skills_margin_bottom,
      marginLeft: skills_margin_horizontal,
      marginRight: skills_margin_horizontal,
    },
    skillsGrid: {
      flexDirection: 'column',
      gap: skills_item_spacing,
    },
    skillCategory: {
      marginBottom: skills_item_spacing,
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
    },
    skillCategoryTitle: {
      fontSize: document_font_size,
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
      marginRight: 4,
      width: 'auto',
    },
    skillItem: {
      fontSize: document_font_size,
      color: '#374151',
      flexGrow: 1,
      flexBasis: 0,
      flexWrap: 'wrap',
    },
    // Experience section
    experienceSection: {
      marginTop: experience_margin_top,
      marginBottom: experience_margin_bottom,
      marginLeft: experience_margin_horizontal,
      marginRight: experience_margin_horizontal,
    },
    experienceItem: {
      marginBottom: experience_item_spacing,
    },
    experienceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    companyName: {
      fontSize: document_font_size,
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    jobTitle: {
      fontSize: document_font_size,
      color: '#111827',
    },
    dateRange: {
      fontSize: document_font_size,
      color: '#111827',
      textAlign: 'right',
    },
    bulletPoint: {
      fontSize: document_font_size,
      marginBottom: experience_item_spacing,
      color: '#111827',
      marginLeft: 8,
      paddingLeft: 8,
      flexDirection: 'row',
    },
    bulletText: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      display: 'flex',
    },
    bulletTextContent: {
      flex: 1,
    },
    // Projects section
    projectsSection: {
      marginTop: projects_margin_top,
      marginBottom: projects_margin_bottom,
      marginLeft: projects_margin_horizontal,
      marginRight: projects_margin_horizontal,
    },
    projectItem: {
      marginBottom: projects_item_spacing,
    },
    projectHeader: {
      flexDirection: 'column',
      marginBottom: 4,
    },
    projectHeaderTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    projectHeaderRight: {
      flexDirection: 'row',
      gap: 8,
    },
    projectTitle: {
      fontSize: document_font_size,
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    projectTechnologies: {
      fontSize: document_font_size,
      color: '#374151',
      fontFamily: 'Helvetica-Bold',
      marginBottom: 0,
    },
    projectDescription: {
      fontSize: document_font_size,
      color: '#111827',
    },
    projectLinks: {
      fontSize: document_font_size,
      color: '#374151',
      textAlign: 'right',
    },
    // Education section
    educationSection: {
      marginTop: education_margin_top,
      marginBottom: education_margin_bottom,
      marginLeft: education_margin_horizontal,
      marginRight: education_margin_horizontal,
    },
    educationItem: {
      marginBottom: education_item_spacing,
    },
    educationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 4,
    },
    schoolName: {
      fontSize: document_font_size,
      fontFamily: 'Helvetica-Bold',
      color: '#111827',
    },
    degree: {
      fontSize: document_font_size,
      color: '#111827',
    },
    footer: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerImage: {
      width: `${footer_width}%`,
      height: 'auto',
    },
  });
}



export const ResumePDFDocument = memo(function ResumePDFDocument({ resume }) {
  // Memoize styles based on document settings
  const styles = useMemo(() => createResumeStyles(resume.document_settings), [resume.document_settings]);

  return (
    
      
        
        
        
        
        

        {resume.document_settings?.show_ubc_footer && (
          
            {/* UBC Science Footer image */}
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            
          
        )}
      
    
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return (
    prevProps.resume === nextProps.resume &&
    prevProps.variant === nextProps.variant
  );
});