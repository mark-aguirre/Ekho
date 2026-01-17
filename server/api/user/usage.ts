import { defineEventHandler } from 'h3'
import type { Usage } from '~/types/user'

export default defineEventHandler((): Usage => {
  return {
    storage_used: 13316710195,
    storage_limit: 53687091200,
    bandwidth_used: 155713126195,
    bandwidth_limit: 536870912000,
    repositories_count: 12,
    repositories_limit: 100
  }
})
