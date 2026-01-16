import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: string
}

const toasts = ref<Toast[]>([])
let toastId = 0

export const useToast = () => {
  const show = (message, type = 'info', duration = 3000) => {
    const id = toastId++
    toasts.value.push({ id, message, type })
    
    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== id)
    }, duration)
  }

  return {
    toasts,
    success: (message, duration) => show(message, 'success', duration),
    error: (message, duration) => show(message, 'error', duration),
    warning: (message, duration) => show(message, 'warning', duration),
    info: (message, duration) => show(message, 'info', duration)
  }
}
