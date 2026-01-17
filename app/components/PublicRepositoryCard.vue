<template>
  <div class="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200 flex flex-col h-full">
    <div class="flex items-start gap-3 mb-3">
      <img v-if="repository.logo" :src="repository.logo" :alt="repository.name" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
      <div v-else class="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
        {{ repository.name.charAt(0).toUpperCase() }}
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <h3 class="font-semibold text-slate-900 truncate">
            {{ repository.name }}
          </h3>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs flex-shrink-0">
            <Globe :size="12" />
            Public
          </span>
        </div>
        <p v-if="repository.owner" class="text-xs text-slate-500 flex items-center gap-1">
          <User :size="12" />
          {{ repository.owner }}
        </p>
      </div>
    </div>
    <p class="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{{ repository.description || 'No description provided' }}</p>
    <div class="flex items-center gap-4 text-xs text-slate-500 mb-3">
      <span class="flex items-center gap-1">
        <Tag :size="14" />
        {{ repository.tags_count || 0 }}
      </span>
      <span class="flex items-center gap-1">
        <Download :size="14" />
        {{ formatNumber(repository.pull_count) }}
      </span>
      <span class="flex items-center gap-1">
        <Star :size="14" />
        {{ repository.stars || 0 }}
      </span>
      <span class="text-slate-400">{{ formatBytes(repository.storage_bytes) }}</span>
    </div>
    <div class="pt-3 border-t border-slate-100">
      <div class="flex items-center gap-2 bg-slate-50 rounded px-3 py-2 text-xs font-mono text-slate-700">
        <Terminal :size="14" class="text-slate-400 flex-shrink-0" />
        <code class="flex-1 truncate">docker pull {{ repository.name }}</code>
        <button @click="copyCommand" class="text-slate-400 hover:text-[#611f69] transition-colors flex-shrink-0" :aria-label="copied ? 'Copied' : 'Copy command'">
          <Check v-if="copied" :size="14" class="text-[#2d9f5d]" />
          <Copy v-else :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Globe, Tag, Download, Star, User, Terminal, Copy, Check } from 'lucide-vue-next'

const props = defineProps({
  repository: {
    type: Object,
    required: true
  }
})

const copied = ref(false)

const copyCommand = async () => {
  await navigator.clipboard.writeText(`docker pull ${props.repository.name}`)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}

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
</script>
