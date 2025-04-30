'use server'

import { createClient } from "@/utils/supabase/server";
import { Profile, Resume } from "@/lib/types";



export async function getDashboardData(){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error('User not authenticated');
  }

  try {
    // Fetch profile data
    let profile;
    const { data, error= await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    profile = data;

    // If profile doesn't exist, create one
    if (profileError?.code === 'PGRST116') {
      const { data, error= await supabase
        .from('profiles')
        .insert([{
          user_id: user.id,
          first_name,
          last_name,
          email: user.email,
          phone_number,
          location,
          website,
          linkedin_url,
          github_url,
          work_experience,
          education,
          skills,
          projects)
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
        throw new Error('Error creating user profile');
      }

      profile = newProfile;
    } else if (profileError) {
      console.error('Error fetching profile:', profileError);
      throw new Error('Error fetching dashboard data');
    }

    // Fetch resumes data
    const { data, error= await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', user.id);

    if (resumesError) {
      console.error('Error fetching resumes:', resumesError);
      throw new Error('Error fetching dashboard data');
    }

    const baseResumes = resumes?.filter(resume => resume.is_base_resume) ?? [];
    const tailoredResumes = resumes?.filter(resume => !resume.is_base_resume) ?? [];

    const baseResumesData = baseResumes.map(resume => ({
      ...resume,
      type: 'base';

    const tailoredResumesData = tailoredResumes.map(resume => ({
      ...resume,
      type: 'tailored';

    return {
      profile,
      baseResumes,
      tailoredResumes;
  } catch (error) {
    if (error instanceof Error && error.message === 'User not authenticated') {
      return {
        profile,
        baseResumes,
        tailoredResumes;
    }
    throw error;
  }
}




