export interface Repository {
  id: string
  name: string
  namespace: string
  owner?: string
  visibility: RepositoryVisibility
  description: string
  tags_count: number
  pull_count: number
  storage_bytes: number
  stars: number
  last_pushed_at: string
  tag_immutability?: boolean
  protected_tags?: string[]
  retention_policy?: RetentionPolicy
}

export type RepositoryVisibility = 'public' | 'private'

export interface RetentionPolicy {
  enabled: boolean
  keep_last_n: number
}

export interface Tag {
  id: string
  repository_id: string
  name: string
  digest: string
  size_bytes: number
  architectures: string[]
  is_multi_arch: boolean
  is_protected: boolean
  pushed_at: string
}

export interface Activity {
  id: string
  repository_id: string
  action: string
  actor: string
  target: string
  created_date: string
  ip_address: string
}

export interface Webhook {
  id: string
  repository_id: string
  name: string
  url: string
  events: string[]
  status: WebhookStatus
  last_status: string
  delivery_logs: DeliveryLog[]
}

export type WebhookStatus = 'active' | 'paused' | 'disabled'

export interface DeliveryLog {
  event: string
  success: boolean
  status_code: number
  response_time_ms: number
  timestamp: string
}
