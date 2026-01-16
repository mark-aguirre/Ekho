import { $fetch } from 'ofetch'

export const useApiClient = () => {
  return {
    repositories: {
      getAll: () => $fetch('/api/repositories'),
      getById: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}`).catch(() => null)
      },
      getTags: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/tags`).catch(() => [])
      },
      getActivities: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/activities`).catch(() => [])
      },
      getWebhooks: (id: string) => {
        if (!id) throw new Error('Repository ID is required')
        return $fetch(`/api/repositories/${id}/webhooks`).catch(() => [])
      }
    }
  }
}
