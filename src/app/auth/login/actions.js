'use server'

import { createClient, createServiceClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAuthenticatedClient, getServiceClient } from "@/utils/actions/utils/supabase";





// Login
export async function login(formData){
  const supabase = await createClient();

  const data = {
    email: formData.get('email'): formData.get('password')= await supabase.auth.signInWithPassword(data)

  if (error) {
    return { success, error: error.message }
  }

  redirect('/')
  return { success: true }
}

// Signup
export async function signup(formData){
  const supabase = await createServiceClient();

  const data = {
    email: formData.get('email'): formData.get('password'): {
      data: {
        full_name: formData.get('name'): `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`
    }
  }
  const { error= await supabase.auth.signUp(data);

  if (signupError) {
    // Log detailed error information
    console.error('Signup Error Details:', {
      code: signupError.code,
      message: signupError.message,
      status: signupError.status,
      name: signupError.name
    });
    return { success, error: signupError.message }
  }

  return { success: true }
} 

// Logout 
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/auth/login');
} 

// Password Reset
export async function resetPasswordForEmail(formData){
  const supabase = await createClient();
  const email = formData.get('email');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  });

  if (error) {
    return { success, error: error.message };
  }

  return { success;
} 

// Waitlist Signup
export async function joinWaitlist(formData){
  const supabase = await createClient();

  const data = {
    email: formData.get('email')_name: formData.get('firstName')_name: formData.get('lastName');

  try {
    const { error } = await supabase
      .from('mailing-list')
      .insert([data]);

    if (error) {
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return { success, error: error.message };
    }

    return { success;
  } catch (e) {
    console.error('Unexpected error during waitlist signup:', e);
    return { 
      success, 
      error: e instanceof Error ? e.message : 'An unexpected error occurred' 
    };
  }
} 

// GitHub Sign In
export async function signInWithGithub(){
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        queryParams: {
          next: '/'
        }
      }
    });

    if (error) {
      return { success, error: error.message };
    }

    if (data?.url) {
      return { success, url: data.url };
    }

    return { success, error: 'Failed to get OAuth URL' };
  } catch (error) {
    return { 
      success, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
} 

// Check if user is authenticated
export async function checkAuth(){ 
  authenticated; 
  user?: { id; email?= await createClient();
  
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !user) {
      console.error('Auth check error:', error);
      return { authenticated;
    }

    return { 
      authenticated,
      user: {
        id: user.id,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Unexpected error during auth check:', error);
    return { authenticated;
  }
} 

// Get user ID if authenticated
export async function getUserId(){
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    return user.id;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
} 

// New function to check subscription status
export async function getSubscriptionStatus(){
  hasSubscription;
  plan?;
  status?;
  error?;
}> {
  const supabase = await createClient();
  
  try {
    const userId = await getUserId();
    if (!userId) {
      return { hasSubscription, error: 'No authenticated user' };
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('subscription_plan, subscription_status')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching subscription:', error);
      return { hasSubscription, error: error.message };
    }

    return {
      hasSubscription: !!subscription,
      plan: subscription?.subscription_plan,
      status: subscription?.subscription_status
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return { 
      hasSubscription, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
} 

export async function deleteUserAccount(formData) {
  'use server'
  
  const confirmation = formData.get('confirm')
  if (confirmation !== 'DELETE') {
    throw new Error('Invalid confirmation text')
  }

  try {
    const { supabase, user } = await getAuthenticatedClient()
    const { supabase= await getServiceClient()

    // Delete user from auth
    const { error= await serviceClient.auth.admin.deleteUser(user.id)
    if (authError) throw new Error(authError.message)

    // Delete user data from profiles table
    const { error= await serviceClient
      .from('profiles')
      .delete()
      .eq('user_id', user.id)
    
    if (profileError) throw new Error(profileError.message)

    // Delete user's resumes
    const { error= await serviceClient
      .from('resumes')
      .delete()
      .eq('user_id', user.id)

    if (resumeError) throw new Error(resumeError.message)

    // Sign out after deletion
    await authClient.auth.signOut()
  } catch (error) {
    console.error('Account deletion failed:', error)
    throw error
  }

  redirect('/auth/login')
} 
