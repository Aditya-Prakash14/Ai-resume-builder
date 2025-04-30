import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createDeepSeek } from '@ai-sdk/deepseek';
import { createGroq } from '@ai-sdk/groq';
import { LanguageModelV1 } from 'ai';
// import { createDeepSeek } from '@ai-sdk/deepseek';

export type ApiKey = {
  service: string;
  key: string;
  addedAt: string;
};

export type AIConfig = {
  model: string;
  apiKeys: Array<ApiKey>;
};

/**
 * Initializes an AI client based on the provided configuration
 * Falls back to default OpenAI configuration if no config is provided
 */
export function initializeAIClient(config?: AIConfig, isPro?: boolean, useThinking?: boolean) {


  // Handle Pro subscription with environment variables
  if (isPro && config) {


    const { model } = config;

    // if (useThinking) {
    //   return createOpenAI({ apiKey: process.env.OPENAI_API_KEY })('o1-mini');
    // }

    if (model.startsWith('claude')) {
      if (!process.env.ANTHROPIC_API_KEY) throw new Error('Anthropic API key not found');
      return createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY,  })(model) as LanguageModelV1;
    }

    if (model.startsWith('gemini')) {
      if (!process.env.GEMINI_API_KEY) throw new Error('Google API key not found');
      return createGoogleGenerativeAI ({ apiKey: process.env.GEMINI_API_KEY })(model) as LanguageModelV1;
    }

    if (model.startsWith('deepseek')) {
      if (!process.env.DEEPSEEK_API_KEY) throw new Error('DeepSeek API key not found');
      return createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })(model) as LanguageModelV1;
    }

    if (model.startsWith('gemma')) {
      if (!process.env.GROQ_API_KEY) throw new Error('Groq API key not found');
      return createGroq({ apiKey: process.env.GROQ_API_KEY })(model) as LanguageModelV1;
    }

    void useThinking;
    // if (model.startsWith('deepseek')) {
    //   if (!process.env.DEEPSEEK_API_KEY) throw new Error('DeepSeek API key not found');
    //   return createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY })(model);
    // }

    // Default to OpenAI for Pro
    if (!process.env.OPENAI_API_KEY) throw new Error('OpenAI API key not found');
    return createOpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      compatibility: 'strict',

    })('gpt-4o-mini');
  }

  // Existing logic for free users
  if (!config) {
    return createOpenAI({ apiKey: '' })('no-model') as LanguageModelV1;
  }

  const { model, apiKeys } = config;

  if (model.startsWith('claude')) {
    const anthropicKey = apiKeys.find(k => k.service === 'anthropic')?.key;
    if (!anthropicKey) throw new Error('Anthropic API key not found');
    return createAnthropic({ apiKey: anthropicKey })(model) as LanguageModelV1;
  }

  if (model.startsWith('gemini')) {
    const googleKey = apiKeys.find(k => k.service === 'google')?.key;
    if (!googleKey) throw new Error('Google API key not found');
    return createGoogleGenerativeAI({ apiKey: googleKey })(model) as LanguageModelV1;
  }

  if (model.startsWith('deepseek')) {
    const deepseekKey = apiKeys.find(k => k.service === 'deepseek')?.key;
    if (!deepseekKey) throw new Error('DeepSeek API key not found');
    return createDeepSeek({ apiKey: deepseekKey })(model) as LanguageModelV1;
  }

  if (model.startsWith('gemma')) {
    const groqKey = apiKeys.find(k => k.service === 'groq')?.key;
    if (!groqKey) throw new Error('Groq API key not found');
    return createGroq({ apiKey: groqKey })(model) as LanguageModelV1;
  }

  const openaiKey = apiKeys.find(k => k.service === 'openai')?.key;
  if (!openaiKey) {
    console.warn('OpenAI API key not found. Using mock AI client.');
    // Return a mock AI client that returns empty responses
    return {
      chat: async () => ({ content: "API key not configured. Please add your OpenAI API key in settings." }),
      complete: async () => "API key not configured. Please add your OpenAI API key in settings.",
      embeddings: async () => new Array(1536).fill(0),
      // Add any other methods that might be called
    } as unknown as LanguageModelV1;
  }
  return createOpenAI({ apiKey: openaiKey })(model) as LanguageModelV1;
}
