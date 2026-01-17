<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <NuxtLink to="/" class="inline-flex items-center text-sm text-slate-500 hover:text-slate-700" aria-label="Back to repositories">
        <ArrowLeft :size="16" class="mr-1" />
        Back to Repositories
      </NuxtLink>
    </div>

    <div v-if="pending" class="animate-pulse space-y-6">
      <div class="h-8 bg-slate-200 rounded w-48" />
      <div class="h-32 bg-slate-100 rounded-xl" />
      <div class="h-64 bg-slate-100 rounded-xl" />
    </div>

    <div v-else-if="!repository" class="text-center py-16">
      <h2 class="text-xl font-semibold text-slate-900 mb-2">Repository not found</h2>
      <p class="text-slate-500 mb-6">The repository you're looking for doesn't exist.</p>
      <NuxtLink to="/" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg">
        <ArrowLeft :size="16" />
        Back to Repositories
      </NuxtLink>
    </div>

    <template v-else>
      <div class="bg-white rounded-xl border border-slate-200 p-6 mb-6">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h1 class="text-2xl font-bold text-slate-900">{{ repository.name }}</h1>
              <span v-if="repository.visibility === 'public'" class="inline-flex items-center gap-1 px-2 py-1 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded">
                <Globe :size="12" />
                Public
              </span>
              <span v-else class="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 border border-amber-200 rounded">
                <Lock :size="12" />
                Private
              </span>
            </div>
            <p class="text-slate-500 mb-4 max-w-2xl">{{ repository.description || 'No description provided' }}</p>
            <div class="space-y-3">
              <div>
                <p class="text-xs font-medium text-slate-600 mb-2">To push a new tag to this repository:</p>
                <div class="p-3 bg-slate-900 rounded-lg max-w-xl space-y-2">
                  <div class="flex items-center gap-2">
                    <code class="flex-1 text-sm text-slate-100 font-mono">docker tag myimage:latest imagehub.com/{{ repository.name }}:tagname</code>
                    <button @click="copyTagCommand" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded" :class="{ 'text-emerald-400': copiedTag }" aria-label="Copy tag command">
                      <CheckCircle v-if="copiedTag" :size="16" />
                      <Copy v-else :size="16" />
                    </button>
                  </div>
                  <div class="flex items-center gap-2">
                    <code class="flex-1 text-sm text-slate-100 font-mono">docker push imagehub.com/{{ repository.name }}:tagname</code>
                    <button @click="copyPushCommand" class="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded" :class="{ 'text-emerald-400': copiedPush }" aria-label="Copy push command">
                      <CheckCircle v-if="copiedPush" :size="16" />
                      <Copy v-else :size="16" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 border border-slate-200 rounded-lg hover:bg-slate-50" aria-label="Star repository">
              <Star :size="16" />
            </button>
            <div class="relative" @keydown.esc="moreMenuOpen = false">
              <button @click="moreMenuOpen = !moreMenuOpen" class="p-2 border border-slate-200 rounded-lg hover:bg-slate-50" aria-label="More options" aria-expanded="moreMenuOpen" aria-haspopup="true">
                <MoreHorizontal :size="16" />
              </button>
              <div v-if="moreMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-10" role="menu">
                <button class="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" role="menuitem">
                  <Archive :size="16" />
                  Archive
                </button>
                <div class="border-t border-slate-100 my-1"></div>
                <button @click="showDeleteDialog = true" class="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-slate-50" role="menuitem">
                  <Trash2 :size="16" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-6 mt-6 pt-6 border-t border-slate-100">
          <div class="flex items-center gap-2">
            <Download :size="16" class="text-slate-400" />
            <span class="text-sm text-slate-600"><span class="font-semibold text-slate-900">{{ formatNumber(repository.pull_count) }}</span> pulls</span>
          </div>
          <div class="flex items-center gap-2">
            <TagIcon :size="16" class="text-slate-400" />
            <span class="text-sm text-slate-600"><span class="font-semibold text-slate-900">{{ repository.tags_count || tags?.length || 0 }}</span> tags</span>
          </div>
          <div class="flex items-center gap-2">
            <HardDrive :size="16" class="text-slate-400" />
            <span class="text-sm text-slate-600"><span class="font-semibold text-slate-900">{{ formatBytes(repository.storage_bytes) }}</span></span>
          </div>
          <div class="flex items-center gap-2">
            <Star :size="16" class="text-slate-400" />
            <span class="text-sm text-slate-600"><span class="font-semibold text-slate-900">{{ repository.stars || 0 }}</span> stars</span>
          </div>
        </div>
      </div>

      <div class="bg-white border border-slate-200 rounded-xl p-1 mb-6 inline-flex" role="tablist" aria-label="Repository sections">
        <div class="flex items-center gap-1">
          <button @click="activeTab = 'overview'" :class="['px-4 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'overview' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50']" role="tab" :aria-selected="activeTab === 'overview'">
            Overview
          </button>
          <button @click="activeTab = 'tags'" :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'tags' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50']" role="tab" :aria-selected="activeTab === 'tags'">
            <TagIcon :size="16" />
            Tags
            <span class="ml-2 px-1.5 py-0.5 bg-slate-100 rounded text-xs">{{ tags?.length || 0 }}</span>
          </button>
          <button @click="activeTab = 'webhooks'" :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'webhooks' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50']" role="tab" :aria-selected="activeTab === 'webhooks'">
            <Webhook :size="16" />
            Webhooks
          </button>
          <button @click="activeTab = 'settings'" :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50']" role="tab" :aria-selected="activeTab === 'settings'">
            <Settings :size="16" />
            Settings
          </button>
        </div>
      </div>

      <div v-if="activeTab === 'overview'" class="grid lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h3 class="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Clock :size="16" />
              Activity
            </h3>
            <ActivityTimeline :activities="activities" :isLoading="activitiesLoading" />
          </div>
        </div>
        <div class="space-y-4">
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h3 class="font-semibold text-slate-900 mb-4">Recent Tags</h3>
            <div class="space-y-3">
              <div v-for="tag in tags?.slice(0, 5)" :key="tag.id" class="flex items-center justify-between text-sm">
                <code class="font-mono text-slate-700">{{ tag.name }}</code>
                <span class="px-2 py-0.5 border border-slate-200 rounded text-xs">{{ tag.architectures?.[0] || 'amd64' }}</span>
              </div>
              <p v-if="!tags || tags.length === 0" class="text-sm text-slate-500">No tags yet</p>
            </div>
            <button v-if="tags && tags.length > 5" @click="activeTab = 'tags'" class="mt-3 text-sm text-indigo-600 hover:text-indigo-700">
              View all tags
            </button>
          </div>
          <div class="bg-white rounded-xl border border-slate-200 p-6">
            <h3 class="font-semibold text-slate-900 mb-4">Quick Links</h3>
            <div class="space-y-2">
              <a href="#" class="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600">
                <ExternalLink :size="16" />
                View on Docker Hub
              </a>
              <a href="#" class="flex items-center gap-2 text-sm text-slate-600 hover:text-indigo-600">
                <ExternalLink :size="16" />
                OCI Specification
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'tags'">
        <TagsTable :tags="tags || []" :isLoading="tagsLoading" :repositoryName="repository?.name" @delete="handleDeleteTag" />
      </div>

      <div v-else-if="activeTab === 'webhooks'" class="bg-white rounded-xl border border-slate-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="font-semibold text-slate-900">Webhooks</h3>
            <p class="text-sm text-slate-500">Receive HTTP callbacks when events occur</p>
          </div>
          <button @click="showWebhookModal = true" class="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm">
            <Plus :size="16" />
            Add Webhook
          </button>
        </div>
        <div v-if="webhooksLoading" class="space-y-4">
          <div v-for="i in 3" :key="i" class="h-24 bg-slate-100 rounded-xl animate-pulse" />
        </div>
        <div v-else-if="!webhooks || webhooks.length === 0" class="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Webhook :size="32" class="mx-auto mb-2 text-slate-300" />
          <p class="text-slate-500 mb-3">No webhooks configured</p>
        </div>
        <div v-else class="space-y-3">
          <div v-for="webhook in webhooks" :key="webhook.id" class="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div class="p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-medium text-slate-900">{{ webhook.name }}</h4>
                    <span v-if="webhook.status === 'active'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded text-xs">
                      <CheckCircle :size="12" />
                      Active
                    </span>
                    <span v-else class="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs">
                      <Pause :size="12" />
                      Paused
                    </span>
                  </div>
                  <p class="text-sm text-slate-500 font-mono truncate">{{ webhook.url }}</p>
                  <div class="flex items-center gap-2 mt-2 flex-wrap">
                    <span v-for="event in webhook.events" :key="event" class="px-2 py-0.5 border border-slate-200 rounded text-xs">{{ event }}</span>
                  </div>
                </div>
              </div>
              <button v-if="webhook.delivery_logs?.length > 0" @click="toggleDeliveryLogs(webhook.id)" class="flex items-center gap-1 mt-3 text-sm text-slate-500 hover:text-slate-700">
                <ChevronRight :size="16" :class="{ 'rotate-90': expandedWebhook === webhook.id }" class="transition-transform" />
                View delivery logs ({{ webhook.delivery_logs.length }})
              </button>
              <div v-if="expandedWebhook === webhook.id" class="mt-4 border-t border-slate-100 pt-4">
                <DeliveryLogs :logs="webhook.delivery_logs" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'settings'" class="space-y-6">
        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-base font-semibold text-slate-900 mb-1">Visibility</h3>
          <p class="text-sm text-slate-500 mb-4">Control who can see and pull from this repository</p>
          <div class="flex gap-3">
            <button :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium', repository.visibility === 'public' ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50']">
              <Globe :size="16" />
              Public
            </button>
            <button :class="['flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium', repository.visibility === 'private' ? 'bg-indigo-600 text-white' : 'border border-slate-200 text-slate-700 hover:bg-slate-50']">
              <Lock :size="16" />
              Private
            </button>
          </div>
          <p class="text-sm text-slate-500 mt-3">{{ repository.visibility === 'public' ? 'Anyone can pull images from this repository' : 'Only collaborators can pull images from this repository' }}</p>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-base font-semibold text-slate-900 mb-1">Tag Immutability</h3>
          <p class="text-sm text-slate-500 mb-4">Prevent tags from being overwritten or deleted</p>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <Shield :size="20" class="text-slate-400" />
              <div>
                <p class="font-medium text-slate-900">Enable tag immutability</p>
                <p class="text-sm text-slate-500">Once pushed, tags cannot be modified</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" :checked="repository.tag_immutability">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-base font-semibold text-slate-900 mb-1">Protected Tags</h3>
          <p class="text-sm text-slate-500 mb-4">Tags that cannot be deleted (supports wildcards: v*, latest)</p>
          <div class="flex gap-2 mb-4">
            <input v-model="protectedTagInput" placeholder="e.g., v*, latest, release-*" class="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Protected tag pattern" @keydown.enter="addProtectedTag">
            <button @click="addProtectedTag" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" :disabled="!protectedTagInput.trim()" aria-label="Add protected tag">
              <Plus :size="16" />
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in repository.protected_tags" :key="tag" class="inline-flex items-center gap-1 px-2 py-1 bg-violet-50 text-violet-700 border border-violet-200 rounded">
              <Shield :size="12" />
              {{ tag }}
              <button @click="removeProtectedTag(tag)" class="ml-1 hover:text-violet-900">×</button>
            </span>
            <p v-if="!repository.protected_tags || repository.protected_tags.length === 0" class="text-sm text-slate-500">No protected tags configured</p>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 p-6">
          <h3 class="text-base font-semibold text-slate-900 mb-1">Retention Policy</h3>
          <p class="text-sm text-slate-500 mb-4">Automatically clean up old tags to save storage</p>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <Clock :size="20" class="text-slate-400" />
              <div>
                <p class="font-medium text-slate-900">Enable retention policy</p>
                <p class="text-sm text-slate-500">Automatically delete old tags</p>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" :checked="repository.retention_policy?.enabled">
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
          <div v-if="repository.retention_policy?.enabled" class="flex items-center gap-3 pl-8">
            <label class="text-sm text-slate-700">Keep last</label>
            <select v-model="retentionCount" class="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <label class="text-sm text-slate-700">tags</label>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-red-200 p-6">
          <h3 class="text-base font-semibold text-red-600 mb-4">Danger Zone</h3>
          <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900">Delete Repository</p>
              <p class="text-sm text-slate-500">Permanently delete this repository and all its images</p>
            </div>
            <button @click="showDeleteDialog = true" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Delete Repository</button>
          </div>
        </div>
      </div>
    </template>

    <ConfirmDialog :isOpen="showDeleteDialog" title="Delete Repository?" :message="`Are you sure you want to delete ${repository?.name}? This action cannot be undone and will permanently delete all images and tags.`" confirmText="Delete" variant="danger" @confirm="handleDeleteRepository" @cancel="showDeleteDialog = false" />
    <CreateWebhookModal :isOpen="showWebhookModal" :repositoryId="repositoryId" @close="showWebhookModal = false" @submit="handleCreateWebhook" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, Globe, Lock, Copy, Star, Download, Tag as TagIcon, HardDrive, Webhook, Settings, MoreHorizontal, Archive, Trash2, Clock, ExternalLink, Plus, CheckCircle, Pause, ChevronRight, Shield, XCircle } from 'lucide-vue-next'
