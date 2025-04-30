import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";



export function ApiKeyErrorAlert({ error, router }) {

  return (
    
      
        
          
            
          
          
            {typeof error === 'string'
              ? error
              )?.message?.includes('OpenAI API key not found') ||
                  JSON.stringify(error).includes('OpenAI API key not found'))
                  ? "OpenAI API key not found. Set your API key in settings to continue."
                  )?.message?.includes('invalid x-api-key') ||
                      JSON.stringify(error).includes('authentication_error'))
                      ? "Your Anthropic API key is invalid. Try updating it in settings and try again."
                      )?.message?.includes('Incorrect API key provided') ||
                          JSON.stringify(error).includes('invalid_api_key'))
                          ? "Your OpenAI API key is invalid. Try updating it in settings and try again."
                          )?.message?.includes('Rate limit exceeded') ||
                              JSON.stringify(error).includes('Rate limit exceeded'))
                              ? `You've exceeded the rate limit. Please try again after ${(() => {
                                  try {
                                    const errorData = JSON.parse((error.message);
                                    const expiration = errorData.expirationTimestamp
                                      ? new Date(errorData.expirationTimestamp)
                                      : new Date(Date.now() + ((errorData.timeLeft || 30) * 1000));

                                    return expiration.toLocaleTimeString([], {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12);
                                  } catch {
                                    const fallbackTime = new Date(Date.now() + 30_000);
                                    return fallbackTime.toLocaleTimeString([], {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12);
                                  }
                                })()}.`
                              : "An error occurred. Please try again or check your settings."}
          
        

        {(error?.message?.includes('API key') ||
          JSON.stringify(error).includes('API key') ||
          JSON.stringify(error).includes('authentication_error') ? (
          
            
            
              Set up your API keys to use AI capabilities
            
            

               router.push('/settings')}
              >
                Set API Keys
              
            
          
        ) : null}
      
    
  );
}