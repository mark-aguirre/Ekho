# TypeScript & Vue Coding Standards

## TypeScript

### Type Safety

- Enable strict mode in tsconfig.json
- Avoid `any` - use `unknown` or proper types
- Define explicit return types for functions
- Use type inference for simple variables
- Prefer interfaces over types for objects

```typescript
// Good
function getRepository(id: string): Repository | null {
  return repositories.find(r => r.id === id) ?? null
}

// Bad
function getRepository(id: any): any {
  return repositories.find(r => r.id === id)
}
```

### Type Definitions

- Define types in `/types` directory
- Export all types for reuse
- Use generics for reusable types
- Avoid type assertions unless necessary
- Use utility types (Partial, Pick, Omit, etc.)

```typescript
// Good
interface ApiResponse<T> {
  data: T
  error?: string
}

// Usage
const response: ApiResponse<Repository[]> = await api.get()
```

### Null Safety

- Use optional chaining (`?.`)
- Use nullish coalescing (`??`)
- Check for null/undefined explicitly
- Avoid non-null assertions (`!`) unless certain

```typescript
// Good
const name = user?.profile?.name ?? 'Anonymous'

// Bad
const name = user.profile.name || 'Anonymous'
```

### Enums vs Union Types

- Prefer union types over enums
- Use const enums if enums are needed
- Use string literals for better type safety

```typescript
// Good
type Status = 'active' | 'inactive' | 'pending'

// Acceptable
const enum Visibility {
  Public = 'public',
  Private = 'private'
}
```

## Vue 3 Composition API

### Script Setup

- Always use `<script setup lang="ts">`
- Define props with defineProps<T>()
- Define emits with defineEmits<T>()
- Use TypeScript for prop validation

```vue
<script setup lang="ts">
interface Props {
  repository: Repository
  isLoading?: boolean
}

interface Emits {
  (e: 'delete', id: string): void
  (e: 'update', repo: Repository): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>
```

### Composables

- Use composables for reusable logic
- Prefix with `use` (useAuth, useApiClient)
- Return reactive refs/computed values
- Keep composables focused and single-purpose

```typescript
export function useRepository(id: Ref<string>) {
  const repository = ref<Repository | null>(null)
  const isLoading = ref(false)

  async function fetchRepository() {
    isLoading.value = true
    try {
      repository.value = await api.repositories.getById(id.value)
    } finally {
      isLoading.value = false
    }
  }

  return { repository, isLoading, fetchRepository }
}
```

### Reactivity

- Use `ref()` for primitives
- Use `reactive()` for objects (sparingly)
- Use `computed()` for derived state
- Use `watch()` for side effects
- Always `.value` when accessing refs in script

```typescript
const count = ref(0)
const doubled = computed(() => count.value * 2)

watch(count, (newVal) => {
  console.log('Count changed:', newVal)
})
```

### Template Syntax

- Use v-if for conditional rendering
- Use v-show for toggling visibility
- Use v-for with :key (unique identifiers)
- Avoid v-if with v-for on same element
- Use shorthand syntax (`:`, `@`, `#`)

```vue
<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else>
    <div
      v-for="repo in repositories"
      :key="repo.id"
      @click="selectRepo(repo)"
    >
      {{ repo.name }}
    </div>
  </div>
</template>
```

### Component Structure

- Order: script setup → template → style
- Keep templates simple and readable
- Extract complex logic to composables
- Use computed for template calculations
- Limit template expressions to simple operations

```vue
<script setup lang="ts">
// Imports
import { ref, computed } from 'vue'

// Props & Emits
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// State
const isOpen = ref(false)

// Computed
const displayName = computed(() => props.user.name.toUpperCase())

// Methods
function handleClick() {
  emit('click', props.user.id)
}
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

### Props

- Always define prop types
- Use optional props with `?`
- Provide defaults for optional props
- Validate props with TypeScript interfaces
- Keep props immutable (don't modify)

```typescript
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = withDefaults(defineProps<Props>(), {
  count: 0
})
```

### Events

- Use typed emits
- Name events with kebab-case in templates
- Use descriptive event names
- Pass minimal data in events

```typescript
interface Emits {
  (e: 'repository-deleted', id: string): void
  (e: 'update:modelValue', value: string): void
}

const emit = defineEmits<Emits>()

// Usage
emit('repository-deleted', repo.id)
```

### Lifecycle Hooks

- Use onMounted for initialization
- Use onUnmounted for cleanup
- Avoid onBeforeMount (use onMounted)
- Keep lifecycle hooks minimal

```typescript
onMounted(async () => {
  await fetchData()
})

onUnmounted(() => {
  clearInterval(timer)
})
```

### Refs & DOM Access

- Use template refs sparingly
- Type template refs properly
- Access refs only after onMounted
- Prefer declarative over imperative

```typescript
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  inputRef.value?.focus()
})
```

### Styling

- Use scoped styles by default
- Use Tailwind CSS utility classes
- Avoid deep selectors unless necessary
- Keep component styles minimal
- Use CSS variables for theming

```vue
<style scoped>
.card {
  @apply rounded-xl border border-slate-200 p-5;
}

.card:hover {
  @apply border-slate-400 shadow-lg;
}
</style>
```

## Best Practices

- Keep components under 200 lines
- Extract complex logic to composables
- Use TypeScript for all files
- Avoid prop drilling - use provide/inject
- Use Nuxt auto-imports (no manual imports)
- Test components with user interactions
- Use semantic HTML elements
- Ensure accessibility (ARIA, keyboard nav)
