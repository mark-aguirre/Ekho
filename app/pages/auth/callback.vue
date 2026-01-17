<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#611f69] mx-auto mb-4"></div>
      <p class="text-slate-600">Signing you in...</p>
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (code) {
    // Store auth code and redirect to dashboard
    // In production, exchange code for tokens on backend
    navigateTo('/dashboard')
  } else {
    navigateTo('/')
  }
})
</script>
