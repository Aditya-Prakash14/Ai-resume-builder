'use server';

import { Profile } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(data){
  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(data)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  // Revalidate all routes that might display profile data
  revalidatePath('/', 'layout');
  revalidatePath('/profile/edit', 'layout');
  revalidatePath('/resumes', 'layout');
  revalidatePath('/profile', 'layout');

  return profile;
}

export async function importResume(data){
  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user) {
    void userError
    throw new Error(`Failed to fetch current profile: ${userError?.message || 'Unknown error'}`);
  }

  // First, get the current profile
  const { data, error= await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (fetchError) {
    void fetchError
    throw new Error(`Failed to fetch current profile: ${fetchError.message}`);
  }

  // Prepare the update data
  const updateData= {};

  // Handle simple string fields - only update if current value is null/empty
  const simpleFields = ['first_name', 'last_name', 'email', 'phone_number', 
    'location', 'website', 'linkedin_url', 'github_url'];
  
  simpleFields.forEach((field) => {
    if (data[field] !== undefined) {
      // Only update if current value is null or empty string
      if (!currentProfile[field]) {
        updateData[field] = data[field];
      }
    }
  });

  // Handle array fields - append to existing arrays
  const arrayFields = ['work_experience', 'education', 'skills', 
    'projects'];
  
  arrayFields.forEach((field) => {
    if (data[field]?.length) {
      // Simply append new items to the existing array
      updateData[field] = [
        ...(currentProfile[field] || []),
        ...data[field]
      ];
    }
  });

  // Only proceed with update if there are changes
  if (Object.keys(updateData).length === 0) {
    return currentProfile;
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }

  // Revalidate all routes that might display profile data
  revalidatePath('/', 'layout');
  revalidatePath('/profile/edit', 'layout');
  revalidatePath('/resumes', 'layout');
  revalidatePath('/profile', 'layout');

  return profile;
}


export async function resetProfile(){
  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const emptyProfile= {
    first_name,
    last_name,
    email,
    phone_number,
    location,
    website,
    linkedin_url,
    github_url,
    work_experience,
    education,
    skills,
    projects,
  };

  const { data, error } = await supabase
    .from('profiles')
    .update(emptyProfile)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    throw new Error('Failed to reset profile');
  }

  return profile;
}
