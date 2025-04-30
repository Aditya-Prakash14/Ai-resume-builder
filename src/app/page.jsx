/**
 * Home Page Component
 *
 * This is the main dashboard page of the Resume AI application. It displays:
 * - User profile information
 * - Quick stats (profile score, resume counts, job postings)
 * - Base resume management
 * - Tailored resume management
 *
 * The page * and mesh overlay for visual interest.
 */

import { redirect } from "next/navigation";
import { countResumes } from "../utils/actions/resumes/actions";
import {User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProfileRow } from "@/components/dashboard/profile-row";
import { WelcomeDialog } from "@/components/dashboard/welcome-dialog";
import { getGreeting } from "@/lib/utils";
import { ApiKeyAlert } from "@/components/dashboard/api-key-alert";
import { 


  const {
    data,
  } = await supabase.auth.getUser()



  const userId = user?.id;
  void userId;


  // Check if user is coming from confirmation
  const params = await searchParams;
  const isNewSignup = params?.

  // Fetch dashboard data and handle authentication
  let data;
  try {
    data = await getDashboardData();
    if (!data.profile) {
      redirect("/auth/login");
    }
  } catch {
    // Redirect to login if error occurs
    redirect("/auth/login");
  }

  const { profile, baseResumes, tailoredResumes= data;

  // Get sort parameters for both sections
  const baseSort = (params.baseSort'createdAt';
  const baseDirection = (params.baseDirection'asc';
  const tailoredSort = (params.tailoredSort'createdAt';
  const tailoredDirection = (params.tailoredDirection'asc';

  // Sort function
  function sortResumes(resumes, sort, direction) {
    return [...resumes].sort((a, b) => {
      const modifier = direction === 'asc' ? 1 : -1;
      switch (sort) {
        case 'name':
          return modifier * a.name.localeCompare(b.name);
        case 'jobTitle':
          return modifier * ((a.target_role || '').localeCompare(b.target_role || '') || 0);
        case 'createdAt':
        default:
          return modifier * (new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    }
    });
  }


  // Sort both resume lists
  const baseResumes = sortResumes(unsortedBaseResumes, baseSort, baseDirection);
  const tailoredResumes = sortResumes(unsortedTailoredResumes, tailoredSort, tailoredDirection);

  // Check if user is on Pro plan
  const plan = await getSubscriptionPlan();
  const isProPlan = plan === 'pro';

  // console.log(subscription);

  // Count resumes for base and tailored sections
  const baseResumesCount = await countResumes('base');
  const tailoredResumesCount = await countResumes('tailored');
  // console.log(baseResumesCount, tailoredResumesCount);
  // console.log(isProPlan);


  // Free plan limits
  const canCreateBase = isProPlan || baseResumesCount 
        
          
            
            Profile Not Found
            
              We couldn&apos;t find your profile information. Please contact support for assistance.
            
            
              Contact Support
            
          
        
      
    );
  }

  return (

    

      {/* Welcome Dialog for New Signups */}
      

      {/* Gradient Background */}
      
        
        
        {/* Animated Gradient Orbs */}
        
        
      

      {/* Content */}
      
      {/* Profile Row Component */}
      

        
          {/* Profile Overview */}
          
            {/* API Key Alert */}
            { !isProPlan && }

            {/* Greeting & Edit Button */}
            
              
                
                  {getGreeting()}, {profile.first_name}
                
                
                  Welcome to your resume dashboard
                
              
            



            {/* Resume Bookshelf */}
            


              {/* Base Resumes Section */}
              

              {/* Thin Divider */}
              
                
              

              {/* Tailored Resumes Section */}
              
            
          
        
      
    
  );
}
