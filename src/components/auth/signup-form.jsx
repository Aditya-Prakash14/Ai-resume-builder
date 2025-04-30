'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/app/auth/login/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "./auth-context";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    
      {pending ? (
        
          
          Creating Account...
        
      ) : (
        "Create Account"
      )}
    
  );
}



export function SignupForm() {
  const [formState, setFormState] = useState({});
  const { 
    formData, 
    setFormData, 
    setFieldLoading, 
    validations, 
    validateField,
    touchedFields,
    setFieldTouched 
  } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState({});

    // Mark all fields= ['email', 'password', 'name', 'confirmPassword'];
    fields.forEach(field => setFieldTouched(field));

    // Validate all fields
    Object.entries(formData).forEach(([field, value]) => {
      validateField(field;
    });

    // Check if all required fields are valid
    const isValid = fields.every(field => validations[field]?.isValid);

    if (!isValid) {
      setFormState({ error: "Please fix the validation errors before submitting" });
      return;
    }

    try {
      setFieldLoading('submit', true);
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('name', formData.name || '');
      
      const result = await signup(formDataToSend);
      if (!result.success) {
        setFormState({ error: result.error || "Failed to create account" });
        return;
      }

      setFormState({ success);
    } catch (error) {
      console.error("Signup error:", error);
      setFormState({ error: "An unexpected error occurred" });
    } finally {
      setFieldLoading('submit', false);
    }
  }

  const handleInputChange = (field, value) => {
    setFormData({ [field]);
    validateField(field, value);
    setFieldLoading(field, true);
    const timer = setTimeout(() => {
      setFieldLoading(field, false);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    
      {formState.success ? (
        
          
          
            Account created successfully! Please check your email to confirm your account.
          
        
      ) ={handleSubmit} className="space-y-6">
          {formState.error && (
            
              {formState.error}
            
          )}

          
            Full Name
            
              {/*  */}
               handleInputChange('name', e.target.value)}
                onBlur={() => setFieldTouched('name')}
                placeholder="John Doe"
                required
                minLength={2}
                maxLength={50}
                // className="pl-10"
                validation={validations.name}
                isTouched={touchedFields.name}
                autoFocus
              />
            
          

          
            Email
            
              {/*  */}
               handleInputChange('email', e.target.value)}
                onBlur={() => setFieldTouched('email')}
                placeholder="you@example.com"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                // className="pl-10"
                validation={validations.email}
                isTouched={touchedFields.email}
              />
            
          

          
            Password
            
              {/*  */}
               handleInputChange('password', e.target.value)}
                onBlur={() => setFieldTouched('password')}
                placeholder="••••••••"
                required
                minLength={6}
                maxLength={100}
                // className="pl-10"
                validation={validations.password}
                isTouched={touchedFields.password}
              />
            
          

          
            Confirm Password
            
              {/*  */}
               handleInputChange('confirmPassword', e.target.value)}
                onBlur={() => setFieldTouched('confirmPassword')}
                placeholder="••••••••"
                required
                minLength={6}
                maxLength={100}
                // className="pl-10"
                validation={validations.confirmPassword}
                isTouched={touchedFields.confirmPassword}
              />
            
          

          
        
      )}
    
  );
} 