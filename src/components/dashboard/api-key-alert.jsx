'use client'

import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


function checkForApiKeys() {
  const storedKeys = localStorage.getItem('resumelm-api-keys')
  if (!storedKeys) return false

  try {
    const keys = JSON.parse(storedKeys)
    return Array.isArray(keys) && keys.length > 0
  } catch {
    return false
  }
}

export function ApiKeyAlert() {
  const [hasApiKeys, setHasApiKeys] = useState(true) // Start with true to prevent flash

  useEffect(() => {
    setHasApiKeys(checkForApiKeys())

    // Listen for storage changes
    const handleStorageChange = () => {
      setHasApiKeys(checkForApiKeys())
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  if (hasApiKeys) return null

  return (
    
      
      
        
          
            
              No API keys configured. You need API Keys to use the AI Features.
            
            
              
                Get your Anthropic API key (Recommended) →
              
              
                Get your OpenAI API key →
              
            
          
          
            
              Set your API Keys
            
          
        


      
    
  )
}