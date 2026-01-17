<template>
  <div class="bg-white rounded-xl border border-slate-200 p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-slate-900">Billing History</h2>
      <button class="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View All</button>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="h-16 bg-slate-100 rounded-lg animate-pulse" />
    </div>

    <div v-else-if="invoices.length === 0" class="text-center py-8">
      <Receipt :size="48" class="mx-auto text-slate-300 mb-3" />
      <p class="text-slate-600">No invoices yet</p>
    </div>

    <div v-else class="space-y-3">
      <div v-for="invoice in invoices" :key="invoice.id" class="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
        <div class="flex items-center gap-3">
          <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', invoice.status === 'paid' ? 'bg-green-100' : invoice.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100']">
            <Receipt :size="20" :class="invoice.status === 'paid' ? 'text-green-600' : invoice.status === 'pending' ? 'text-yellow-600' : 'text-red-600'" />
          </div>
          <div>
            <p class="font-medium text-slate-900">{{ invoice.description }}</p>
            <p class="text-sm text-slate-600">{{ invoice.date }}</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <p class="font-semibold text-slate-900">${{ invoice.amount }}</p>
            <span :class="['text-xs font-medium px-2 py-0.5 rounded', invoice.status === 'paid' ? 'bg-green-100 text-green-700' : invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700']">
              {{ invoice.status }}
            </span>
          </div>
          <button @click="downloadInvoice(invoice.id)" class="p-2 hover:bg-slate-100 rounded-lg" title="Download">
            <Download :size="16" class="text-slate-600" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Receipt, Download } from 'lucide-vue-next'
import { useToast } from '~/composables/useToast'

const { success } = useToast()
const loading = ref(false)

const invoices = ref([
  { id: 1, description: 'Pro Plan - Monthly', date: 'Jan 15, 2024', amount: '29.00', status: 'paid' },
  { id: 2, description: 'Pro Plan - Monthly', date: 'Dec 15, 2023', amount: '29.00', status: 'paid' },
  { id: 3, description: 'Pro Plan - Monthly', date: 'Nov 15, 2023', amount: '29.00', status: 'paid' }
])

const downloadInvoice = (id) => {
  success('Invoice downloaded successfully')
}
</script>
