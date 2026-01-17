<template>
  <div class="w-[80%] mx-auto px-6 py-8">
    <div class="mb-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-slate-900">Public Applications</h1>
        <p class="text-slate-500 mt-1">Discover and explore community applications</p>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input v-model="searchQuery" type="text" placeholder="Search applications..." aria-label="Search applications" class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" />
        </div>
        <select v-model="sortBy" class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" aria-label="Sort repositories">
          <option value="updated">Recently updated</option>
          <option value="name">Name</option>
          <option value="pulls">Most pulls</option>
          <option value="stars">Most stars</option>
        </select>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-slate-500">{{ filteredRepositories.length }} {{ filteredRepositories.length === 1 ? 'application' : 'applications' }}</p>
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="h-64 bg-slate-100 rounded-xl animate-pulse" />
    </div>

    <div v-else-if="filteredRepositories.length === 0" class="text-center py-16 bg-white rounded-xl border border-slate-200">
      <Package :size="48" class="mx-auto mb-4 text-slate-300" aria-hidden="true" />
      <h3 class="text-lg font-medium text-slate-900 mb-2">No applications found</h3>
      <p class="text-slate-500 mb-6 max-w-md mx-auto">Try adjusting your search</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <PublicRepositoryCard v-for="repo in filteredRepositories" :key="repo.id" :repository="repo" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Package } from 'lucide-vue-next'

const searchQuery = ref('')
const sortBy = ref('updated')

const api = useApiClient()
const { data: repositories, pending } = await api.repositories.getPublic()

const filteredRepositories = computed(() => {
  if (!repositories.value) return []
  
  return repositories.value
    .filter(repo => {
      const matchesSearch = repo.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || repo.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        case 'pulls':
          return (b.pull_count || 0) - (a.pull_count || 0)
        case 'stars':
          return (b.stars || 0) - (a.stars || 0)
        case 'updated':
        default:
          return new Date(b.last_pushed_at || b.updated_date || 0) - new Date(a.last_pushed_at || a.updated_date || 0)
      }
    })
})
</script>
