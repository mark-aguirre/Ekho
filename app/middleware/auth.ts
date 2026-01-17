export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const userCookie = document.cookie.split('; ').find(row => row.startsWith('user='))
    
    if (!userCookie) {
      return navigateTo('/')
    }
  }
})
