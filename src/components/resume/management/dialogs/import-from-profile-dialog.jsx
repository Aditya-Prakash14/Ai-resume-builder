'use client';

import { WorkExperience, Project, Profile, Education, Skill } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Import } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";





export function ImportFromProfileDialog({ 
  profile, 
  onImport, 
  type,
  buttonClassName 
}, setSelectedItems] = useState([]);
  const [open, setOpen] = useState(false);

  const items = 

  const title = 

  const handleImport = () => {
    const itemsToImport = items.filter((item) => {
      const id = getItemId(item);
      return selectedItems.includes(id);
    });
    
    onImport(itemsToImport);
    setOpen(false);
    setSelectedItems([]);
  };

  const getItemId = (item)=> {
    if (
      return `${exp.company}-${exp.position}-${exp.date}`;
    } else if (
    } else if (
      return `${edu.school}-${edu.degree}-${edu.field}`;
    } else {
      return (item.category;
    }
  };

  const getItemTitle = (item)=> {
    if (
    } else if (
    } else if (
      return `${edu.degree} in ${edu.field}`;
    } else {
      return (item.category;
    }
  };

  const getItemSubtitle = (item)=> {
    if (
    } else if (
    } else if (
    } else {
      return null;
    }
  };

  const getItemDate = (item)=> {
    if (
      return exp.date;
    } else if (
      return proj.date || '';
    } else if (
      return edu.date;
    }
    return '';
  };

  return (
    
      
        
          
          Import from Profile
        
      
      
        
          Import {title}
          
            Select the {title.toLowerCase()} you want to import from your profile
          
        
        
          
            {items.map((item) => {
              const id = getItemId(item);
              return (
                
                   {
                      setSelectedItems(prev =>
                        checked
                          ? [...prev, id]
                          : prev.filter(x => x !== id)
                      );
                    }}
                    className="mt-1"
                  />
                  
                    
                      {getItemTitle(item)}
                      {getItemSubtitle(item) && (
                        {getItemSubtitle(item)}
                      )}
                      {getItemDate(item) && (
                        
                          {getItemDate(item)}
                        
                      )}
                      {
            })}
          
        
        
           setOpen(false)}
            className="border-gray-200"
          >
            Cancel
          
          
            Import Selected
          
        
      
    
  );
} 