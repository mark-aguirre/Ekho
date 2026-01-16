<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-xl border border-slate-200 p-8 text-center">
      <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle :size="32" class="text-red-600" />
      </div>
      <h1 class="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
      <p class="text-slate-600 mb-6">{{ error?.message || 'An unexpected error occurred' }}</p>
      <div class="flex gap-3 justify-center">
        <button @click="handleError" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium">
          Try Again
        </button>
        <NuxtLink to="/" class="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium">
          Go Home
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { AlertCircle } from 'lucide-vue-next'

const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
