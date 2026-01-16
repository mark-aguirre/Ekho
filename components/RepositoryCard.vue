<template>
  <NuxtLink :to="`/repository/${repository.id}`" class="group block">
    <div class="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-200">
      <div class="flex items-start justify-between">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">{{ repository.name }}</h3>
            <span v-if="repository.visibility === 'public'" class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs">
              <Globe :size="12" />
              Public
            </span>
            <span v-else class="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs">
              <Lock :size="12" />
              Private
            </span>
          </div>
          <p class="text-sm text-slate-500 mb-4 line-clamp-2">{{ repository.description || 'No description provided' }}</p>
          <div class="flex items-center gap-4 text-xs text-slate-500">
            <span class="flex items-center gap-1">
              <Tag :size="14" />
              {{ repository.tags_count || 0 }} tags
            </span>
            <span class="flex items-center gap-1">
              <Download :size="14" />
              {{ formatNumber(repository.pull_count) }} pulls
            </span>
            <span class="flex items-center gap-1">
              <Star :size="14" />
              {{ repository.stars || 0 }}
            </span>
            <span class="text-slate-400">{{ formatBytes(repository.storage_bytes) }}</span>
          </div>
        </div>
        <div class="flex flex-col items-end gap-2 ml-4">
          <ChevronRight :size="20" class="text-slate-300 group-hover:text-indigo-500 transition-colors" />
          <span v-if="repository.last_pushed_at" class="flex items-center gap-1 text-xs text-slate-400">
            <Clock :size="12" />
            {{ formatDistanceToNow(new Date(repository.last_pushed_at), { addSuffix: true }) }}
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { Globe, Lock, Tag, Download, Star, Clock, ChevronRight } from 'lucide-vue-next'
import { formatDistanceToNow } from 'date-fns'

defineProps({
  repository: {
    type: Object,
    required: true
  }
})

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
