<template>
  <div class="w-[80%] mx-auto px-6 py-8">
    <div class="mb-8">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-slate-900">Repositories</h1>
          <p class="text-slate-500 mt-1">Browse and manage your container image repositories</p>
        </div>
        <button @click="showCreateModal = true" class="flex items-center gap-2 px-4 py-2 bg-[#611f69] hover:bg-[#4a154b] text-white rounded-lg" aria-label="Create new repository">
          <Plus :size="16" />
          New Repository
        </button>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input v-model="searchQuery" type="text" placeholder="Search repositories..." aria-label="Search repositories" class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" />
        </div>
        <div class="flex gap-2">
          <select v-model="visibilityFilter" class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" aria-label="Filter by visibility">
            <option value="all">All</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <select v-model="sortBy" class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" aria-label="Sort repositories">
            <option value="updated">Recently updated</option>
            <option value="name">Name</option>
            <option value="pulls">Most pulls</option>
            <option value="stars">Most stars</option>
          </select>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between mb-4">
      <p class="text-sm text-slate-500">{{ filteredRepositories.length }} {{ filteredRepositories.length === 1 ? 'repository' : 'repositories' }}</p>
    </div>

    <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="h-64 bg-slate-100 rounded-xl animate-pulse" />
    </div>

    <div v-else-if="filteredRepositories.length === 0" class="text-center py-16 bg-white rounded-xl border border-slate-200">
      <Package :size="48" class="mx-auto mb-4 text-slate-300" aria-hidden="true" />
      <h3 class="text-lg font-medium text-slate-900 mb-2">{{ searchQuery || visibilityFilter !== 'all' ? 'No repositories found' : 'No repositories yet' }}</h3>
      <p class="text-slate-500 mb-6 max-w-md mx-auto">{{ searchQuery || visibilityFilter !== 'all' ? 'Try adjusting your search or filters' : 'Create your first repository to start pushing container images' }}</p>
      <button v-if="!searchQuery && visibilityFilter === 'all'" @click="showCreateModal = true" class="flex items-center gap-2 px-4 py-2 bg-[#611f69] hover:bg-[#4a154b] text-white rounded-lg mx-auto" aria-label="Create repository">
        <Plus :size="16" />
        Create Repository
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <RepositoryCard v-for="repo in filteredRepositories" :key="repo.id" :repository="repo" />
    </div>

    <CreateRepositoryModal :isOpen="showCreateModal" @create="handleCreateRepository" @cancel="showCreateModal = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Plus, Package } from 'lucide-vue-next'
import CreateRepositoryModal from '~/components/ui/CreateRepositoryModal.vue'
import { useToast } from '~/composables/useToast'

const searchQuery = ref('')
const visibilityFilter = ref('all')
const sortBy = ref('updated')
const showCreateModal = ref(false)
const { success } = useToast()

const api = useApiClient()
const { data: repositories, pending, refresh } = await api.repositories.getAll()

const handleCreateRepository = async (repoData) => {
  success(`Repository "${repoData.name}" created successfully`)
  showCreateModal.value = false
  await refresh()
}

const filteredRepositories = computed(() => {
  if (!repositories.value) return []
  
  return repositories.value
    .filter(repo => {
      const matchesSearch = repo.name?.toLowerCase().includes(searchQuery.value.toLowerCase()) || repo.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesVisibility = visibilityFilter.value === 'all' || repo.visibility === visibilityFilter.value
      return matchesSearch && matchesVisibility
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
