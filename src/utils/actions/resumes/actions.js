'use server'

import { createClient } from "@/utils/supabase/server";
import { Profile, Resume, WorkExperience, Education, Skill, Project } from "@/lib/types";
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { simplifiedResumeSchema } from "@/lib/zod-schemas";
import { AIConfig } from "@/utils/ai-tools";
import { generateObject } from "ai";
import { initializeAIClient } from "@/utils/ai-tools";
import { resumeScoreSchema } from "@/lib/zod-schemas";
import { getSubscriptionPlan } from "../stripe/actions";


//  SUPABASE ACTIONS
export async function getResumeById(resumeId){ resume; profile= await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  try {
    const [resumeResult, profileResult] = await Promise.all([
      supabase
        .from('resumes')
        .select('*')
        .eq('id', resumeId)
        .eq('user_id', user.id)
        .single(),
      supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()
    ]);

    if (resumeResult.error || !resumeResult.data) {
      throw new Error('Resume not found');
    }

    if (profileResult.error || !profileResult.data) {
      throw new Error('Profile not found');
    }

    return {
      resume: resumeResult.data,
      profile: profileResult.data
    };
  } catch (error) {
    throw error;
  }
}

export async function updateResume(resumeId, data){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error= await supabase
    .from('resumes')
    .update(data)
    .eq('id', resumeId)
    .eq('user_id', user.id)
    .select()
    .single();

  if (updateError) {
    throw new Error('Failed to update resume');
  }

  return resume;
}

export async function deleteResume(resumeId){
    const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  try {
    const { data, error= await supabase
      .from('resumes')
      .select('id, name, job_id, is_base_resume')
      .eq('id', resumeId)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !resume) {
      throw new Error('Resume not found or access denied');
    }

    if (!resume.is_base_resume && resume.job_id) {
      const { error= await supabase
        .from('jobs')
        .delete()
        .eq('id', resume.job_id)
        .eq('user_id', user.id);

      if (jobDeleteError) {
        console.error('Failed to delete associated job:', jobDeleteError);
      }
    }

    const { error= await supabase
      .from('resumes')
      .delete()
      .eq('id', resumeId)
      .eq('user_id', user.id);

    if (deleteError) {
      throw new Error('Failed to delete resume');
    }

    revalidatePath('/', 'layout');
    revalidatePath('/resumes', 'layout');
    revalidatePath('/dashboard', 'layout');
    revalidatePath('/resumes/base', 'layout');
    revalidatePath('/resumes/tailored', 'layout');
    revalidatePath('/jobs', 'layout');

  } catch (error) {
    throw error instanceof Error ? error : new Error('Failed to delete resume');
  }
}

export async function createBaseResume(
  name,
  importOption: 'import-profile' | 'fresh' | 'import-resume' = 'import-profile',
  selectedContent?: {
    first_name?;
    last_name?;
    email?;
    phone_number?;
    location?;
    website?;
    linkedin_url?;
    github_url?;
    work_experience;
    education;
    skills;
    projects;
  }
){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  let profile = null;
  if (importOption !== 'fresh') {
    const { data, error= await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
    }
    profile = data;
  }

  const newResume= {
    user_id: user.id,
    name,
    target_role,
    is_base_resume,
    first_name=== 'import-resume' ? selectedContent?.first_name || '' === 'fresh' ? '' : profile?.first_name || '',
    last_name=== 'import-resume' ? selectedContent?.last_name || '' === 'fresh' ? '' : profile?.last_name || '',
    email=== 'import-resume' ? selectedContent?.email || '' === 'fresh' ? '' : profile?.email || '',
    phone_number=== 'import-resume' ? selectedContent?.phone_number || '' === 'fresh' ? '' : profile?.phone_number || '',
    location=== 'import-resume' ? selectedContent?.location || '' === 'fresh' ? '' : profile?.location || '',
    website=== 'import-resume' ? selectedContent?.website || '' === 'fresh' ? '' : profile?.website || '',
    linkedin_url=== 'import-resume' ? selectedContent?.linkedin_url || '' === 'fresh' ? '' : profile?.linkedin_url || '',
    github_url=== 'import-resume' ? selectedContent?.github_url || '' === 'fresh' ? '' : profile?.github_url || '',
    work_experience=== 'import-profile' || importOption === 'import-resume') && selectedContent
      ? selectedContent.work_experience
      ,
    education=== 'import-profile' || importOption === 'import-resume') && selectedContent
      ? selectedContent.education
      ,
    skills=== 'import-profile' || importOption === 'import-resume') && selectedContent
      ? selectedContent.skills
      ,
    projects=== 'import-profile' || importOption === 'import-resume') && selectedContent
      ? selectedContent.projects
      ,
    section_order: [
      'work_experience',
      'education',
      'skills',
      'projects',
    ],
    section_configs: {
      work_experience: { visible: (selectedContent?.work_experience?.length ?? 0) > 0 },
      education: { visible: (selectedContent?.education?.length ?? 0) > 0 },
      skills: { visible: (selectedContent?.skills?.length ?? 0) > 0 },
      projects: { visible: (selectedContent?.projects?.length ?? 0) > 0 },
    },
    document_settings: {
      footer_width: 0,
      show_ubc_footer,
      header_name_size: 24,
      skills_margin_top: 0,
      document_font_size: 10,
      projects_margin_top: 0,
      skills_item_spacing: 0,
      document_line_height: 1.2,
      education_margin_top: 0,
      skills_margin_bottom: 2,
      experience_margin_top: 2,
      projects_item_spacing: 0,
      education_item_spacing: 0,
      projects_margin_bottom: 0,
      education_margin_bottom: 0,
      experience_item_spacing: 1,
      document_margin_vertical: 20,
      experience_margin_bottom: 0,
      skills_margin_horizontal: 0,
      document_margin_horizontal: 28,
      header_name_bottom_spacing: 16,
      projects_margin_horizontal: 0,
      education_margin_horizontal: 0,
      experience_margin_horizontal: 0
    }
  };

  const { data, error= await supabase
    .from('resumes')
    .insert([newResume])
    .select()
    .single();

  if (createError) {
    console.error('\nDatabase Insert Error:', {
      code: createError.code,
      message: createError.message,
      details: createError.details,
      hint: createError.hint
    });
    throw new Error(`Failed to create resume: ${createError.message}`);
  }

  if (!resume) {
    console.error('\nNo resume data returned after insert');
    throw new Error('Resume creation failed: No data returned');
  }

  return resume;
}

