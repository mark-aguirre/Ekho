export const useApiClient = () => {
  return {
    repositories: {
      getAll: () => $fetch('/api/repositories'),
      getById: (id: string) => $fetch(`/api/repositories/${id}`),
      getTags: (id: string) => $fetch(`/api/repositories/${id}/tags`),
      getActivities: (id: string) => $fetch(`/api/repositories/${id}/activities`),
      getWebhooks: (id: string) => $fetch(`/api/repositories/${id}/webhooks`)
    }
  }
}
