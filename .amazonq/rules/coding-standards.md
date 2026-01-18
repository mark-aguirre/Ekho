# General Coding Standards

## Code Style

- Use 2 spaces for indentation
- Max line length: 100 characters
- Use single quotes for strings (except JSON)
- Always use semicolons
- Trailing commas in multi-line objects/arrays

## Naming Conventions

- **Variables/Functions**: camelCase (`getUserData`, `isActive`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Classes/Interfaces**: PascalCase (`UserProfile`, `ApiClient`)
- **Files**: kebab-case (`user-profile.ts`, `api-client.ts`)
- **Booleans**: Prefix with `is`, `has`, `should` (`isLoading`, `hasAccess`)

## Functions

- Keep functions small and focused (single responsibility)
- Max 20-30 lines per function
- Use descriptive names that explain what the function does
- Avoid side effects in pure functions
- Return early to reduce nesting

```typescript
// Good
function getUser(id: string) {
  if (!id) return null
  return users.find(u => u.id === id)
}

// Bad
function getUser(id: string) {
  if (id) {
    return users.find(u => u.id === id)
  } else {
    return null
  }
}
```

## Variables

- Use `const` by default, `let` only when reassignment is needed
- Never use `var`
- Declare variables close to their usage
- One variable per declaration
- Avoid magic numbers - use named constants

## Comments

- Write self-documenting code - minimize comments
- Use comments for "why", not "what"
- Keep comments up-to-date with code changes
- Use JSDoc for public APIs and complex functions
- Remove commented-out code

## Error Handling

- Always handle errors explicitly
- Use try-catch for async operations
- Provide meaningful error messages
- Log errors with context
- Never swallow errors silently

```typescript
try {
  await api.deleteRepository(id)
} catch (error) {
  console.error('Failed to delete repository:', id, error)
  throw new Error('Repository deletion failed')
}
```

## Async/Await

- Prefer async/await over promises
- Always await async functions
- Handle errors with try-catch
- Avoid mixing async/await with .then()

## Code Organization

- Group related code together
- Separate concerns (logic, UI, data)
- Keep files under 300 lines
- Extract reusable logic into utilities/composables
- Order: imports → types → constants → functions → exports

## DRY Principle

- Don't repeat yourself
- Extract duplicated code into functions/composables
- Use loops instead of repetitive code
- Create reusable components

## Performance

- Avoid premature optimization
- Use lazy loading for large components
- Debounce/throttle frequent operations
- Minimize re-renders/re-computations
- Clean up event listeners and timers

## Security

- Never commit secrets or API keys
- Sanitize user input
- Use environment variables for sensitive data
- Validate data on both client and server
- Use HTTPS for API calls

## Testing

- Write tests for critical business logic
- Test edge cases and error scenarios
- Keep tests simple and readable
- Mock external dependencies
- Aim for meaningful coverage, not 100%

## Git Commits

- Use clear, descriptive commit messages
- Start with verb: "Add", "Fix", "Update", "Remove"
- Keep commits atomic (one logical change)
- Reference issue numbers when applicable

```
Add repository deletion confirmation modal
Fix webhook URL validation regex
Update user authentication flow
Remove deprecated API endpoints
```
