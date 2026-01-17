# Middleware Rules

## Authentication Middleware

- ALWAYS use `useCookie()` for authentication checks in middleware
- NEVER use `process.client` checks - middleware must run on both server and client
- Server-side checks prevent FOUC (Flash of Unstyled Content) before redirects

```typescript
export default defineNuxtRouteMiddleware((to, from) => {
  const userCookie = useCookie('user')
  
  if (!userCookie.value) {
    return navigateTo('/', { replace: true })
  }
})
```

## Why This Matters

- Client-only checks (`process.client`) cause pages to render before redirecting
- Server-side checks prevent unauthorized pages from rendering at all
- `useCookie()` works universally on both server and client
