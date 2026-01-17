<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="onCancel">
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <div class="flex items-start gap-4">
          <div :class="['w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0', variant === 'danger' ? 'bg-red-100' : 'bg-amber-100']">
            <AlertTriangle :size="24" :class="variant === 'danger' ? 'text-red-600' : 'text-amber-600'" />
          </div>
          <div class="flex-1">
            <h3 :id="titleId" class="text-lg font-semibold text-slate-900 mb-2">{{ title }}</h3>
            <p class="text-slate-600 text-sm">{{ message }}</p>
          </div>
        </div>
        <div class="flex gap-3 mt-6 justify-end">
          <button @click="onCancel" class="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium" :disabled="loading">
            Cancel
          </button>
          <button @click="onConfirm" :class="['px-4 py-2 rounded-lg font-medium text-white', variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700']" :disabled="loading">
            <span v-if="loading">Processing...</span>
            <span v-else>{{ confirmText }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { AlertTriangle } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  message: String,
  confirmText: { type: String, default: 'Confirm' },
  variant: { type: String, default: 'danger' }
})

const emit = defineEmits(['confirm', 'cancel'])
const loading = ref(false)
const titleId = computed(() => `dialog-title-${Math.random().toString(36).substr(2, 9)}`)

const onConfirm = async () => {
  loading.value = true
  await emit('confirm')
  loading.value = false
}

const onCancel = () => emit('cancel')
</script>
