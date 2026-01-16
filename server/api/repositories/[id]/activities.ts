export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  
  return [
    {
      id: '1',
      repository_id: id,
      action: 'push',
      actor: 'ci-pipeline',
      target: 'v2.5.0',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '10.0.1.45'
    },
    {
      id: '2',
      repository_id: id,
      action: 'push',
      actor: 'ci-pipeline',
      target: 'latest',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '10.0.1.45'
    },
    {
      id: '3',
      repository_id: id,
      action: 'push',
      actor: 'developer@acme.io',
      target: 'dev',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '192.168.1.100'
    },
    {
      id: '4',
      repository_id: id,
      action: 'retag',
      actor: 'ci-pipeline',
      target: 'staging',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '10.0.1.45'
    },
    {
      id: '5',
      repository_id: id,
      action: 'delete',
      actor: 'admin@acme.io',
      target: 'v2.3.0-beta',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '192.168.1.50'
    },
    {
      id: '6',
      repository_id: id,
      action: 'settings_change',
      actor: 'admin@acme.io',
      target: 'retention_policy',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '192.168.1.50'
    },
    {
      id: '7',
      repository_id: id,
      action: 'pull',
      actor: 'k8s-production',
      target: 'latest',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '10.100.0.12'
    },
    {
      id: '8',
      repository_id: id,
      action: 'pull',
      actor: 'k8s-staging',
      target: 'staging',
      created_date: new Date(Date.now() - 43200000).toISOString(),
      ip_address: '10.100.0.15'
    }
  ]
})
