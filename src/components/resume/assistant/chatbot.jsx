'use client';


import React, { useEffect, useCallback, useState } from 'react';
import { useChat } from 'ai/react';
import { Card } from "@/components/ui/card";
import { Bot, Trash2, Pencil, ChevronDown, RefreshCw } from "lucide-react";
import { Education, Project, Resume, Skill, WorkExperience, Job } from '@/lib/types';
import { Message } from 'ai';
import { cn } from '@/lib/utils';
import { ToolInvocation } from 'ai';
import { MemoizedMarkdown } from '@/components/ui/memoized-markdown';
import { Suggestion } from './suggestions';
import { SuggestionSkeleton } from './suggestion-skeleton';
import ChatInput from './chat-input';
import { LoadingDots } from '@/components/ui/loading-dots';
import { ApiKey } from '@/utils/ai-tools';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { WholeResumeSuggestion } from './suggestions';
import { QuickSuggestions } from './quick-suggestions';
import { StickToBottom, useStickToBottomContext } from 'use-stick-to-bottom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ApiKeyErrorAlert } from '@/components/ui/api-key-error-alert';
import { Textarea } from '@/components/ui/textarea';




const LOCAL_STORAGE_KEY = 'resumelm-api-keys';
const MODEL_STORAGE_KEY = 'resumelm-default-model';



function ScrollToBottom() {
  const { isAtBottom, scrollToBottom } = useStickToBottomContext();

  return (
    !isAtBottom && (
       scrollToBottom()}
      >
        
      
    )
  );
}