import ActivityTimeline from '~/components/registry/ActivityTimeline.vue'
import TagsTable from '~/components/registry/TagsTable.vue'
import DeliveryLogs from '~/components/registry/DeliveryLogs.vue'
import ConfirmDialog from '~/components/ui/ConfirmDialog.vue'
import CreateWebhookModal from '~/components/ui/CreateWebhookModal.vue'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const repositoryId = String(route.params.id)

const activeTab = ref('overview')
const moreMenuOpen = ref(false)
const protectedTagInput = ref('')
const retentionCount = ref('10')
const copied = ref(false)
const copiedTag = ref(false)
const copiedPush = ref(false)
const showDeleteDialog = ref(false)
const showWebhookModal = ref(false)
const expandedWebhook = ref(null)
const { success, error } = useToast()

const apiClient = useApiClient()
const { data: repository, pending } = await apiClient.repositories.getById(repositoryId)
const { data: tags, pending: tagsLoading } = await apiClient.repositories.getTags(repositoryId)

if (tags.value && repository.value) {
  tags.value = tags.value.map(tag => ({ ...tag, repository_name: repository.value.name }))
}
const { data: activities, pending: activitiesLoading } = await apiClient.repositories.getActivities(repositoryId)
const { data: webhooks, pending: webhooksLoading } = await apiClient.repositories.getWebhooks(repositoryId)

