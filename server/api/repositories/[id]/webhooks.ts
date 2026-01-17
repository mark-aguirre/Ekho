import { createError, defineEventHandler, getRouterParam } from "h3"
import type { Webhook } from '~/types/repository'

export default defineEventHandler((event): Webhook[] => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({ statusCode: 400, message: 'Repository ID is required' })
  }
  
  return [
    {
      id: '1',
      repository_id: id,
      name: 'Slack Notifications',
      url: 'https://example.com/webhooks/slack',
      events: ['push', 'delete'],
      status: 'active',
      last_status: 'success',
      delivery_logs: [
        { event: 'push', success: true, status_code: 200, response_time_ms: 145, timestamp: new Date(Date.now() - 3600000).toISOString() },
        { event: 'push', success: true, status_code: 200, response_time_ms: 132, timestamp: new Date(Date.now() - 7200000).toISOString() },
        { event: 'delete', success: true, status_code: 200, response_time_ms: 158, timestamp: new Date(Date.now() - 10800000).toISOString() }
      ]
    },
    {
      id: '2',
      repository_id: id,
      name: 'Deploy Trigger',
      url: 'https://api.acme.io/webhooks/deploy',
      events: ['push', 'tag_change'],
      status: 'active',
      last_status: 'success',
      delivery_logs: [
        { event: 'push', success: true, status_code: 200, response_time_ms: 234, timestamp: new Date(Date.now() - 14400000).toISOString() },
        { event: 'tag_change', success: true, status_code: 200, response_time_ms: 198, timestamp: new Date(Date.now() - 18000000).toISOString() }
      ]
    },
    {
      id: '3',
      repository_id: id,
      name: 'Security Scanner',
      url: 'https://security.acme.io/scan',
      events: ['push'],
      status: 'paused',
      last_status: 'pending',
      delivery_logs: []
    }
  ]
})
