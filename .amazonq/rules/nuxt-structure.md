# Nuxt v4 Folder Structure Rules

## Project Structure

Nuxt v4 uses an `app/` directory for application code:

```
my-nuxt-app/
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ pages/
│  ├─ app.vue
│  └─ error.vue
├─ public/
├─ server/
├─ types/
└─ nuxt.config.ts
```

## Core Directories

### /app
- Contains all application code
- All subdirectories follow the same conventions as Nuxt v3

### /app/pages
- File-based routing - each file becomes a route
- Use kebab-case for file names (e.g., `user-profile.vue`)
- Dynamic routes use square brackets (e.g., `[id].vue`)
- Nested routes use folders with `index.vue`

### /app/components
- Auto-imported components
- Use PascalCase for component names (e.g., `UserCard.vue`)
- Organize by feature or domain (e.g., `/app/components/repository/`, `/app/components/user/`)
- Global components in root, feature-specific in subfolders

### /app/composables
- Auto-imported composables
- Use camelCase with `use` prefix (e.g., `useApiClient.ts`, `useAuth.ts`)
- One composable per file
- Keep composables focused and reusable

### /app/layouts
- Shared page layouts
- Use kebab-case (e.g., `default.vue`, `dashboard.vue`)
- Wrap pages with common UI structure (header, sidebar, footer)

### /app/assets
- Uncompiled assets (CSS, SCSS, images)
- Processed by build tools (Vite)
- Organize by type: `/app/assets/styles/`, `/app/assets/images/`

### /server
- Server-side code and API routes (stays at root)
- `/server/api/` - API endpoints (auto-mapped to `/api/*`)
- `/server/middleware/` - Server middleware
- `/server/utils/` - Server-only utilities
- Use kebab-case for file names

### /public
- Static files served as-is (stays at root)
- Not processed by build tools
- Accessible at root URL (e.g., `/public/favicon.ico` → `/favicon.ico`)

### /types
- TypeScript type definitions (stays at root)
- Use PascalCase for interfaces/types
- Organize by domain or feature

## Naming Conventions

- **Files**: kebab-case (pages, layouts, middleware, server routes)
- **Components**: PascalCase
- **Composables**: camelCase with `use` prefix
- **Types**: PascalCase
- **Constants**: UPPER_SNAKE_CASE

## Best Practices

- Keep pages thin - move logic to composables
- Use server routes for API endpoints, not external API calls
- Organize components by feature, not by type
- Co-locate related files (component + composable + types)
- Use TypeScript for type safety
- Leverage auto-imports - avoid manual imports when possible
