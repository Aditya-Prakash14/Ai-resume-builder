'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityForm } from "./security-form"
import { ApiKeysForm } from "./api-keys-form"

import { DangerZone } from "./danger-zone"
import { User } from "@supabase/supabase-js"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

const sections = [
  { id: "security", title: "Security", description: "Manage your email and password settings", icon: "🔒" },
  { id: "api-keys", title: "API Keys", description: "Manage your API keys for different AI providers", icon: "🔑" },
  { id: "danger-zone", title: "Danger Zone", description: "Irreversible and destructive actions", icon: "⚠️" },
]



export function SettingsContent({ user, isProPlan }, setActiveSection] = useState("security")

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }))

      const currentSection = sectionElements.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top  100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive) => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top,
        behavior: "smooth"
      })
    }
  }

  return (
    
      {/* Table of Contents */}
      
        
          On this page
          
            {sections.map((section) => (
               scrollToSection(section.id)}
              >
                {section.icon}
                {section.title}
                {activeSection === section.id && (
                  
                )}
              
            ))}
          
        
      

      {/* Content */}
      
        {/* Security Settings */}
        
          
            Security
            Manage your email and password settings
          
          
            
          
        



        {/* API Keys */}
        
          
            API Keys
            Manage your API keys for different AI providers
          
          
            
          
        

        {/* Danger Zone */}
        
          
            Danger Zone
            Irreversible and destructive actions
          
          
            
          
        
      
    
  )
}