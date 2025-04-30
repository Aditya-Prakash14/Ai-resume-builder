'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from 'next/cache';
import { simplifiedJobSchema } from "@/lib/zod-schemas";
;
import { z } from "zod";
import { JobListingParams } from "./schema";

export async function createJob(jobListing: z.infer) {
  
  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const jobData = {
    user_id: user.id,
    company_name: jobListing.company_name,
    position_title: jobListing.position_title,
    job_url: jobListing.job_url,
    description: jobListing.description,
    location: jobListing.location,
    salary_range: jobListing.salary_range,
    keywords: jobListing.keywords,
    work_location: jobListing.work_location || 'in_person', 
    employment_type: jobListing.employment_

  if (error) {
    console.error('[createJob] Error creating job:', error);
    throw error;
  }
  
  return data;
}

export async function deleteJob(jobId){
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    throw new Error('User not authenticated');
  }

  // First, get all resumes that reference this job
  const { data= await supabase
    .from('resumes')
    .select('id')
    .eq('job_id', jobId);

  // Delete the job
  const { error= await supabase
    .from('jobs')
    .delete()
    .eq('id', jobId);

  if (deleteError) {
    console.error('Delete error:', deleteError);
    throw new Error('Failed to delete job');
  }

  // Revalidate all affected resume paths
  affectedResumes?.forEach(resume => {
    revalidatePath(`/resumes/${resume.id}`);
  });
  
  // Also revalidate the general paths
  revalidatePath('/', 'layout');
  revalidatePath('/resumes', 'layout');
}


export async function getJobListings({ 
  page = 1, 
  pageSize = 10, 
  filters 
}) {
  const supabase = await createClient();

  // Calculate offset
  const offset = (page - 1) * pageSize;

  // Start building the query
  let query = supabase
    .from('jobs')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending);

  // Apply filters if they exist
  if (filters) {
    if (filters.workLocation) {
      query = query.eq('work_location', filters.workLocation);
    }
    if (filters.employmentType) {
      query = query.eq('employment_type', filters.employmentType);
    }
    if (filters.keywords && filters.keywords.length > 0) {
      query = query.contains('keywords', filters.keywords);
    }
  }

  // Add pagination
  const { data, count } = await query
    .range(offset, offset + pageSize - 1);

  if (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Failed to fetch job listings');
  }

  return {
    jobs,
    totalCount: count ?? 0,
    currentPage,
    totalPages: Math.ceil((count ?? 0) / pageSize)
  };
}

export async function deleteTailoredJob(jobId){
  const supabase = await createClient();

  const { error } = await supabase
    .from('jobs')
    .update({ is_active)
    .eq('id', jobId);

  if (error) {
    throw new Error('Failed to delete job');
  }

  revalidatePath('/', 'layout');
}

export async function createEmptyJob(){
  const supabase = await createClient();
  const { data, error= await supabase.auth.getUser();
  
  if (userError || !user) {
    throw new Error('User not authenticated');
  }

  const emptyJob= {
    user_id: user.id,
    company_name: 'New Company',
    position_title: 'New Position',
    job_url,
    description,
    location,
    salary_range,
    keywords,
    work_location,
    employment_type,
    is_active;

  const { data, error } = await supabase
    .from('jobs')
    .insert([emptyJob])
    .select()
    .single();

  if (error) {
    console.error('Error creating job:', error);
    throw new Error('Failed to create job');
  }

  revalidatePath('/', 'layout');
  return data;
} 