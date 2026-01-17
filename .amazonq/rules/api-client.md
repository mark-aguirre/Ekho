# API Client Rules

## Always use useApiClient composable for API calls

- NEVER use $fetch, useFetch, or fetch directly in components or pages
- ALL API calls MUST go through the useApiClient() composable
- When adding new server API routes in /server/api/, ALWAYS add corresponding methods to useApiClient.ts
- Keep useApiClient.ts in sync with all available API endpoints

## Structure

```typescript
const api = useApiClient()
const data = await api.repositories.getAll()
```
