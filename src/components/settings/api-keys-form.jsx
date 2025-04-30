'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Copy, Check } from "lucide-react"
import { useState, useEffect } from "react"
import { ServiceName } from "@/lib/types"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import replaceSpecialCharacters from 'replace-special-characters'





const LOCAL_STORAGE_KEY = 'resumelm-api-keys'
const MODEL_STORAGE_KEY = 'resumelm-default-model'

const PROVIDERS: { 
  id; 
  name; 
  apiLink;
  unstable= [
  { 
    id: 'anthropic', 
    name: 'Anthropic',
    apiLink: 'https://console.anthropic.com/',
    unstable,
  { 
    id: 'openai', 
    name: 'OpenAI',
    apiLink: 'https://platform.openai.com/api-keys',
    unstable,
  {
    id: 'groq', 
    name: 'Groq', 
    apiLink: 'https://console.groq.com/keys',
    unstable,
  // Unstable providers
  {
    id: 'google',
    name: 'Google',
    apiLink: 'https://ai.google/get-started/products/',
    unstable,
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    apiLink: 'https://platform.deepseek.com/api-keys',
    unstable: true 
  }
]

const AI_MODELS= [
  // Stable models
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'openai', unstable,
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'openai', unstable,
  { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', provider: 'anthropic', unstable,
  { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', provider: 'anthropic', unstable,
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B', provider: 'groq', unstable,
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B ', provider: 'groq', unstable,
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', provider: 'groq', unstable,

  // Unstable models
  { id: 'gemini-2.0-flash', name: 'Gemini 2.0 Flash', provider: 'google', unstable,
  { id: 'gemini-2.0-flash-lite-preview-02-05', name: 'Gemini 2.0 Flash Lite', provider: 'google', unstable,
  { id: 'deepseek-chat', name: 'DeepSeek Chat (V3)', provider: 'deepseek', unstable: true }
]

export function ApiKeysForm({ isProPlan }= useState([])
  const [visibleKeys, setVisibleKeys] = useState>({}= useState>({}= useState('')
  const [copiedKey, setCopiedKey] = useState(null)
  const [hasLoaded, setHasLoaded] = useState(false)


  // Load stored data on mount
  useEffect(() => {
    // Load API keys
    const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedKeys) {
      try {
        setApiKeys(JSON.parse(storedKeys))
      } catch (error) {
        console.error('Error loading API keys:', error)
      }
    }

    // Load default model
    const storedModel = localStorage.getItem(MODEL_STORAGE_KEY)
    if (storedModel) {
      setDefaultModel(storedModel)
    } else if (isProPlan) {
      // Set default model to llama-3.3-70b-versatile for pro users if they haven't chosen one
      setDefaultModel('llama-3.3-70b-versatile')
      // Save to local storage so this preference persists
      localStorage.setItem(MODEL_STORAGE_KEY, 'llama-3.3-70b-versatile')
    }

    // Mark initial load// Save API keys to local storage whenever they change
  useEffect(() => {
    if (hasLoaded) { // Only save after initial load
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(apiKeys))
    }
  }, [apiKeys, hasLoaded])

  // Save default model to local storage whenever it changes
  useEffect(() => {
    // Only save if we have a model (prevents overwriting on initial mount)
    if (defaultModel) {
      localStorage.setItem(MODEL_STORAGE_KEY, defaultModel)
    }
  }, [defaultModel])

  const handleUpdateKey = (service) => {
    const keyValue = newKeyValues[service]
    if (!keyValue?.trim()) {
      toast.error('Please enter an API key')
      return
    }

    // Normalize the API key by replacing special characters
    const normalizedKey = replaceSpecialCharacters(keyValue.trim())

    const newKey= {
      service,
      key,
      addedAt).toISOString(),
    }

    setApiKeys(prev => {
      const exists = prev.findIndex(k => k.service === service)
      if (exists >= 0) {
        const updated = [...prev]
        updated[exists] = newKey
        return updated
      }
      return [...prev, newKey]
    })

    // Automatically set the default model based on the provider
    const autoSelectModel = () => {
      switch (service) {
        case 'anthropic':
          return 'claude-3-sonnet-20240229'
        case 'openai':
          return 'gpt-4o'
        case 'deepseek':
          return 'deepseek-chat'
        case 'groq':
          return 'llama-3.1-8b-instruct'
        default= autoSelectModel()
    if (newModel !== defaultModel) {
      setDefaultModel(newModel)
      toast.success(`Default model automatically set to ${AI_MODELS.find(m => m.id === newModel)?.name}`)
    }

    setNewKeyValues(prev => ({
      ...prev,
      [service]: ''
    }))
    toast.success('API key saved successfully')
  }

  const handleRemoveKey = (service) => {
    setApiKeys(prev => prev.filter(k => k.service !== service))
    setVisibleKeys(prev => {
      const updated = { ...prev }
      delete updated[service]
      return updated
    })

    // Check if current default model requires this API key
    const currentModel = AI_MODELS.find(m => m.id === defaultModel)
    if (currentModel?.provider === service) {
      // Find first available model that has API key
      const firstAvailableModel = AI_MODELS.find(m => 
        apiKeys.some(k => k.service === m.provider && k.service !== service)
      )
      
      if (firstAvailableModel) {
        setDefaultModel(firstAvailableModel.id)
        toast.info(`Switched to ${firstAvailableModel.name}`)
      } else {
        setDefaultModel('')
        toast.info('No models available. Please add an API key')
      }
    }

    toast.success('API key removed successfully')
  }

  const getExistingKey = (service) => 
    apiKeys.find(k => k.service === service)

  const handleModelChange = (modelId) => {
    const selectedModel = AI_MODELS.find(m => m.id === modelId)
    if (!selectedModel) return

    // Skip key check for Pro users
    if (!isProPlan) {
      const hasRequiredKey = apiKeys.some(k => k.service === selectedModel.provider)
      if (!hasRequiredKey) {
        toast.error(`Please add your ${selectedModel.provider === 'openai' ? 'OpenAI' : 'Anthropic'} API key first`)
        return
      }
    }

    setDefaultModel(modelId)
    toast.success('Default model updated successfully')
  }

  const isModelSelectable = (modelId) => {
    if (isProPlan) return true // Bypass check for Pro users
    const model = AI_MODELS.find(m => m.id === modelId)
    if (!model) return false
    return apiKeys.some(k => k.service === model.provider)
  }

  const handleCopyKey = (service, key) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(service)
    setTimeout(() => setCopiedKey(null), 1000)
  }

  

  return (
    
      {/* Model Selection Card */}
      
        
          Default AI Model
        
        
          This model will be used for all AI operations throughout the application. All models require their respective API keys.
        
        
          
            
          
          
            {AI_MODELS.map((model) => (
              
                
                  {model.name}
                  {model.unstable && (
                    
                      Unstable
                    
                  )}
                
                {!isModelSelectable(model.id) && (
                  (No API Key set)
                )}
              
            ))}
          
        
      

      {/* API Keys Card */}
      
        
          API Keys
        
        
          
            Add your API keys to use premium AI models. Your keys are stored securely in your browser.
          
          
            {isProPlan ? (
              
                Pro Account Active: You have full access to all AI models without needing to manage API keys.
                You can still add personal API keys below if you prefer to use your own credentials.
              
            ) : (
              
                Security Note: API keys are stored locally in your browser. While convenient, this means anyone with access to this device could potentially view your keys.
                For enhanced security, consider upgrading to a Pro account where we securely manage API access for you.
              
            )}
          
        

        
          {/* Stable Providers */}
          {PROVIDERS.filter(p => !p.unstable).map(provider => {
            const existingKey = getExistingKey(provider.id)
            const isVisible = visibleKeys[provider.id]
            const providerModels = AI_MODELS.filter(model => model.provider === provider.id)

            return (
              
                
                  
                    {provider.name}
                  
                  {existingKey && (
                    
                       setVisibleKeys(prev => ({
                          ...prev,
                          [provider.id]: !prev[provider.id]
                        }))}
                        className="h-7 px-2 text-muted-foreground hover:text-gray-900 transition-colors"
                      >
                        {isVisible ? (
                          
                        ) ="h-3.5 w-3.5" />
                        )}
                      
                       handleCopyKey(provider.id, existingKey.key)}
                        className={cn(
                          "h-7 px-2 transition-colors",
                          copiedKey === provider.id 
                            ? "text-emerald-500 hover:text-emerald-600" 
                            : "text-muted-foreground hover:text-gray-900"
                        )}
                      >
                        {copiedKey === provider.id ? (
                          
                        ) ="h-3.5 w-3.5" />
                        )}
                      
                       handleRemoveKey(provider.id)}
                        className="h-7 px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        Remove
                      
                    
                  )}
                

                {existingKey ? (
                  
                    
                      Added {new Date(existingKey.addedAt).toLocaleDateString()}
                    
                    {isVisible && (
                      
                        {existingKey.key}
                      
                    )}
                  
                ) ="flex gap-2">
                       setNewKeyValues(prev => ({
                          ...prev,
                          [provider.id]: e.target.value
                        }))}
                        className="bg-white/50 flex-1 h-9 text-sm border-black/20 focus:border-black/30 hover:border-black/25 transition-colors"
                      />
                       setVisibleKeys(prev => ({
                          ...prev,
                          [provider.id]: !prev[provider.id]
                        }))}
                        className="bg-white/50 h-9 w-9 hover:bg-white/60 transition-colors"
                      >
                        {isVisible ?  ="h-3.5 w-3.5" />}
                      
                       handleUpdateKey(provider.id)}
                      >
                        Save
                      
                    
                    
                      Get your {provider.name} API key →
                    
                  
                )}

                {providerModels.length > 0 && (
                  
                    Available models: {providerModels.map(m => `${m.name}${m.unstable ? ' (Unstable)' : ''}`).join(', ')}
                  
                )}
              
            )
          })}

          {/* Unstable Providers Section */}
          
            
              Experimental Providers Notice
              The following providers are currently unstable. You may experience errors or intermittent service. We recommend using stable providers above for critical operations.
            

            {PROVIDERS.filter(p => p.unstable).map(provider => {
              const existingKey = getExistingKey(provider.id)
              const isVisible = visibleKeys[provider.id]
              const providerModels = AI_MODELS.filter(model => model.provider === provider.id)

              return (
                
                  
                    Unstable
                  
                  
                  
                    
                      {provider.name}
                    
                    {existingKey && (
                      
                         setVisibleKeys(prev => ({
                            ...prev,
                            [provider.id]: !prev[provider.id]
                          }))}
                          className="h-7 px-2 text-muted-foreground hover:text-gray-900 transition-colors"
                        >
                          {isVisible ? (
                            
                          ) ="h-3.5 w-3.5" />
                          )}
                        
                         handleCopyKey(provider.id, existingKey.key)}
                          className={cn(
                            "h-7 px-2 transition-colors",
                            copiedKey === provider.id 
                              ? "text-emerald-500 hover:text-emerald-600" 
                              : "text-muted-foreground hover:text-gray-900"
                          )}
                        >
                          {copiedKey === provider.id ? (
                            
                          ) ="h-3.5 w-3.5" />
                          )}
                        
                         handleRemoveKey(provider.id)}
                          className="h-7 px-2 text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          Remove
                        
                      
                    )}
                  

                  {existingKey ? (
                    
                      
                        Added {new Date(existingKey.addedAt).toLocaleDateString()}
                      
                      {isVisible && (
                        
                          {existingKey.key}
                        
                      )}
                    
                  ) ="flex gap-2">
                         setNewKeyValues(prev => ({
                            ...prev,
                            [provider.id]: e.target.value
                          }))}
                          className="bg-white/50 flex-1 h-9 text-sm border-black/20 focus:border-black/30 hover:border-black/25 transition-colors"
                        />
                         setVisibleKeys(prev => ({
                            ...prev,
                            [provider.id]: !prev[provider.id]
                          }))}
                          className="bg-white/50 h-9 w-9 hover:bg-white/60 transition-colors"
                        >
                          {isVisible ?  ="h-3.5 w-3.5" />}
                        
                         handleUpdateKey(provider.id)}
                        >
                          Save
                        
                      
                      
                        Get your {provider.name} API key →
                      
                    
                  )}

                  {providerModels.length > 0 && (
                    
                      Available models: {providerModels.map(m => `${m.name}${m.unstable ? ' (Unstable)' : ''}`).join(', ')}
                    
                  )}
                
              )
            })}
          
        
      
    
  )
} 