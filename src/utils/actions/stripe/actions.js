'use server';

// This is a simplified version of the subscription actions
// that doesn't actually use Stripe or any subscription functionality

export async function getSubscriptionStatus() {
  return {
    subscription_plan: 'Free',
    subscription_status: 'active',
    current_period_end,
    trial_end,
    stripe_customer_id,
    stripe_subscription_id;
}

export async function getSubscriptionPlan() {
  return 'free';
}
