import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  experimental: {
    inlineSSRStyles: false
  },
  features: {
    inlineStyles: true
  },
  runtimeConfig: {
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authSecret: process.env.AUTH_SECRET,
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      authOrigin: process.env.AUTH_ORIGIN
    }
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap', media: 'print', onload: "this.media='all'" }
      ]
    }
  }
})


