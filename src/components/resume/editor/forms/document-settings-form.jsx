import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DocumentSettings } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch";
import { SavedStylesDialog } from "./saved-styles-dialog";
import { LayoutTemplate } from "lucide-react";





function NumberInput({ value, onChange, min, max, step }) {
  const increment = () => {
    const newValue = Math.min(max, value + step)
    onChange(Number(newValue.toFixed(2)))
  }

  const decrement = () => {
    const newValue = Math.max(min, value - step)
    onChange(Number(newValue.toFixed(2)))
  }

  const displayValue = Number(value.toFixed(2))

  return (
    
      {displayValue}
      
        
          
        
        
          
        
      
    
  )
}

export function DocumentSettingsForm({ documentSettings, onChange }) {

  const defaultSettings = {
    // Global Settings
    document_font_size: 10,
    document_line_height: 1.5,
    document_margin_vertical: 36,
    document_margin_horizontal: 36,

    // Header Settings
    header_name_size: 24,
    header_name_bottom_spacing: 24,

    // Skills Section
    skills_margin_top: 2,
    skills_margin_bottom: 2,
    skills_margin_horizontal: 0,
    skills_item_spacing: 2,

    // Experience Section
    experience_margin_top: 2,
    experience_margin_bottom: 2,
    experience_margin_horizontal: 0,
    experience_item_spacing: 4,

    // Projects Section
    projects_margin_top: 2,
    projects_margin_bottom: 2,
    projects_margin_horizontal: 0,
    projects_item_spacing: 4,

    // Education Section
    education_margin_top: 2,
    education_margin_bottom: 2,
    education_margin_horizontal: 0,
    education_item_spacing: 4,
  };

  // Initialize document_settings if it doesn't exist
  if (!documentSettings) {
    onChange('document_settings', defaultSettings);
    return null; // Return null while initializing to prevent errors
  }

  const handleSettingsChange = (newSettings) => {

    onChange('document_settings', newSettings);
  };

  const handleFontSizeChange = (value) => {
    const newSettings= {
      ...documentSettings, // Don't spread defaultSettings here
      document_font_size;
    handleSettingsChange(newSettings);
  };



  const SectionSettings = ({ title, section }: { title; section: 'skills' | 'experience' | 'projects' | 'education' }) => (
    
      
        
          Space Above {title} Section
          
             
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_top`])
              }
            />
            pt
          
        
         
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_top`])
          }
        />
      

      
        
          Space Below {title} Section
          
             
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_bottom`])
              }
            />
            pt
          
        
         
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_bottom`])
          }
        />
      

      
        
          Horizontal Margins
          
             
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_margin_horizontal`])
              }
            />
            pt
          
        
         
            handleSettingsChange({
              ...documentSettings,
              [`${section}_margin_horizontal`])
          }
        />
      

      
        
          Space Between Items
          
             
                handleSettingsChange({
                  ...documentSettings,
                  [`${section}_item_spacing`])
              }
            />
            pt
          
        
         
            handleSettingsChange({
              ...documentSettings,
              [`${section}_item_spacing`])
          }
        />
      
    
  );

  return (
    
        

        {/* Buttons */}
        
          
             handleSettingsChange(settings)}
            />
          
          
          
             handleSettingsChange({...defaultSettings})}
              className="relative h-60 group p-0 overflow-hidden border-slate-200 hover:border-teal-600/40 transition-colors"
            >
              
              
                
                  
                  Default Layout
                
                
                  {/* Mock resume content - Default */}
                  
                    
                    
                      
                      
                    
                  
                  
                  
                    
                      
                      
                        
                        
                        
                      
                    
                    
                    
                      
                      
                        
                        
                        
                      
                    
                    
                    
                      
                      
                        
                        
                        
                      
                    
                  
                
              
            

             handleSettingsChange({
                ...documentSettings,
                footer_width: 0,
                show_ubc_footer,
                header_name_size: 24,
                skills_margin_top: 0,
                document_font_size: 10,
                projects_margin_top: 0,
                skills_item_spacing: 0,
                document_line_height: 1.2,
                education_margin_top: 0,
                skills_margin_bottom: 2,
                experience_margin_top: 2,
                projects_item_spacing: 0,
                education_item_spacing: 0,
                projects_margin_bottom: 0,
                education_margin_bottom: 0,
                experience_item_spacing: 1,
                document_margin_vertical: 20,
                experience_margin_bottom: 0,
                skills_margin_horizontal: 0,
                document_margin_horizontal: 28,
                header_name_bottom_spacing: 16,
                projects_margin_horizontal: 0,
                education_margin_horizontal: 0,
                experience_margin_horizontal: 0
              })}
              className="relative h-60 group p-0 overflow-hidden border-slate-200 hover:border-pink-600/40 transition-colors"
            >
              
              
                
                  
                  Compact Layout
                
                
                  {/* Mock resume content - Compact */}
                  
                    
                    
                      
                      
                      
                    
                  
                  
                  
                    
                      
                      
                        
                        
                        
                      
                    
                    
                    
                      
                      
                        
                        
                        
                        
                      
                    
                    
                    
                      
                      
                        
                        
                        
                      
                    
                    
                    
                      
                      
                        
                        
                        
                      
                    
                  
                
              
            
          
        
        
          
            
              
                Footer Options
              
              
            

            
              
                
                  Show UBC Science Co-op Footer
                
                
                    handleSettingsChange({
                      ...documentSettings,
                      show_ubc_footer)
                  }
                />
              
              
                By enabling this footer, I confirm that I am a UBC Faculty of Science Co-op student and acknowledge that I am responsible for ensuring appropriate use of UBC branding in my resume.
              
              
              {/* Footer Width Control - Only shown when footer is enabled */}
              {documentSettings?.show_ubc_footer && (
                
                  
                    Footer Width
                    
                       
                          handleSettingsChange({
                            ...documentSettings,
                            footer_width)
                        }
                      />
                      %
                    
                  
                   
                      handleSettingsChange({
                        ...documentSettings,
                        footer_width)
                    }
                  />
                  
                    Narrow
                    Full Width
                  
                
              )}
            
          

          {/* Global Document Settings */}
          
            
              Document
              
            

            
              
                
                  Font Size
                  
                    
                    pt
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      document_font_size)
                  }
                />
              

              
                
                  Line Height
                  
                     
                        handleSettingsChange({
                          ...documentSettings,
                          document_line_height)
                      }
                    />
                    x
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      document_line_height)
                  }
                />
              

              
                
                  Vertical Margins
                  
                     
                        handleSettingsChange({
                          ...documentSettings,
                          document_margin_vertical)
                      }
                    />
                    pt
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      document_margin_vertical)
                  }
                />
              

              
                
                  Horizontal Margins
                  
                     
                        handleSettingsChange({
                          ...documentSettings,
                          document_margin_horizontal)
                      }
                    />
                    pt
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      document_margin_horizontal)
                  }
                />
              
            
          

          {/* Header Settings */}
          
            
              Header
              
            

            
              
                
                  Name Size
                  
                     
                        handleSettingsChange({
                          ...documentSettings,
                          header_name_size)
                      }
                    />
                    pt
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      header_name_size)
                  }
                />
              

              
                
                  Space Below Name
                  
                     
                        handleSettingsChange({
                          ...documentSettings,
                          header_name_bottom_spacing)
                      }
                    />
                    pt
                  
                
                 
                    handleSettingsChange({
                      ...documentSettings,
                      header_name_bottom_spacing)
                  }
                />
                
                  Compact
                  Spacious
                
              
            
          

          {/* Skills Section */}
          
            
              Skills
              
            
            
          

          {/* Experience Section */}
          
            
              Experience
              
            
            
          

          {/* Projects Section */}
          
            
              Projects
              
            
            
          

          {/* Education Section */}
          
            
              Education
              
            
            
          
        
      
    
  );
} 