import { defineEventHandler, getRouterParam } from 'h3'
import type { Tag } from '~/types/repository'

export default defineEventHandler((event): Tag[] => {
  const id = getRouterParam(event, 'id')
  
  return [
    {
      id: '1',
      repository_id: id,
      name: 'v2.5.0',
      digest: 'sha256:b4ed95caeb02',
      size_bytes: 245555200,
      architectures: ['amd64', 'arm64'],
      is_multi_arch: true,
      is_protected: true,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '2',
      repository_id: id,
      name: 'latest',
      digest: 'sha256:a3ed95caeb02',
      size_bytes: 245555200,
      architectures: ['amd64', 'arm64'],
      is_multi_arch: true,
      is_protected: true,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '3',
      repository_id: id,
      name: 'dev',
      digest: 'sha256:e7ed95caeb02',
      size_bytes: 267763200,
      architectures: ['amd64'],
      is_multi_arch: false,
      is_protected: false,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '4',
      repository_id: id,
      name: 'staging',
      digest: 'sha256:f8ed95caeb02',
      size_bytes: 249958400,
      architectures: ['amd64', 'arm64'],
      is_multi_arch: true,
      is_protected: false,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '5',
      repository_id: id,
      name: 'v2.4.1',
      digest: 'sha256:c5ed95caeb02',
      size_bytes: 243507200,
      architectures: ['amd64'],
      is_multi_arch: false,
      is_protected: true,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    },
    {
      id: '6',
      repository_id: id,
      name: 'v2.4.0',
      digest: 'sha256:d6ed95caeb02',
      size_bytes: 241203200,
      architectures: ['amd64'],
      is_multi_arch: false,
      is_protected: true,
      pushed_at: new Date(Date.now() - 31536000000).toISOString()
    }
  ]
})
