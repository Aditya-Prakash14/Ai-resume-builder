import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState, useCallback, useRef, useEffect } from "react";



export default function ChatInput({ 
    isLoading, 
    onSubmit,
    onStop,
  }, setInputValue] = useState("");
    const textareaRef = useRef(null);

    const adjustTextareaHeight = useCallback(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Calculate new height (capped at 6 lines ~ 144px)
      const newHeight = Math.min(textarea.scrollHeight, 144);
      textarea.style.height = `${newHeight}px`;
    }, []);

    // Adjust height whenever input value changes
    useEffect(() => {
      adjustTextareaHeight();
    }, [inputValue, adjustTextareaHeight]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        const cleanedMessage = inputValue.replace(/\n+$/, '').trim();
        onSubmit(cleanedMessage);
        setInputValue("");
      }
    }, [inputValue, onSubmit]);

    return (
      
         setInputValue(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              } else {
                // Ensure height is adjusted after Shift+Enter
                requestAnimationFrame(adjustTextareaHeight);
              }
            }
          }}
          placeholder="Ask me anything about your resume..."
          rows={1}
          className={cn(
            "flex-1",
            "bg-white/60",
            "border-purple-200/60",
            "focus:border-purple-300",
            "focus:ring-2 focus:ring-purple-500/10",
            "placeholder:text-purple-400",
            "text-sm",
            "min-h-[32px]",
            "max-h-[144px]", // Approximately 6 lines
            "resize-none",
            "overflow-y-auto",
            "px-2 py-1.5",
            "transition-height duration-200",
            "scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent"
          )}
        />
        
          {isLoading ? (
            
          ) ="h-3.5 w-3.5" />
          )}
        
      
    );
}