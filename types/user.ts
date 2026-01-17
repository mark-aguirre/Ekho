export interface UserProfile {
  fullName: string
  email: string
  username: string
  memberSince: string
  verified: boolean
}

export interface Subscription {
  plan: SubscriptionPlan
  status: SubscriptionStatus
  billing_cycle: BillingCycle
  next_billing_date: string
  amount: number
}

export type SubscriptionPlan = 'free' | 'pro' | 'enterprise'
export type SubscriptionStatus = 'active' | 'cancelled' | 'expired'
export type BillingCycle = 'monthly' | 'yearly'

export interface Usage {
  storage_used: number
  storage_limit: number
  bandwidth_used: number
  bandwidth_limit: number
  repositories_count: number
  repositories_limit: number
}
