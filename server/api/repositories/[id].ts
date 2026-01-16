export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  
  const repositories = {
    '1': {
      id: '1',
      name: 'acme/web-app',
      namespace: 'acme',
      visibility: 'public',
      description: 'Production web application container with Node.js 20 LTS, optimized for Kubernetes deployments',
      tags_count: 24,
      pull_count: 152300,
      storage_bytes: 846594048,
      stars: 42,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString(),
      tag_immutability: false,
      protected_tags: ['v*', 'latest'],
      retention_policy: {
        enabled: true,
        keep_last_n: 10
      }
    },
    '2': {
      id: '2',
      name: 'acme/api-gateway',
      namespace: 'acme',
      visibility: 'private',
      description: 'API Gateway service with rate limiting, authentication, and request routing capabilities',
      tags_count: 18,
      pull_count: 89400,
      storage_bytes: 523849318,
      stars: 28,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString(),
      tag_immutability: false,
      protected_tags: ['v*', 'latest'],
      retention_policy: {
        enabled: true,
        keep_last_n: 10
      }
    },
    '3': {
      id: '3',
      name: 'acme/redis-cluster',
      namespace: 'acme',
      visibility: 'public',
      description: 'Redis cluster image with Sentinel support for high availability deployments',
      tags_count: 12,
      pull_count: 67900,
      storage_bytes: 312475648,
      stars: 19,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString(),
      tag_immutability: false,
      protected_tags: [],
      retention_policy: {
        enabled: false,
        keep_last_n: 10
      }
    },
    '4': {
      id: '4',
      name: 'acme/postgres-backup',
      namespace: 'acme',
      visibility: 'private',
      description: 'Automated PostgreSQL backup utility with S3 and GCS support, scheduled via cron',
      tags_count: 8,
      pull_count: 12500,
      storage_bytes: 156827648,
      stars: 5,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString(),
      tag_immutability: true,
      protected_tags: ['latest'],
      retention_policy: {
        enabled: true,
        keep_last_n: 25
      }
    },
    '5': {
      id: '5',
      name: 'acme/ml-inference',
      namespace: 'acme',
      visibility: 'private',
      description: 'Machine learning inference server with TensorFlow Serving and GPU support',
      tags_count: 6,
      pull_count: 8800,
      storage_bytes: 2147483648,
      stars: 12,
      last_pushed_at: new Date(Date.now() - 31536000000).toISOString(),
      tag_immutability: false,
      protected_tags: ['stable'],
      retention_policy: {
        enabled: false,
        keep_last_n: 10
      }
    }
  }
  
  return repositories[id] || null
})
