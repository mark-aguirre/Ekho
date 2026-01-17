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
      }
    },
    user: {
      getProfile: () => useFetch<UserProfile>('/api/user/profile', { key: 'user-profile' }),
      getSubscription: () => useFetch<Subscription>('/api/user/subscription', { key: 'user-subscription' }),
      getUsage: () => useFetch<Usage>('/api/user/usage', { key: 'user-usage' })
    }
  }
}
