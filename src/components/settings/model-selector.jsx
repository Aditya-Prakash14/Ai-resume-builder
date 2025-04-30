'use client'

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { toast } from "sonner"
import { ServiceName } from "@/lib/types"
import Image from 'next/image'
import { getSubscriptionPlan } from "@/utils/actions/stripe/actions"


const MODEL_STORAGE_KEY = 'resumelm-default-model'
const LOCAL_STORAGE_KEY = 'resumelm-api-keys'





// Update image imports to use string paths
const MODEL_ICONS = {
  anthropic: '/claude.webp',
  openai: '/chatgpt.png',
  // deepseek: '/deepseek.png',
}// Add ModelIcon component at the top of the file
function ModelIcon({ provider, size = 24 }: { provider; size?) {
  return (
    
  )
}

const AI_MODELS= [
  { 
    id: 'claude-3-sonnet-20240229', 
    name: 'Claude 3.5 Sonnet (Recommended)', 
    shortName: 'Sonnet 3.5',
    provider: 'anthropic'
  },
  { 
    id: 'claude-3-5-haiku-20241022', 
    name: 'Claude 3.5 Haiku', 
    shortName: 'Haiku 3.5',
    provider: 'anthropic'
  },
  { 
    id: 'gpt-4o', 
    name: 'GPT-4o', 
    shortName: 'GPT 4o',
    provider: 'openai'
  },
  { 
    id: 'gpt-4o-mini', 
    name: 'GPT-4o Mini', 
    shortName: 'GPT 4o mini',
    provider: 'openai'
  },
  // { 
  //   id: 'deepseek-chat', 
  //   name: 'DeepSeek Chat', 
  //   shortName: 'DeepSeek V3',
  //   provider: 'deepseek'
  // },
]

export function ModelSelector() {
  const [defaultModel, setDefaultModel] = useState('')
  const [apiKeys, setApiKeys] = useState([])
  const [subscriptionPlan, setSubscriptionPlan] = useState('')

  // Load stored data on mount
  useEffect(() => {
    // Load API keys
    const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedKeys) {
      try {
        const keys= JSON.parse(storedKeys)
        setApiKeys(keys)

        // Load default model
        const storedModel = localStorage.getItem(MODEL_STORAGE_KEY)
        
        // Check if stored model is still valid with current API keys
        if (storedModel) {
          const model = AI_MODELS.find(m => m.id === storedModel)
          if (model && keys.some((k) => k.service === model.provider)) {
            setDefaultModel(storedModel)
          } else {
            // Find first available model
            const firstAvailableModel = AI_MODELS.find(m => 
              keys.some((k) => k.service === m.provider)
            )
            if (firstAvailableModel) {
              setDefaultModel(firstAvailableModel.id)
              localStorage.setItem(MODEL_STORAGE_KEY, firstAvailableModel.id)
              toast.info(`Switched to ${firstAvailableModel.shortName}`)
            } else {
              setDefaultModel('')
              localStorage.removeItem(MODEL_STORAGE_KEY)
            }
          }
        }
      } catch (error) {
        console.error('Error loading API keys:', error)
      }
    }
  }, [])

  // Watch for API key changes
  useEffect(() => {
    if (subscriptionPlan === 'pro') return // Skip key checks for Pro users
    
    const currentModel = AI_MODELS.find(m => m.id === defaultModel)
    if (currentModel && !apiKeys.some(k => k.service === currentModel.provider)) {
      // Current model's API key was removed, switch to first available model
      const firstAvailableModel = AI_MODELS.find(m => 
        apiKeys.some(k => k.service === m.provider)
      )
      if (firstAvailableModel) {
        setDefaultModel(firstAvailableModel.id)
        localStorage.setItem(MODEL_STORAGE_KEY, firstAvailableModel.id)
        toast.info(`Switched to ${firstAvailableModel.shortName}`)
      } else {
        setDefaultModel('')
        localStorage.removeItem(MODEL_STORAGE_KEY)
        toast.info('No AI models available. Please add an API key in settings.')
      }
    }
  }, [apiKeys, defaultModel, subscriptionPlan])

  // Add useEffect to fetch subscription status
  useEffect(() => {
    const checkPlan = async () => {
      const plan = await getSubscriptionPlan()
      setSubscriptionPlan(plan)
    }
    checkPlan()
  }, [])

  const handleModelChange = (modelId) => {
    const selectedModel = AI_MODELS.find(m => m.id === modelId)
    if (!selectedModel) return

    // Skip API key check for Pro users
    if (subscriptionPlan !== 'pro') {
      const hasRequiredKey = apiKeys.some(k => k.service === selectedModel.provider)
      if (!hasRequiredKey) {
        toast.error(`Please add your ${selectedModel.provider === 'openai' ? 'OpenAI' : 'Anthropic'} API key first`)
        return
      }
    }

    setDefaultModel(modelId)
    localStorage.setItem(MODEL_STORAGE_KEY, modelId)
    toast.success(`Switched to ${selectedModel.shortName}`)
  }

  const isModelSelectable = (modelId) => {
    if (subscriptionPlan === 'pro') return true // Bypass API check for Pro users
    const model = AI_MODELS.find(m => m.id === modelId)
    return model ? apiKeys.some(k => k.service === model.provider) = AI_MODELS.find(m => m.id === defaultModel)

  return (
    
      
        
          
            {selectedModel ? (
              
                
                {selectedModel.shortName}
              
            ) ="text-muted-foreground">
                {subscriptionPlan === 'pro' ? 'Please select a model' : 'No model available'}
              
            )}
          
        
        
          {AI_MODELS.map((model) => (
            
              
                
                {model.name}
                {!isModelSelectable(model.id) && (
                  (No API Key)
                )}
              
            
          ))}
        
      
    
  )
} 