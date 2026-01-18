<template>
  <div class="min-h-screen bg-slate-50">
    <header class="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div class="w-[80%] mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center gap-8">
            <NuxtLink to="/" class="flex items-center gap-2.5" aria-label="eKho Home">
              <div class="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Box :size="20" class="text-white" />
              </div>
              <span class="font-semibold text-slate-900 text-lg tracking-tight">eKho</span>
            </NuxtLink>
            <nav class="hidden md:flex items-center gap-1" aria-label="Main navigation">
              <NuxtLink to="/home" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#611f69] hover:bg-slate-50 rounded-lg transition-colors">
                Applications
              </NuxtLink>
              <NuxtLink to="/repositories" class="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#611f69] hover:bg-slate-50 rounded-lg transition-colors">
                My Repositories
              </NuxtLink>
            </nav>
          </div>
          <div class="hidden md:flex flex-1 max-w-md mx-8">
            <div class="relative w-full">
              <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input v-model="searchQuery" type="text" placeholder="Search repositories..." aria-label="Search repositories" class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div class="flex items-center gap-3">
            <button class="hidden md:flex p-2 text-slate-500 hover:bg-slate-100 rounded-lg" aria-label="Notifications">
              <Bell :size="20" />
            </button>
            <div v-if="user" class="relative" @keydown.esc="userMenuOpen = false">
              <button @click="userMenuOpen = !userMenuOpen" class="flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-100 rounded-lg" aria-label="User menu" aria-expanded="userMenuOpen" aria-haspopup="true">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center overflow-hidden">
                  <img v-if="user.picture" :src="user.picture" :alt="user.name" class="w-full h-full object-cover" />
                  <User v-else :size="16" class="text-slate-600" />
                </div>
                <span class="hidden md:inline text-sm font-medium">{{ user.name || user.email?.split('@')[0] }}</span>
                <ChevronDown :size="16" />
              </button>
              <div v-if="userMenuOpen" class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-slate-200 py-1" role="menu">
                <div class="px-3 py-2 border-b border-slate-100">
                  <p class="text-sm font-medium text-slate-900">{{ user.name }}</p>
                  <p class="text-xs text-slate-500">{{ user.email }}</p>
                </div>
                <NuxtLink to="/settings" class="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <Settings :size="16" />
                  Settings
                </NuxtLink>
                <div class="border-t border-slate-100 my-1"></div>
                <button @click="handleLogout" class="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-slate-50">
                  <LogOut :size="16" />
                  Sign out
                </button>
              </div>
            </div>
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg" aria-label="Toggle menu" aria-expanded="mobileMenuOpen">
              <Menu v-if="!mobileMenuOpen" :size="20" />
              <X v-else :size="20" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-slate-200 bg-white">
        <div class="px-4 py-3 space-y-2">
          <div class="relative">
            <Search :size="16" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input v-model="searchQuery" type="text" placeholder="Search repositories..." class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <NuxtLink @click="mobileMenuOpen = false" to="/home" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Package :size="16" />
            Applications
          </NuxtLink>
          <NuxtLink @click="mobileMenuOpen = false" to="/repositories" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Package :size="16" />
            My Repositories
          </NuxtLink>
          <div v-if="user" class="border-t border-slate-200 pt-2 mt-2">
            <div class="px-3 py-2 mb-2">
              <p class="text-sm font-medium text-slate-900">{{ user.name }}</p>
              <p class="text-xs text-slate-500">{{ user.email }}</p>
            </div>
            <NuxtLink @click="mobileMenuOpen = false" to="/settings" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
              <Settings :size="16" />
              Settings
            </NuxtLink>
            <button @click="handleLogout(); mobileMenuOpen = false" class="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-slate-50">
              <LogOut :size="16" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
    <main class="min-h-[calc(100vh-4rem)]">
      <slot />
    </main>
    <Toast v-model="toasts" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Box, Search, Bell, User, ChevronDown, Settings, LogOut, Menu, X, Package } from 'lucide-vue-next'
import Toast from '~/components/ui/Toast.vue'
import { useToast } from '~/composables/useToast'

const searchQuery = ref('')
const mobileMenuOpen = ref(false)
const userMenuOpen = ref(false)
const user = ref(null)
const { toasts } = useToast()

onMounted(() => {
  // Get user from cookie
  const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='))
  if (userCookie) {
    user.value = JSON.parse(decodeURIComponent(userCookie.split('=')[1]))
  }
  document.addEventListener('click', handleClickOutside)
})
onUnmounted(() => document.removeEventListener('click', handleClickOutside))

const handleClickOutside = (e) => {
  if (userMenuOpen.value && !e.target.closest('[aria-haspopup="true"]')) {
    userMenuOpen.value = false
  }
}

const handleLogout = () => {
  document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  user.value = null
  userMenuOpen.value = false
  navigateTo('/')
}
</script>
