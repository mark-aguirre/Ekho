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
          <input ref="searchInput" v-model="searchQuery" type="text" placeholder="Search applications... (Press / to focus)" aria-label="Search applications" class="w-full pl-10 pr-10 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#611f69]" />
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear search">
            <X :size="16" />
          </button>
        </div>
        <div class="relative">
          <button @click="sortOpen = !sortOpen" class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#611f69] bg-white" aria-label="Sort repositories">
            <ArrowUpDown :size="16" class="text-slate-500" />
            <span class="text-sm">{{ sortBy === 'updated' ? 'Recently updated' : sortBy === 'name' ? 'Name' : sortBy === 'pulls' ? 'Most pulls' : 'Most stars' }}</span>
            <ChevronDown :size="16" class="text-slate-400" />
          </button>
          <div v-if="sortOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10">
            <button @click="sortBy = 'updated'; sortOpen = false" class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" :class="{ 'text-[#611f69] font-medium': sortBy === 'updated' }">
              Recently updated
            </button>
            <button @click="sortBy = 'name'; sortOpen = false" class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" :class="{ 'text-[#611f69] font-medium': sortBy === 'name' }">
              Name
            </button>
            <button @click="sortBy = 'pulls'; sortOpen = false" class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" :class="{ 'text-[#611f69] font-medium': sortBy === 'pulls' }">
              Most pulls
            </button>
            <button @click="sortBy = 'stars'; sortOpen = false" class="w-full text-left px-3 py-2 text-sm hover:bg-slate-50" :class="{ 'text-[#611f69] font-medium': sortBy === 'stars' }">
              Most stars
            </button>
          </div>
        </div>
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

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { Search, Package, ArrowUpDown, ChevronDown, X } from 'lucide-vue-next';

definePageMeta({
  middleware: 'auth'
});

const searchQuery = ref('');
const debouncedSearch = ref('');
const sortBy = ref('updated');
const sortOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

const api = useApiClient();
const { data: repositories, pending } = await api.repositories.getPublic();

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
watch(searchQuery, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = newVal;
  }, 300);
});

const filteredRepositories = computed(() => {
  if (!repositories.value) return [];
  
  return repositories.value
    .filter(repo => {
      if (!debouncedSearch.value) return true;
      const query = debouncedSearch.value.toLowerCase();
      return repo.name?.toLowerCase().includes(query) || 
             repo.description?.toLowerCase().includes(query) ||
             repo.tags?.some(tag => tag.toLowerCase().includes(query));
    })
    .sort((a, b) => {
      switch (sortBy.value) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'pulls':
          return (b.pull_count || 0) - (a.pull_count || 0);
        case 'stars':
          return (b.stars || 0) - (a.stars || 0);
        case 'updated':
        default:
          return new Date(b.last_pushed_at || b.updated_date || 0) - new Date(a.last_pushed_at || a.updated_date || 0);
      }
    });
});

const handleClickOutside = (e: Event) => {
  if (!(e.target as Element).closest('[aria-label="Sort repositories"]')) sortOpen.value = false;
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === '/' && document.activeElement !== searchInput.value) {
    e.preventDefault();
    searchInput.value?.focus();
  }
  if (e.key === 'Escape' && document.activeElement === searchInput.value) {
    searchQuery.value = '';
    searchInput.value?.blur();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleKeydown);
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>
