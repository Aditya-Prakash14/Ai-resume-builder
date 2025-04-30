// src/app/settings/page.tsx

"use server"

import { SettingsContent } from '@/components/settings/settings-content'
import { getSubscriptionPlan } from '@/utils/actions/stripe/actions';
import { createClient } from '@/utils/supabase/server'


export default async function SettingsPage() {
  const supabase = await createClient();
  const { data= await supabase.auth.getUser();


    // Check if user is on Pro plan
    const plan = await getSubscriptionPlan();
    const isProPlan = plan === 'pro';

  return (
    
      
        
      
    
  )
}