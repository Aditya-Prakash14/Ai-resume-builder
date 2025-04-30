import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentSettings } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Check, Save, Trash2, Plus } from "lucide-react";





export function SavedStylesDialog({ currentSettings, onApplyStyle }, setIsOpen] = useState(false);
  const [savedStyles, setSavedStyles] = useState([]);
  const [newStyleName, setNewStyleName] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Load saved styles from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resumelm-saved-styles");
    if (saved) {
      setSavedStyles(JSON.parse(saved));
    }
  }, []);

  // Save current settings with name
  const handleSaveStyle = () => {
    if (!newStyleName.trim()) return;

    const newStyle= {
      name,
      settings,
      timestamp: Date.now(),
    };

    const updatedStyles = [...savedStyles, newStyle];
    setSavedStyles(updatedStyles);
    localStorage.setItem("resumelm-saved-styles", JSON.stringify(updatedStyles));
    setNewStyleName("");
    setIsAddingNew(false);
  };

  // Delete a saved style
  const handleDeleteStyle = (timestamp) => {
    const updatedStyles = savedStyles.filter((style) => style.timestamp !== timestamp);
    setSavedStyles(updatedStyles);
    localStorage.setItem("resumelm-saved-styles", JSON.stringify(updatedStyles));
  };

  // Apply a saved style
  const handleApplyStyle = (settings) => {
    onApplyStyle(settings);
    setIsOpen(false);
  };

  return (
    
      
        
          
          Saved Styles
        
      
      
        
          
            
              Saved Document Styles
            
             setIsAddingNew(true)}
              className="text-xs bg-gradient-to-r hover:from-teal-500/10 hover:to-cyan-500/10 
                border-teal-600/40 hover:border-teal-600 text-teal-700 hover:text-teal-800
                transition-all duration-500 hover:-translate-y-[1px]"
            >
              
              Save Current
            
          
          
            Save current document settings or apply saved styles to your resume.
          
        
        
          {isAddingNew && (
            
               setNewStyleName(e.target.value)}
                className="flex-1 border-teal-200/40 focus:border-teal-400 bg-white/80"
                autoFocus
              />
              
                Save Style
              
               {
                  setIsAddingNew(false);
                  setNewStyleName("");
                }}
                className="text-slate-600 hover:text-slate-800"
              >
                Cancel
              
            
          )}
          
            Saved Styles
            
              
                {savedStyles.length === 0 ? (
                  
                    
                    No saved styles yet
                  
                ) : (
                  savedStyles.map((style) => (
                    
                      {style.name}
                      
                         handleApplyStyle(style.settings)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                            text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                          title="Apply Style"
                        >
                          
                        
                         handleDeleteStyle(style.timestamp)}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 
                            text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete Style"
                        >
                          
                        
                      
                    
                  ))
                )}
              
            
          
        
        
           setIsOpen(false)}
            className="border-teal-200/40 hover:border-teal-400 text-teal-700 
              hover:text-teal-800 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
              transition-all duration-500 hover:-translate-y-[1px]"
          >
            Close
          
        
      
    
  );
} 