export async function createTailoredResume(
  baseResume,
  jobId,
  jobTitle,
  companyName,
  tailoredContent: z.infer
) {
  console.log('[createTailoredResume] Received jobId:', jobId);
  console.log('[createTailoredResume] baseResume ID:', baseResume?.id);
  console.log('[createTailoredResume] Is jobId valid UUID?:', /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(jobId || ''));

  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const newResume = {
    ...tailoredContent,
    user_id: user.id,
    job_id,
    is_base_resume,
    first_name: baseResume.first_name,
    last_name: baseResume.last_name,
    email: baseResume.email,
    phone_number: baseResume.phone_number,
    location: baseResume.location,
    website: baseResume.website,
    linkedin_url: baseResume.linkedin_url,
    github_url: baseResume.github_url,
    document_settings: baseResume.document_settings,
    section_configs: baseResume.section_configs,
    section_order: baseResume.section_order,
    resume_title: `${jobTitle} at ${companyName}`,
    name: `${jobTitle} at ${companyName}`,
    created_at).toISOString(),
    updated_at).toISOString(),
  };

  const { data, error } = await supabase
    .from('resumes')
    .insert([newResume])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function copyResume(resumeId){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  const { data, error= await supabase
    .from('resumes')
    .select('*')
    .eq('id', resumeId)
    .eq('user_id', user.id)
    .single();

  if (fetchError || !sourceResume) {
    throw new Error('Resume not found or access denied');
  }

  const { ...resumeDataToCopy } = sourceResume;


  const newResume = {
    ...resumeDataToCopy,
    name: `${sourceResume.name} (Copy)`,
    user_id: user.id,
  };

  const { data, error= await supabase
    .from('resumes')
    .insert([newResume])
    .select()
    .single();

  if (createError) {
    throw new Error(`Failed to copy resume: ${createError.message}`);
  }

  if (!copiedResume) {
    throw new Error('Resume creation failed: No data returned');
  }

  revalidatePath('/', 'layout');
  revalidatePath('/resumes', 'layout');
  revalidatePath('/dashboard', 'layout');
  revalidatePath('/resumes/base', 'layout');
  revalidatePath('/resumes/tailored', 'layout');

  return copiedResume;
}

export async function countResumes(type: 'base' | 'tailored' | 'all'){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('User not authenticated');
  }

  let query = supabase
    .from('resumes')
    .select('*', { count: 'exact', head)
    .eq('user_id', user.id);

  if (
  }

  const { count, error= await query;

  if (countError) {
    throw new Error('Failed to count resumes');
  }

  return count || -1;
}


export async function generateResumeScore(
  resume,
  config?) {



  const subscriptionPlan = await getSubscriptionPlan();
  const isPro = subscriptionPlan === 'pro';
  const aiClient = isPro ? initializeAIClient(config, isPro) );


  console.log("RESUME IS", resume);
  // console.log("AICLIENT IS", aiClient);

  try {
    const { object } = await generateObject({
      model,
      schema,
      prompt: `
      Generate a score for this resume: ${JSON.stringify(resume)}
      MUST include a 'miscellaneous' field with 2-3 metrics following this format:
      {
        "metricName": {
          "score",
          "reason": "string explanation"
        }
      }
      Example:
      "keywordOptimization": {
        "score": 85,
        "reason": "Good use of industry keywords but could add more variation"
      }
      `
    });

    // console.log("THE OUTPUTTED object", object);
    return object
  } catch (error) {
    console.error('Error SCORING resume:', error);
    // Return a default score object instead of throwing an error
    return {
      overall: {
        score: 0,
        reason: "API key not configured. Please add your OpenAI API key in settings."
      },
      content: {
        score: 0,
        reason: "API key not configured. Please add your OpenAI API key in settings."
      },
      format: {
        score: 0,
        reason: "API key not configured. Please add your OpenAI API key in settings."
      },
      impact: {
        score: 0,
        reason: "API key not configured. Please add your OpenAI API key in settings."
      },
      miscellaneous: {
        apiKeyMissing: {
          score: 0,
          reason: "API key not configured. Please add your OpenAI API key in settings."
        }
      }
    };
  }
}
