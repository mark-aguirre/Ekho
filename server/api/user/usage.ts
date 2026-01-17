import { defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  return {
    storage: {
      used: '12.4 GB',
      limit: '50 GB',
      percentage: 25
    },
    bandwidth: {
      used: '145 GB',
      limit: '500 GB',
      percentage: 29
    },
    repositories: 12,
    totalPulls: 45600
  }
})
