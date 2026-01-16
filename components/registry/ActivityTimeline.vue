<template>
  <div v-if="isLoading" class="space-y-4">
    <div v-for="i in 5" :key="i" class="flex gap-4 animate-pulse">
      <div class="w-10 h-10 rounded-full bg-slate-200" />
      <div class="flex-1 space-y-2">
        <div class="h-4 bg-slate-200 rounded w-3/4" />
        <div class="h-3 bg-slate-100 rounded w-1/2" />
      </div>
    </div>
  </div>

  <div v-else-if="!activities || activities.length === 0" class="text-center py-12">
    <Clock :size="32" class="mx-auto mb-2 text-slate-300" />
    <p class="text-slate-500">No recent activity</p>
  </div>

  <div v-else class="relative">
    <div class="absolute left-5 top-0 bottom-0 w-px bg-slate-200" />
    <div class="space-y-6">
      <div v-for="(activity, index) in activities" :key="activity.id || index" class="relative flex gap-4">
        <div :class="['relative z-10 w-10 h-10 rounded-full flex items-center justify-center', getActionConfig(activity.action).color]">
          <component :is="getActionConfig(activity.action).icon" :size="16" />
        </div>
        <div class="flex-1 pt-1">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-medium text-slate-900">{{ activity.actor }}</span>
            <span class="text-slate-500">{{ getActionText(activity.action) }}</span>
            <code v-if="activity.target" class="text-sm bg-slate-100 px-2 py-0.5 rounded font-mono text-slate-700">{{ activity.target }}</code>
          </div>
          <div class="flex items-center gap-2 mt-1 text-sm text-slate-400">
            <time :datetime="activity.created_date" :title="activity.created_date ? format(new Date(activity.created_date), 'PPpp') : ''">
              {{ activity.created_date ? formatDistanceToNow(new Date(activity.created_date), { addSuffix: true }) : '-' }}
            </time>
            <template v-if="activity.ip_address">
              <span>•</span>
              <span>{{ activity.ip_address }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Upload, Trash2, Tag, Download, Settings, Clock } from 'lucide-vue-next'
import { formatDistanceToNow, format } from 'date-fns'

defineProps({
  activities: Array,
  isLoading: Boolean
})

const actionConfigs = {
  push: { icon: Upload, color: 'bg-emerald-100 text-emerald-600' },
  delete: { icon: Trash2, color: 'bg-red-100 text-red-600' },
  retag: { icon: Tag, color: 'bg-blue-100 text-blue-600' },
  pull: { icon: Download, color: 'bg-slate-100 text-slate-600' },
  settings_change: { icon: Settings, color: 'bg-amber-100 text-amber-600' }
}

const getActionConfig = (action) => actionConfigs[action] || actionConfigs.push

const getActionText = (action) => {
  const texts = {
    push: 'pushed',
    delete: 'deleted',
    retag: 'retagged',
    pull: 'pulled',
    settings_change: 'updated settings for'
  }
  return texts[action] || action
}
</script>
