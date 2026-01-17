<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 relative overflow-hidden">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(97,31,105,0.05),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(45,159,93,0.05),transparent_50%)] pointer-events-none"></div>
    <div class="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div class="absolute top-40 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div class="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    
    <div class="relative z-10">
    <nav class="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Container :size="28" class="text-[#611f69]" />
          <span class="text-xl font-bold text-slate-900">Ekho</span>
        </div>
        <button @click="login" class="px-4 py-2 text-sm font-medium text-[#611f69] hover:text-[#4a154b] hover:bg-[#f8f4f9] rounded-lg transition-all duration-150">
          Sign In
        </button>
      </div>
    </nav>

    <main>
      <section class="max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 class="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Container Registry
              <span class="block text-[#611f69]">Made Simple</span>
            </h1>
            <div class="inline-block bg-[#2d9f5d] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ✓ Free
            </div>
            <p class="text-lg text-slate-600 mb-8 leading-relaxed">
              Store, manage, and deploy your Docker images with enterprise-grade security and lightning-fast performance.
            </p>
            <button @click="login" class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-slate-300 hover:border-[#611f69] hover:shadow-lg rounded-lg transition-all duration-200 group">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
                <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
                <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
              </svg>
              <span class="font-semibold text-slate-900">Continue with Google</span>
            </button>
            <p class="text-sm text-slate-500 mt-4">Start free • No credit card required</p>
          </div>

          <div class="relative">
            <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 p-8">
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-[#f8f4f9] flex items-center justify-center flex-shrink-0">
                    <Lock :size="24" class="text-[#611f69]" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 mb-1">Enterprise Security</h3>
                    <p class="text-sm text-slate-600">End-to-end encryption with role-based access control</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-[#f8f4f9] flex items-center justify-center flex-shrink-0">
                    <Zap :size="24" class="text-[#611f69]" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 mb-1">Lightning Fast</h3>
                    <p class="text-sm text-slate-600">Global CDN ensures rapid image pulls worldwide</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-lg bg-[#f8f4f9] flex items-center justify-center flex-shrink-0">
                    <GitBranch :size="24" class="text-[#611f69]" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-slate-900 mb-1">Version Control</h3>
                    <p class="text-sm text-slate-600">Tag and organize images with semantic versioning</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-[#611f69] opacity-10 rounded-full blur-3xl"></div>
            <div class="absolute -top-6 -left-6 w-32 h-32 bg-[#2d9f5d] opacity-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      <section class="bg-white border-y border-slate-200 py-20">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need to ship faster</h2>
            <p class="text-lg text-slate-600 max-w-2xl mx-auto">Powerful features designed for modern development teams</p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-xl bg-[#f8f4f9] flex items-center justify-center mx-auto mb-4">
                <Package :size="32" class="text-[#611f69]" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Flexible Repository Management</h3>
              <p class="text-slate-600">Create and organize public and private repositories at scale</p>
            </div>
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-xl bg-[#f8f4f9] flex items-center justify-center mx-auto mb-4">
                <Shield :size="32" class="text-[#611f69]" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Access Control</h3>
              <p class="text-slate-600">Manage permissions and secure your repositories</p>
            </div>
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-xl bg-[#f8f4f9] flex items-center justify-center mx-auto mb-4">
                <Workflow :size="32" class="text-[#611f69]" />
              </div>
              <h3 class="text-lg font-semibold text-slate-900 mb-2">CI/CD Integration</h3>
              <p class="text-slate-600">Seamless integration with your deployment pipeline</p>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-6 py-20">
        <div class="bg-gradient-to-br from-[#611f69] to-[#4a154b] rounded-3xl p-12 lg:p-16 text-center text-white">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p class="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">Join thousands of developers managing their container images with Ekho</p>
          <button @click="login" class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 hover:bg-slate-50 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
            </svg>
            Get Started Free
          </button>
        </div>
      </section>
    </main>

    <footer class="border-t border-slate-200 bg-white py-8">
      <div class="max-w-7xl mx-auto px-6 text-center text-sm text-slate-500">
        <p>&copy; 2024 Ekho. All rights reserved.</p>
      </div>
    </footer>
    </div>
  </div>
</template>

<script setup>
import { Container, Lock, Zap, GitBranch, Package, Shield, Workflow } from 'lucide-vue-next'

const { login } = useAuthClient()

definePageMeta({
  layout: false,
  middleware: 'guest'
})
</script>
