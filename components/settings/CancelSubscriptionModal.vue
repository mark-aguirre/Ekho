<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="$emit('cancel')">
    <div class="bg-white rounded-xl max-w-lg w-full max-h-[90vh] flex flex-col" @click.stop>
      <div class="border-b border-slate-200 px-6 py-4 flex-shrink-0">
        <h2 class="text-xl font-bold text-slate-900">Cancel Subscription</h2>
      </div>

      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        <div class="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <AlertTriangle :size="20" class="text-amber-600 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-amber-900">
              <p class="font-medium mb-1">You'll lose access to:</p>
              <ul class="list-disc list-inside space-y-1">
                <li>50 GB storage (currently using {{ currentUsage }})</li>
                <li>100 GB bandwidth/month</li>
                <li>Private repositories</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">When should we cancel?</label>
          <div class="space-y-2">
            <label class="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer" :class="cancelTiming === 'immediate' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'">
              <input v-model="cancelTiming" type="radio" value="immediate" class="mt-1" />
              <div>
                <p class="font-medium text-slate-900">Cancel immediately</p>
                <p class="text-sm text-slate-600">Access ends today, no refund</p>
              </div>
            </label>
            <label class="flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer" :class="cancelTiming === 'end' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'">
              <input v-model="cancelTiming" type="radio" value="end" class="mt-1" />
              <div>
                <p class="font-medium text-slate-900">Cancel at period end</p>
                <p class="text-sm text-slate-600">Access until Feb 15, 2024</p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Help us improve (Optional)</label>
          <select v-model="cancelReason" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select a reason</option>
            <option value="expensive">Too expensive</option>
            <option value="features">Missing features</option>
            <option value="alternative">Found alternative</option>
            <option value="unused">Not using enough</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div v-if="cancelReason" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <Gift :size="20" class="text-blue-600 mt-0.5 flex-shrink-0" />
            <div class="text-sm text-blue-900">
              <p class="font-medium mb-1">Wait! We have an offer for you</p>
              <p class="mb-3">Get 50% off for the next 3 months if you stay</p>
              <button @click="acceptOffer" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                Accept Offer
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-3 px-6 py-4 border-t border-slate-200 flex-shrink-0">
        <button @click="$emit('cancel')" class="flex-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-medium">Keep Subscription</button>
        <button @click="confirmCancel" :disabled="processing" class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium disabled:opacity-50">
          {{ processing ? 'Processing...' : 'Confirm Cancellation' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AlertTriangle, Gift } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  currentUsage: String
})

const emit = defineEmits(['cancel', 'confirm', 'acceptOffer'])

const cancelTiming = ref('end')
const cancelReason = ref('')
const processing = ref(false)

const confirmCancel = async () => {
  processing.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  emit('confirm', { timing: cancelTiming.value, reason: cancelReason.value })
  processing.value = false
}

const acceptOffer = () => {
  emit('acceptOffer')
}
</script>
