<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <div class="relative flex-1 w-full">
        <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input v-model="searchQuery" placeholder="Search tags or digests..." class="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Search tags" />
      </div>
      <span class="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm" aria-live="polite">{{ filteredTags.length }} tags</span>
    </div>

    <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Tag</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Pull Command</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Digest</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Size</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Architecture</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-slate-700">Pushed</th>
              <th class="px-4 py-3 w-12"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
          <tr v-if="isLoading" v-for="i in 5" :key="i">
            <td colspan="6" class="px-4 py-3">
              <div class="h-10 bg-slate-100 rounded animate-pulse" />
            </td>
          </tr>
          <tr v-else-if="filteredTags.length === 0">
            <td colspan="6" class="text-center py-12">
              <Tag :size="32" class="mx-auto mb-2 text-slate-300" />
              <p class="text-slate-500">No tags found</p>
            </td>
          </tr>
          <tr v-else v-for="tag in filteredTags" :key="tag.id" class="border-b border-slate-100 hover:bg-slate-50/50">
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <span class="font-mono font-medium text-slate-900">{{ tag.name }}</span>
                <span v-if="tag.is_protected" class="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-50 text-violet-700 border border-violet-200 rounded text-xs">
                  <Shield :size="12" />
                  Protected
                </span>
              </div>
            </td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-2">
                <code class="text-xs text-slate-600 font-mono">docker pull eKho.com/{{ getRepoName(tag) }}:{{ tag.name }}</code>
                <button @click="copyPullCommand(tag)" class="p-1 text-slate-400 hover:text-slate-600 rounded" :class="{ 'text-emerald-600': copiedTagId === tag.id }" aria-label="Copy pull command">
                  <CheckCircle v-if="copiedTagId === tag.id" :size="14" />
                  <Copy v-else :size="14" />
                </button>
              </div>
            </td>
            <td class="px-4 py-3">
              <code class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded font-mono">{{ tag.digest?.slice(7, 19) }}...</code>
            </td>
            <td class="px-4 py-3 text-slate-600">{{ formatBytes(tag.size_bytes) }}</td>
            <td class="px-4 py-3">
              <div class="flex items-center gap-1 flex-wrap">
                <span v-if="tag.is_multi_arch" class="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs">Multi-arch</span>
                <span v-for="arch in tag.architectures" :key="arch" class="px-2 py-0.5 border border-slate-200 rounded text-xs">{{ arch }}</span>
              </div>
            </td>
            <td class="px-4 py-3 text-slate-500 text-sm">{{ tag.pushed_at ? formatDistanceToNow(new Date(tag.pushed_at), { addSuffix: true }) : '-' }}</td>
            <td class="px-4 py-3">
              <button @click="handleDelete(tag)" class="p-2 text-slate-400 hover:text-red-600 rounded" aria-label="Delete tag">
                <Trash2 :size="16" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>

    <ConfirmDialog :isOpen="showDeleteDialog" title="Delete Tag?" :message="`Are you sure you want to delete tag ${tagToDelete?.name}? This action cannot be undone.`" confirmText="Delete" variant="danger" @confirm="confirmDelete" @cancel="showDeleteDialog = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Search, Tag, Shield, Trash2, Copy, CheckCircle } from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps({
  tags: Array,
  isLoading: Boolean,
  repositoryName: String
})

const emit = defineEmits(['delete'])

const searchQuery = ref('')
const showDeleteDialog = ref(false)
const tagToDelete = ref(null)
const copiedTagId = ref(null)
const { success, error } = useToast()

const getRepoName = (tag) => {
  return props.repositoryName || tag.repository_name || 'repository'
}

const copyPullCommand = async (tag) => {
  const command = `docker pull eKho.com/${getRepoName(tag)}:${tag.name}`
  try {
    await navigator.clipboard.writeText(command)
    copiedTagId.value = tag.id
    success('Pull command copied')
    setTimeout(() => copiedTagId.value = null, 2000)
  } catch (e) {
    error('Failed to copy command')
  }
}

const handleDelete = (tag) => {
  tagToDelete.value = tag
  showDeleteDialog.value = true
}

const confirmDelete = () => {
  emit('delete', tagToDelete.value)
  showDeleteDialog.value = false
  tagToDelete.value = null
}

const filteredTags = computed(() => {
  if (!props.tags) return []
  return props.tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    tag.digest?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}
</script>
