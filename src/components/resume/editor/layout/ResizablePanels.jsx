import { cn } from "@/lib/utils";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ReactNode, useRef, useState, useEffect } from "react";



export function ResizablePanels({
  isBaseResume,
  editorPanel,
  previewPanel
}, setPreviewSize] = useState(60);
  const containerRef = useRef(null);
  const lastPercentageRef = useRef(60); // Store last percentage

  // Add function to calculate pixel width
  const updatePixelWidth = () => {
    const containerWidth = containerRef.current?.clientWidth || 0;
    const pixelWidth = Math.floor((containerWidth * lastPercentageRef.current) / 100);
    setPreviewSize(pixelWidth);
  };

  useEffect(() => {
    // Handle window resize
    const handleResize = () => updatePixelWidth();
    window.addEventListener('resize', handleResize);

    // Initial calculation
    updatePixelWidth();

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    
      
        {/* Editor Panel */}
        
          {editorPanel}
        

        {/* Resize Handle */}
        

        {/* Preview Panel */}
         {
            lastPercentageRef.current = size; // Store current percentage
            updatePixelWidth();
          }}
          className={cn(
            "shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] overflow-y-scroll",
            isBaseResume
              ? "shadow-purple-200/50"
              : "shadow-pink-200/50"
          )}
        >
          {previewPanel(previewSize)}
        
      
    
  );
}