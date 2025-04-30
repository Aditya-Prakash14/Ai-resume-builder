import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";



export function JobDescriptionInput({ value, onChange, isInvalid }) {
  return (
    
      
        Job Description *
      
       onChange(e.target.value)}
        className={cn(
          "w-full min-h-[120px] rounded-md bg-white/80 border-gray-200 text-base",
          "focus:border-pink-500 focus:ring-pink-500/20 placeholder:text-gray-400",
          "resize-y p-4",
          isInvalid && "border-red-500 shake"
        )}
        required
      />
    
  );
} 