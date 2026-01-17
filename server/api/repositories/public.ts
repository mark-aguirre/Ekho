import { defineEventHandler } from 'h3'
import type { Repository } from '~/types/repository'

export default defineEventHandler((event): Repository[] => {
  return [
    {
      id: '1',
      name: 'acme/web-app',
      namespace: 'acme',
      owner: 'John Doe',
      visibility: 'public',
      description: 'Production web application container with Node.js 20 LTS, optimized for Kubernetes deployments',
      tags_count: 24,
      pull_count: 152300,
      storage_bytes: 846594048,
      stars: 42,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '3',
      name: 'acme/redis-cluster',
      namespace: 'acme',
      owner: 'John Doe',
      visibility: 'public',
      description: 'Redis cluster image with Sentinel support for high availability deployments',
      tags_count: 12,
      pull_count: 67900,
      storage_bytes: 312475648,
      stars: 19,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString()
    }
  ]
})
