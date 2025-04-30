import *"react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

export ;
  showValidation?;
  isTouched?;
}

const Input = React.forwardRef(
  ({ className, type, validation, showValidation = true, isTouched = false, ...props }, ref) => {
    const isValid = validation?.isValid;
    const showStatus = showValidation && typeof isValid !== 'undefined' && isTouched;
    
    return (
      
        
        
        {/* Validation Icons */}
        {showStatus && (
          
            {isValid ? (
              
            ) ="w-5 h-5 text-red-500 transition-transform duration-200" />
            )}
          
        )}
        
        {/* Validation Message */}
        {showStatus && validation?.message && !isValid && (
          
            {validation.message}
          
        )}
      
    )
  }
)

Input.displayName = "Input"

export { Input }
