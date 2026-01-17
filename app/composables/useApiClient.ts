import type { Repository, Tag, Activity, Webhook } from '@@/types/repository'
import type { UserProfile, Subscription, Usage } from '@@/types/user'
import { useFetch } from '#app'

export const useApiClient = () => {
  return {
    repositories: {
      getAll: () => useFetch<Repository[]>('/api/repositories', { key: 'repositories' }),
      getById: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return useFetch<Repository>(`/api/repositories/${id}`, { key: `repository-${id}` })
      },
      getTags: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return useFetch<Tag[]>(`/api/repositories/${id}/tags`, { key: `tags-${id}` })
      },
      getActivities: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return useFetch<Activity[]>(`/api/repositories/${id}/activities`, { key: `activities-${id}` })
      },
      getWebhooks: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return useFetch<Webhook[]>(`/api/repositories/${id}/webhooks`, { key: `webhooks-${id}` })
      },
      createWebhook: async (id: string, data: any) => {
        if (!id) throw new Error('Repository ID is required')
        return await $fetch<Webhook>(`/api/repositories/${id}/webhooks`, {
          method: 'POST',
          body: data
        })
      },
      updateWebhook: async (id: string, webhookId: string, data: any) => {
        if (!id || !webhookId) throw new Error('Repository ID and Webhook ID are required')
        return await $fetch<Webhook>(`/api/repositories/${id}/webhooks/${webhookId}`, {
          method: 'PUT',
          body: data
        })
      },
      deleteWebhook: async (id: string, webhookId: string) => {
        if (!id || !webhookId) throw new Error('Repository ID and Webhook ID are required')
        return await $fetch(`/api/repositories/${id}/webhooks/${webhookId}`, {
          method: 'DELETE'
        })
      },
      updateWebhookStatus: async (id: string, webhookId: string, status: string) => {
        if (!id || !webhookId) throw new Error('Repository ID and Webhook ID are required')
        return await $fetch<Webhook>(`/api/repositories/${id}/webhooks/${webhookId}/status`, {
          method: 'PATCH',
          body: { status }
        })
      },
      testWebhook: async (id: string, webhookId: string) => {
        if (!id || !webhookId) throw new Error('Repository ID and Webhook ID are required')
        return await $fetch<{ success: boolean; status_code?: number; error?: string }>(`/api/repositories/${id}/webhooks/${webhookId}/test`, {
          method: 'POST'
        })
      }
    },
    user: {
      getProfile: () => useFetch<UserProfile>('/api/user/profile', { key: 'user-profile' }),
      getSubscription: () => useFetch<Subscription>('/api/user/subscription', { key: 'user-subscription' }),
      getUsage: () => useFetch<Usage>('/api/user/usage', { key: 'user-usage' })
    }
  }
}
