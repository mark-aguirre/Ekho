import { defineEventHandler } from 'h3'
import type { Subscription } from '~/types/user'

export default defineEventHandler((): Subscription => {
  return {
    plan: 'pro',
    status: 'active',
    billing_cycle: 'monthly',
    next_billing_date: 'Feb 15, 2024',
    amount: 29
  }
})