const copyTagCommand = async () => {
  const command = `docker tag myimage:latest imagehub.com/${repository.value?.name || 'repo'}:tagname`
  try {
    await navigator.clipboard.writeText(command)
    copiedTag.value = true
    success('Command copied to clipboard')
    setTimeout(() => copiedTag.value = false, 2000)
  } catch (e) {
    error('Failed to copy command')
  }
}

const copyPushCommand = async () => {
  const command = `docker push imagehub.com/${repository.value?.name || 'repo'}:tagname`
  try {
    await navigator.clipboard.writeText(command)
    copiedPush.value = true
    success('Command copied to clipboard')
    setTimeout(() => copiedPush.value = false, 2000)
  } catch (e) {
    error('Failed to copy command')
  }
}

const handleDeleteTag = (tag) => {
  success(`Tag ${tag.name} deleted successfully`)
}

const handleDeleteRepository = async () => {
  showDeleteDialog.value = false
  success('Repository deleted successfully')
  setTimeout(() => navigateTo('/'), 1500)
}

const addProtectedTag = () => {
  if (!protectedTagInput.value.trim()) return
  if (!repository.value.protected_tags) repository.value.protected_tags = []
  if (repository.value.protected_tags.includes(protectedTagInput.value.trim())) {
    error('Tag pattern already exists')
    return
  }
  repository.value.protected_tags.push(protectedTagInput.value.trim())
  success('Protected tag added')
  protectedTagInput.value = ''
}

const removeProtectedTag = (tag) => {
  if (repository.value.protected_tags) {
    repository.value.protected_tags = repository.value.protected_tags.filter(t => t !== tag)
    success('Protected tag removed')
  }
}

const handleClickOutside = (e) => {
  if (moreMenuOpen.value && !e.target.closest('[aria-haspopup="true"]')) {
    moreMenuOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatNumber = (num) => {
  if (!num) return '0'
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toString()
}

const toggleDeliveryLogs = (webhookId) => {
  expandedWebhook.value = expandedWebhook.value === webhookId ? null : webhookId
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const handleCreateWebhook = async (data) => {
  try {
    const newWebhook = await apiClient.repositories.createWebhook(repositoryId, data)
    if (webhooks.value) {
      webhooks.value.push(newWebhook)
    } else {
      webhooks.value = [newWebhook]
    }
    showWebhookModal.value = false
    success('Webhook created successfully')
  } catch (e) {
    error('Failed to create webhook')
  }
}
</script>
