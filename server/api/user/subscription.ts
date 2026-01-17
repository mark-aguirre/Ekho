import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    plan: 'Pro',
    status: 'Active',
    description: 'Perfect for growing teams and production workloads',
    billingCycle: 'Monthly',
    nextRenewal: 'Feb 15, 2024',
    price: '$29/month'
  }
})
