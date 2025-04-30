"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/app/auth/login/actions";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "./auth-context";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    
      {pending ? (
        
          
          Signing in...
        
      ) : (
        "Sign In"
      )}
    
  );
}

export function LoginForm() {
  const [error, setError] = useState();
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
    setError(undefined);

    // Mark all fields= ['email', 'password'];
    fields.forEach(field => setFieldTouched(field));

    // Validate all fields
    Object.entries(formData).forEach(([field, value]) => {
      validateField(field;
    });

    // Check if all required fields are valid
    const isValid = fields.every(field => validations[field]?.isValid);

    if (!isValid) {
      setError("Please fix the validation errors before submitting");
      return;
    }

    try {
      setFieldLoading('submit', true);
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      
      const result = await login(formDataToSend);
      if (!result.success) {
        setError("Invalid credentials. If you just signed up, please check your email for a verification link.");
      }
    } catch (error) {
      setError("An error occurred during login");
      console.error("Login error:", error);
    } finally {
      setFieldLoading('submit', false);
    }
  }

  const handleInputChange = (field: 'email' | 'password', value) => {
    setFormData({ [field]);
    validateField(field, value);
    // Simulate field validation loading state
    setFieldLoading(field, true);
    const timer = setTimeout(() => {
      setFieldLoading(field, false);
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    
      
        Email
        
          {/*  */}
           handleInputChange('email', e.target.value)}
            onBlur={() => setFieldTouched('email')}
            placeholder="you@example.com"
            required
            // className="pl-10"
            validation={validations.email}
            isTouched={touchedFields.email}
            autoComplete="username"
          />
        
      
      
        
          Password
          
            Forgot password?
          
        
        
          {/*  */}
           handleInputChange('password', e.target.value)}
            onBlur={() => setFieldTouched('password')}
            placeholder="••••••••"
            required
            minLength={6}
            // className="pl-10"
            validation={validations.password}
            isTouched={touchedFields.password}
            autoComplete="current-password"
          />
        
      
      {error && (
        
          {error}
        
      )}
      
    
  );
} 