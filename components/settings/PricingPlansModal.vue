<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="$emit('cancel')">
    <div class="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto" @click.stop>
      <div class="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Choose Your Plan</h2>
          <p class="text-sm text-slate-600">Upgrade or downgrade anytime</p>
        </div>
        <button @click="$emit('cancel')" class="p-2 hover:bg-slate-100 rounded-lg">
          <X :size="20" />
        </button>
      </div>

      <div class="p-6">
        <div class="flex items-center justify-center gap-3 mb-8">
          <span :class="['text-sm font-medium', billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500']">Monthly</span>
          <button @click="billingCycle = billingCycle === 'monthly' ? 'yearly' : 'monthly'" class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-indigo-600">
            <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1']"></span>
          </button>
          <span :class="['text-sm font-medium', billingCycle === 'yearly' ? 'text-slate-900' : 'text-slate-500']">Yearly</span>
          <span class="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">Save 20%</span>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="plan in plans" :key="plan.id" :class="['relative border-2 rounded-xl p-6', plan.id === currentPlan ? 'border-indigo-600 bg-indigo-50' : plan.popular ? 'border-indigo-300' : 'border-slate-200']">
            <div v-if="plan.popular" class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">Most Popular</div>
            <div v-if="plan.id === currentPlan" class="absolute top-4 right-4 px-2 py-1 bg-indigo-600 text-white text-xs font-medium rounded">Current</div>
            
            <h3 class="text-xl font-bold text-slate-900 mb-2">{{ plan.name }}</h3>
            <p class="text-sm text-slate-600 mb-4">{{ plan.description }}</p>
            
            <div class="mb-6">
              <span class="text-4xl font-bold text-slate-900">${{ billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly }}</span>
              <span class="text-slate-600">/{{ billingCycle === 'monthly' ? 'month' : 'year' }}</span>
            </div>

            <button @click="selectPlan(plan)" :disabled="plan.id === currentPlan" :class="['w-full py-2 rounded-lg font-medium mb-6', plan.id === currentPlan ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white']">
              {{ plan.id === currentPlan ? 'Current Plan' : 'Select Plan' }}
            </button>

            <ul class="space-y-3">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-2 text-sm">
                <Check :size="16" class="text-green-600 mt-0.5 flex-shrink-0" />
                <span class="text-slate-700">{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div class="flex items-start gap-3">
            <Info :size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-blue-900">
              <p class="font-medium mb-1">Need more?</p>
              <p>Contact us for custom enterprise plans with dedicated support and SLA guarantees.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { X, Check, Info } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  currentPlan: String
})

const emit = defineEmits(['cancel', 'select'])

const billingCycle = ref('monthly')

const plans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for personal projects',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['500 MB storage', '1 GB bandwidth/month', '5 repositories', 'Community support', 'Public repositories']
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams',
    priceMonthly: 15,
    priceYearly: 144,
    popular: true,
    features: ['50 GB storage', '100 GB bandwidth/month', 'Unlimited repositories', 'Priority support', 'Private repositories', 'Webhooks', 'Advanced analytics', 'Team collaboration']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    priceMonthly: 49,
    priceYearly: 470,
    features: ['500 GB storage', '1 TB bandwidth/month', 'Unlimited repositories', '24/7 dedicated support', 'SSO & SAML', 'Advanced security', 'SLA guarantee', 'Custom integrations', 'Audit logs']
  }
]

const selectPlan = (plan) => {
  emit('select', { plan: plan.id, billingCycle: billingCycle.value })
}
</script>
