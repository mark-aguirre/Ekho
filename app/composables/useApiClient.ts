import { $fetch } from 'ofetch'
import type { Repository, Tag, Activity, Webhook } from '~/types/repository'
import type { UserProfile, Subscription, Usage } from '~/types/user'

export const useApiClient = () => {
  return {
    repositories: {
      getAll: (): Promise<Repository[]> => $fetch('/api/repositories'),
      getById: (id: string): Promise<Repository | null> => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}`).catch(() => null)
      },
      getTags: (id: string): Promise<Tag[]> => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/tags`).catch(() => [])
      },
      getActivities: (id: string): Promise<Activity[]> => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/activities`).catch(() => [])
      },
      getWebhooks: (id: string): Promise<Webhook[]> => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/webhooks`).catch(() => [])
      }
    },
    user: {
      getProfile: (): Promise<UserProfile> => $fetch('/api/user/profile'),
      getSubscription: (): Promise<Subscription> => $fetch('/api/user/subscription'),
      getUsage: (): Promise<Usage> => $fetch('/api/user/usage')
    }
  }
}
