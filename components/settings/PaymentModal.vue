<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="$emit('cancel')">
    <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col" @click.stop>
      <div class="border-b border-slate-200 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <h2 class="text-xl font-bold text-slate-900">Confirm Upgrade</h2>
        <button @click="$emit('cancel')" class="p-2 hover:bg-slate-100 rounded-lg">
          <X :size="20" />
        </button>
      </div>

      <div class="p-6 space-y-6 overflow-y-auto flex-1">
        <div class="bg-slate-50 rounded-lg p-4">
          <h3 class="font-semibold text-slate-900 mb-3">Plan Summary</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-600">Plan</span>
              <span class="font-medium text-slate-900">{{ selectedPlan.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-600">Storage</span>
              <span class="font-medium text-slate-900">{{ selectedPlan.storage }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-600">Bandwidth</span>
              <span class="font-medium text-slate-900">{{ selectedPlan.bandwidth }}</span>
            </div>
            <div v-if="promoCode" class="flex justify-between text-green-600">
              <span>Promo Code ({{ promoCode }})</span>
              <span class="font-medium">-{{ discount }}%</span>
            </div>
            <div class="pt-2 border-t border-slate-200 flex justify-between">
              <span class="font-semibold text-slate-900">Total</span>
              <span class="font-bold text-slate-900 text-lg">${{ finalPrice }}/{{ localBillingCycle === 'monthly' ? 'mo' : 'yr' }}</span>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Billing Cycle</label>
          <div class="grid grid-cols-2 gap-3">
            <button @click="localBillingCycle = 'monthly'" :class="['p-3 border-2 rounded-lg text-sm font-medium transition-colors', localBillingCycle === 'monthly' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300']">
              <div class="font-semibold">Monthly</div>
              <div class="text-xs mt-1">${{ selectedPlan.priceMonthly }}/month</div>
            </button>
            <button @click="localBillingCycle = 'yearly'" :class="['p-3 border-2 rounded-lg text-sm font-medium transition-colors', localBillingCycle === 'yearly' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 hover:border-slate-300']">
              <div class="font-semibold">Yearly</div>
              <div class="text-xs mt-1">${{ selectedPlan.priceYearly }}/year <span class="text-green-600">(Save 20%)</span></div>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Promo Code (Optional)</label>
          <div class="flex gap-2">
            <input v-model="promoInput" type="text" placeholder="Enter code" class="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button @click="applyPromo" :disabled="applyingPromo" class="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium disabled:opacity-50">
              {{ applyingPromo ? 'Applying...' : 'Apply' }}
            </button>
          </div>
          <p v-if="promoError" class="text-red-600 text-sm mt-1">{{ promoError }}</p>
          <p v-if="promoCode" class="text-green-600 text-sm mt-1">Promo code applied successfully!</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
          <div class="space-y-3">
            <div v-for="method in paymentMethods" :key="method.id" @click="selectedPaymentMethod = method.id" :class="['flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer', selectedPaymentMethod === method.id ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200 hover:border-slate-300']">
              <div class="flex items-center gap-3">
                <CreditCard :size="20" class="text-slate-400" />
                <div>
                  <p class="font-medium text-slate-900">{{ method.brand }} •••• {{ method.last4 }}</p>
                  <p class="text-sm text-slate-600">Expires {{ method.expiry }}</p>
                </div>
              </div>
              <div v-if="selectedPaymentMethod === method.id" class="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                <Check :size="14" class="text-white" />
              </div>
            </div>
            <button @click="showAddCard = true" class="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-slate-400 text-slate-600">
              <Plus :size="20" />
              Add New Card
            </button>
          </div>
        </div>

        <div v-if="showAddCard" class="space-y-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Card Number</label>
            <input v-model="newCard.number" type="text" placeholder="1234 5678 9012 3456" maxlength="19" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">Expiry Date</label>
              <input v-model="newCard.expiry" type="text" placeholder="MM/YY" maxlength="5" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700 mb-2">CVV</label>
              <input v-model="newCard.cvv" type="text" placeholder="123" maxlength="3" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-2">Cardholder Name</label>
            <input v-model="newCard.name" type="text" placeholder="John Doe" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div class="flex items-start gap-2">
          <input v-model="acceptTerms" type="checkbox" id="terms" class="mt-1" />
          <label for="terms" class="text-sm text-slate-600">I agree to the <a href="#" class="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a></label>
        </div>
      </div>

      <div class="flex gap-3 px-6 py-4 border-t border-slate-200 flex-shrink-0">
        <button @click="$emit('cancel')" class="flex-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-medium">Cancel</button>
        <button @click="confirmUpgrade" :disabled="!acceptTerms || processing" class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          {{ processing ? 'Processing...' : 'Confirm & Pay' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { X, CreditCard, Check, Plus } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  selectedPlan: Object,
  billingCycle: String
})

const emit = defineEmits(['cancel', 'confirm'])

const localBillingCycle = ref(props.billingCycle || 'monthly')
const selectedPaymentMethod = ref('card1')
const acceptTerms = ref(false)
const processing = ref(false)
const showAddCard = ref(false)
const promoInput = ref('')
const promoCode = ref('')
const promoError = ref('')
const applyingPromo = ref(false)
const discount = ref(0)

const newCard = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

const paymentMethods = [
  { id: 'card1', brand: 'Visa', last4: '4242', expiry: '12/25' },
  { id: 'card2', brand: 'Mastercard', last4: '5555', expiry: '08/26' }
]

const basePrice = computed(() => {
  return localBillingCycle.value === 'monthly' ? props.selectedPlan?.priceMonthly : props.selectedPlan?.priceYearly
})

const finalPrice = computed(() => {
  const price = basePrice.value || 0
  return discount.value > 0 ? (price * (1 - discount.value / 100)).toFixed(2) : price
})

const applyPromo = async () => {
  if (!promoInput.value.trim()) return
  
  applyingPromo.value = true
  promoError.value = ''
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const validCodes = { 'SAVE20': 20, 'WELCOME10': 10, 'TRIAL50': 50 }
  
  if (validCodes[promoInput.value.toUpperCase()]) {
    promoCode.value = promoInput.value.toUpperCase()
    discount.value = validCodes[promoCode.value]
  } else {
    promoError.value = 'Invalid promo code'
  }
  
  applyingPromo.value = false
}

const confirmUpgrade = async () => {
  processing.value = true
  await new Promise(resolve => setTimeout(resolve, 2000))
  emit('confirm', {
    paymentMethod: selectedPaymentMethod.value,
    promoCode: promoCode.value,
    finalPrice: finalPrice.value,
    billingCycle: localBillingCycle.value
  })
  processing.value = false
}
</script>
