<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div v-for="toast in toasts" :key="toast.id" :class="['px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in', toastStyles[toast.type]]">
        <component :is="toastIcons[toast.type]" :size="20" />
        <span class="font-medium">{{ toast.message }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-vue-next'

const toasts = defineModel({ type: Array, default: [] })

const toastStyles = {
  success: 'bg-emerald-600 text-white',
  error: 'bg-red-600 text-white',
  warning: 'bg-amber-600 text-white',
  info: 'bg-blue-600 text-white'
}

const toastIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}
</script>

<style scoped>
@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
.animate-slide-in { animation: slide-in 0.3s ease-out; }
</style>