export default function ChatBot({ resume, onResumeChange, job }) {
  const router = useRouter();
  const [accordionValue, setAccordionValue] = React.useState("");
  const [apiKeys, setApiKeys] = React.useState([]);
  const [defaultModel, setDefaultModel] = React.useState('gpt-4o-mini');
  const [originalResume, setOriginalResume] = React.useState(null);
  const [isInitialLoading, setIsInitialLoading] = React.useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);

  // Load settings from local storage
  useEffect(() => {
    const storedKeys = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedModel = localStorage.getItem(MODEL_STORAGE_KEY);
    
    if (storedKeys) {
      try {
        setApiKeys(JSON.parse(storedKeys));
      } catch (error) {
        console.error('Error loading API keys:', error);
      }
    }

    if (storedModel) {
      setDefaultModel(storedModel);
    }
  }, []);

  const config = {
    model,
  };
  
  const { messages, error, append, isLoading, addToolResult, stop, setMessages } = useChat({
    api: '/api/chat',
    body: {
      target_role: resume.target_role,
      resume,
      job,
    maxSteps: 5,
    onResponse() {
 
      setIsInitialLoading(false);
    },
    onError() {
      setIsInitialLoading(false);
    },
    async onToolCall({ toolCall }) {
      // setIsStreaming(false);
      
      if (toolCall.toolName === 'getResume') {
        const params = toolCall.args;
        
        const personalInfo = {
          first_name: resume.first_name,
          last_name: resume.last_name,
          email: resume.email,
          phone_number: resume.phone_number,
          location: resume.location,
          website: resume.website,
          linkedin_url: resume.linkedin_url,
          github_url: resume.github_url,
        };

        const sectionMap = {
          personal_info,
          work_experience: resume.work_experience,
          education: resume.education,
          skills: resume.skills,
          projects: resume.projects,
        };

        const result = params.sections.includes('all')
          ? { ...sectionMap, target_role: resume.target_role }
          : params.sections.reduce((acc, section) => ({
              ...acc,
              [section]);
        
        addToolResult({ toolCallId: toolCall.toolCallId, result });
        console.log('Tool call READ RESUME result:', result);
        return result;
      }

      if (toolCall.toolName === 'suggest_work_experience_improvement') {
        return toolCall.args;
      }

      if (toolCall.toolName === 'suggest_project_improvement') {
        return toolCall.args;
      }

      if (toolCall.toolName === 'suggest_skill_improvement') {
        return toolCall.args;
      }

      if (toolCall.toolName === 'suggest_education_improvement') {
        return toolCall.args;
      }

      if (toolCall.toolName === 'modifyWholeResume') {
        const updates = toolCall.args_info?: Partial;
          work_experience?;
          education?;
          skills?;
          projects?;
        };
        
        // Store the current resume state before applying updates
        setOriginalResume({ ...resume });
        
        // Apply updates.basic_info) {
          Object.entries(updates.basic_info).forEach(([key, value]) => {
            if (value !== undefined) {
              onResumeChange(key;
            }
          });
        }

        const sections = {
          work_experience: updates.work_experience,
          education: updates.education,
          skills: updates.skills,
          projects: updates.projects,
        };

        Object.entries(sections).forEach(([key, value]) => {
          if (value !== undefined) {
            onResumeChange(key;
          }
        });

        return (
          
             {
                // Restore the original resume state
                if (originalResume) {
                  // Restore basic info
                  Object.keys(originalResume).forEach((key) => {
                    if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                      onResumeChange(key;
                    }
                  });
                  
                  // Clear the stored original state
                  setOriginalResume(null);
                }
              }}
            />
          
        );
      }
    },
    onFinish() {
      setIsInitialLoading(false);
    },
    // onResponse(response) {
    //   setIsStreaming(true);
    // },
  });

  // Memoize the submit handler
  const handleSubmit = useCallback((message) => {
  
    
    setIsInitialLoading(true);
    append({ 
      content: message.replace(/\s+$/, ''), // Extra safety: trim trailing whitespace
      role: 'user' 
    });
    
    
    setAccordionValue("chat");
  }, [append]);

  // Add delete handler
  const handleDelete = (id) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  // Add edit handler
  const handleEdit = (id, content) => {
    setEditingMessageId(id);
    setEditContent(content);
  };

  // Add save handler
  const handleSaveEdit = (id) => {
    setMessages(messages.map(message => 
      message.id === id 
        ? { ...message, content;
    setEditingMessageId(null);
    setEditContent("");
  };

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setOriginalResume(null);
    setEditingMessageId(null);
    setEditContent("");
  }, [setMessages]);

  return (
    
      

      
        

          {/* Accordion Trigger */}
          
            
              
                
                  
                    
                  
                  
                
              
            

            
              
                
                  
                  Clear Chat History
                
              
              
                
                  Clear Chat History
                  
                    This will remove all messages and reset the chat. This action can&apos;t be undone.
                  
                
                
                  
                    Cancel
                  
                  
                    Clear Chat
                  
                
              
            
          

          {/* Accordion Content */}
          
            
              
                {messages.length === 0 ? (
                  
                ){/* Messages */}
                    {messages.map((m) => (
                      

                        {/* Regular Message Content */}
                        {m.content && (
                          
                            
                              

                                {/* Edit Message */}
                                {editingMessageId === m.id ? (
                                  
                                     setEditContent(e.target.value)}
                                      className={cn(
                                        "w-full min-h-[100px] p-2 rounded-lg",
                                        "bg-white/80 backdrop-blur-sm",
                                        m.role === 'user' 
                                          ? "text-purple-900 placeholder-purple-400"
                                          : "text-gray-900 placeholder-gray-400",
                                        "border border-purple-200/60 focus:border-purple-400/60",
                                        "focus:outline-none focus:ring-1 focus:ring-purple-400/60"
                                      )}
                                    />
                                     handleSaveEdit(m.id)}
                                      className={cn(
                                        "self-end px-3 py-1 rounded-lg text-xs",
                                        "bg-purple-500 text-white",
                                        "hover:bg-purple-600",
                                        "transition-colors duration-200"
                                      )}
                                    >
                                      Save
                                    
                                  
                                ) ={m.id} content={m.content} />
                                )}

                                {/* Message Actions */}
                                
                                   handleDelete(m.id)}
                                    className={cn(
                                      "transition-colors duration-200",
                                      m.role === 'user' 
                                        ? "text-purple-500/60 hover:text-purple-600"
                                        : "text-purple-400/60 hover:text-purple-500",
                                    )}
                                    aria-label="Delete message"
                                  >
                                    
                                  
                                   handleEdit(m.id, m.content)}
                                    className={cn(
                                      "transition-colors duration-200",
                                      m.role === 'user' 
                                        ? "text-purple-500/60 hover:text-purple-600"
                                        : "text-purple-400/60 hover:text-purple-500",
                                    )}
                                    aria-label="Edit message"
                                  >
                                    
                                  
                                
                              
                            
                          
                        )}
                        
                        {/* Tool Invocations*/}
                        {m.toolInvocations?.map((toolInvocation) => {
                          const { toolName, toolCallId, state, args } = toolInvocation;
                          switch (state) {
                            case 'partial-call':
                            case 'call'={toolCallId} className="mt-2 max-w-[90%]">
                                  
                                    {toolName === 'getResume' ? (
                                      
                                        Reading Resume...
                                      
                                    ) === 'modifyWholeResume' ? (
                                      
                                        Preparing resume modifications...
                                      
                                    ) : toolName.startsWith('suggest_') ? (
                                      
                                    ){toolName === 'displayWeather' ? (
                                      Loading weather...
                                    ) : null}
                                  
                                
                              );

                            case 'result':
                              // Map tool names to resume sections and handle suggestions
                              const toolConfig = {
                                suggest_work_experience_improvement: {
                                  type: 'work_experience': 'work_experience',
                                  content: 'improved_experience',
                                },
                                suggest_project_improvement: {
                                  type: 'project': 'projects',
                                  content: 'improved_project',
                                },
                                suggest_skill_improvement: {
                                  type: 'skill': 'skills',
                                  content: 'improved_skill',
                                },
                                suggest_education_improvement: {
                                  type: 'education': 'education',
                                  content: 'improved_education',
                                },
                                modifyWholeResume: {
                                  type: 'whole_resume': 'all',
                                  content,
                              };
                              const config = toolConfig[toolName;

                              if (!config) return null;

                              // Handle specific tool results
                              if (toolName === 'getResume') {
                                return (
                                  
                                    
                                      
                                        {args.message}
                                        Read Resume ✅
                                      
                                    
                                  
                                );
                              }

                              if (config.
                                }

                                return (
                                  
                                     {
                                        if (originalResume) {
                                          Object.keys(originalResume).forEach((key) => {
                                            if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
                                              onResumeChange(key;
                                            }
                                          });
                                          setOriginalResume(null);
                                        }
                                      }}
                                    />
                                  
                                );
                              }

                              return (
                                
                                  
                                     onResumeChange(config.field, 
                                        resume[config.field].map((item, i) => 
                                          i === args.index ? args[config.content] )}
                                      onReject={() => {}}
                                    />
                                  
                                
                              );

                            default;
                          }
                        })}


                        {/* Loading Dots Message - Modified condition */}
                        {((isInitialLoading && index === messages.length - 1 && m.role === 'user') ||
                          (isLoading && index === messages.length - 1 && m.role === 'assistant')) && (
                          
                            
                              
                                
                              
                            
                          
                        )}
                      
                    ))}
                  
                )}
              
                {error && (
                  error.message === "Rate limit exceeded. Try again later." ? (
                    
                      You&apos;ve used all your available messages. Please try again after:
                      
                        {new Date(Date.now() + 5 * 60 * 60 * 1000).toLocaleString()} {/* 5 hours from now */}
                      
                    
                  ) ={error} 
                      router={router} 
                    />
                  )
                )}
              

              
            
            
          
        
      

      {/* Input Bar */}
      
    
  );
}