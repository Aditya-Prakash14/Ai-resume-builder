'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";



export async function updateEmail(formData){
  const supabase = await createClient();
  const newEmail = formData.get('email');
  const currentPassword = formData.get('currentPassword');

  // First verify the current user
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user?.email) {
    return { success, error: 'Unable to verify current user' };
  }

  // Don't update if it's the same email
  if (user.email === newEmail) {
    return { success, error: 'New email must be different from current email' };
  }

  // Verify current password first
  const { error= await supabase.auth.signInWithPassword({
    email: user.email,
    password);

  if (signInError) {
    return { success, error: 'Current password is incorrect' };
  }

  // Then update the email
  const { error } = await supabase.auth.updateUser({ email);

  if (error) {
    return { success, error: error.message };
  }

  revalidatePath('/settings');
  return { success;
}

export async function updatePassword(formData){
  const supabase = await createClient();
  const currentPassword = formData.get('currentPassword');
  const newPassword = formData.get('newPassword');

  // Get the current user's email
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user?.email) {
    return { success, error: 'Unable to verify current user' };
  }

  // First verify the current password
  const { error= await supabase.auth.signInWithPassword({
    email: user.email,
    password);

  if (signInError) {
    return { success, error: 'Current password is incorrect' };
  }

  // Then update to the new password
  const { error } = await supabase.auth.updateUser({ password);

  if (error) {
    return { success, error: error.message };
  }

  revalidatePath('/settings');
  return { success;
} 




  
  export async function testApiKey(){
      const supabase = await createClient()
      
      // Get the API key from vault
      const { data, error= await supabase
        .rpc('get_api_key', {
          p_service_name: 'openai'
        })
  
      if (keyError || !apiKey) {
        return { 
          success, 
          error: 'No API key found for OpenAI' 
        }
      }
  
      const openai = new OpenAI({
        apiKey: apiKey.trim(),
      });
  
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: 'user', content: 'Say this is a test!' }],
        response_format: { type: "text" },
        temperature: 1,
        max_tokens: 2048,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
  
      return {
        success,
        message: response.choices[0]?.message?.content || 'API connection successful'
      }
  
    } catch (error) {
      console.error('Error testing API key:', error)
      return { 
        success,
        error: error instanceof Error ? error.message : 'Failed to test API key'
      }
    }
  }
  
  