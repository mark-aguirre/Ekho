<script setup lang="ts">
import type { DeliveryLog } from '@@/types/repository'

defineProps<{
  logs: DeliveryLog[]
}>()

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  
  if (hours < 1) return 'just now'
  if (hours === 1) return '1h ago'
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

const getStatusColor = (code: number) => {
  if (code >= 200 && code < 300) return '#2d9f5d'
  if (code >= 400) return '#e01e5a'
  return '#868686'
}
</script>

<template>
  <div class="delivery-logs">
    <div v-for="log in logs" :key="log.timestamp" class="log-item">
      <span class="event-type">{{ log.event }}</span>
      <span class="timestamp">{{ formatTime(log.timestamp) }}</span>
      <span class="status" :style="{ color: getStatusColor(log.status_code) }">
        {{ log.status_code }}
      </span>
      <span class="response-time">{{ log.response_time_ms }}ms</span>
    </div>
  </div>
</template>

<style scoped>
.delivery-logs {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.log-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 13px;
  transition: background 150ms;
}

.log-item:hover {
  background: #f0f0f0;
}

.event-type {
  font-weight: 600;
  color: #1d1c1d;
  min-width: 60px;
}

.timestamp {
  color: #616061;
  min-width: 60px;
}

.status {
  font-weight: 600;
  font-family: 'Courier New', monospace;
  min-width: 40px;
}

.response-time {
  color: #616061;
  font-family: 'Courier New', monospace;
  margin-left: auto;
}
</style>
