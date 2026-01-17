# TypeScript Type Definition Rules

## Use interface vs type

### Use interface for:
- API response objects
- Data models (User, Repository, Tag, etc.)
- Component props
- Function parameters that are objects
- Any object shape that might be extended

### Use type for:
- Union types: `type Status = 'active' | 'inactive' | 'pending'`
- Intersection types: `type Combined = TypeA & TypeB`
- Utility types: `type Partial<T>`, `type Pick<T, K>`
- Primitive aliases: `type ID = string | number`
- Function signatures: `type Handler = (data: string) => void`

## File Organization

- Store all type definitions in `/types` directory
- Use kebab-case for file names: `repository.ts`, `user-profile.ts`
- Group related types in the same file
- Export all types/interfaces for reuse

## Naming Conventions

- Use PascalCase for interfaces and types: `Repository`, `UserProfile`
- Use descriptive names that reflect the data structure
- Suffix response wrappers with `Response`: `ApiResponse<T>`
- Prefix enums or literal unions with their domain: `RepositoryVisibility`

## Structure Example

```typescript
// types/repository.ts
export interface Repository {
  id: string
  name: string
  visibility: RepositoryVisibility
}

export type RepositoryVisibility = 'public' | 'private'

export interface RepositoryWithDetails extends Repository {
  tags_count: number
  pull_count: number
}
```

## Best Practices

- Always define types for API responses
- Use optional properties (`?`) for nullable fields
- Prefer `interface` over `type` for object shapes (better error messages)
- Keep types close to their usage domain
- Reuse types across server and client code
- Use strict TypeScript settings (`strict: true`)
- Avoid `any` - use `unknown` if type is truly unknown
