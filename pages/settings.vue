<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
    <div class="mb-4 sm:mb-8">
      <h1 class="text-xl sm:text-2xl font-bold text-slate-900">Settings</h1>
      <p class="text-sm sm:text-base text-slate-500 mt-1">Manage your account settings and preferences</p>
    </div>
    
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 items-start">
      <nav class="w-full lg:w-64 overflow-x-auto lg:overflow-x-visible">
        <div class="flex lg:flex-col gap-2 lg:space-y-1 pb-2 lg:pb-0 min-w-max lg:min-w-0">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="['flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap lg:w-full', activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100']">
            <component :is="tab.icon" :size="16" class="sm:w-[18px] sm:h-[18px]" />
            {{ tab.label }}
          </button>
        </div>
      </nav>

      <div class="flex-1 w-full">
        <div v-show="activeTab === 'subscription'" class="space-y-4 sm:space-y-6">
          <div v-if="loadingSubscription" class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 animate-pulse">
            <div class="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div class="h-20 bg-slate-200 rounded mb-4"></div>
            <div class="h-16 bg-slate-200 rounded"></div>
          </div>
          <div v-else-if="errorSubscription" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
            <p class="text-sm sm:text-base text-red-600 mb-3">{{ errorSubscription }}</p>
            <button @click="retrySubscription" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Retry</button>
          </div>
          <div v-else-if="subscription" class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div v-if="usage && (usage.storage.percentage > 90 || usage.bandwidth.percentage > 90)" class="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
              <div class="flex items-start gap-2 sm:gap-3">
                <AlertTriangle :size="18" class="sm:w-5 sm:h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div class="text-xs sm:text-sm text-amber-900">
                  <p class="font-medium mb-1">Approaching Limits</p>
                  <p>You're running low on {{ usage.storage.percentage > 90 ? 'storage' : 'bandwidth' }}. Consider upgrading to avoid service interruption.</p>
                </div>
              </div>
            </div>
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Subscription Plan</h2>
            <div class="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
              <div class="w-full sm:w-auto">
                <div class="flex items-center gap-2 sm:gap-3 mb-2">
                  <h3 class="text-xl sm:text-2xl font-bold text-slate-900">{{ subscription.plan }}</h3>
                  <span :class="['px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium', subscription.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700']">{{ subscription.status }}</span>
                </div>
                <p class="text-sm sm:text-base text-slate-600">{{ subscription.description }}</p>
              </div>
              <button @click="showPricingModal = true" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium whitespace-nowrap">Upgrade Plan</button>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
              <div class="p-3 sm:p-4 bg-slate-50 rounded-lg">
                <p class="text-xs sm:text-sm text-slate-600 mb-1">Billing Cycle</p>
                <p class="text-base sm:text-lg font-semibold text-slate-900">{{ subscription.billingCycle }}</p>
              </div>
              <div class="p-3 sm:p-4 bg-slate-50 rounded-lg">
                <p class="text-xs sm:text-sm text-slate-600 mb-1">Next Renewal</p>
                <p class="text-base sm:text-lg font-semibold text-slate-900">{{ subscription.nextRenewal }}</p>
              </div>
            </div>
            <div v-if="usage" class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-slate-600">Storage Used</span>
                  <span class="font-medium text-slate-900">{{ usage.storage.used }} / {{ usage.storage.limit }}</span>
                </div>
                <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="usage.storage.percentage > 90 ? 'bg-red-600' : usage.storage.percentage > 75 ? 'bg-yellow-600' : 'bg-indigo-600'" :style="`width: ${usage.storage.percentage}%`"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-slate-600">Bandwidth (Monthly)</span>
                  <span class="font-medium text-slate-900">{{ usage.bandwidth.used }} / {{ usage.bandwidth.limit }}</span>
                </div>
                <div class="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all" :class="usage.bandwidth.percentage > 90 ? 'bg-red-600' : usage.bandwidth.percentage > 75 ? 'bg-yellow-600' : 'bg-indigo-600'" :style="`width: ${usage.bandwidth.percentage}%`"></div>
                </div>
              </div>
            </div>
          </div>

          <BillingHistory />

          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Manage Subscription</h2>
            <button @click="showCancelModal = true" class="flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              <XCircle :size="16" />
              Cancel Subscription
            </button>
          </div>
        </div>

        <div v-show="activeTab === 'account'" class="space-y-4 sm:space-y-6">
          <div v-if="loadingProfile" class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 animate-pulse">
            <div class="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div class="space-y-4">
              <div class="h-10 bg-slate-200 rounded"></div>
              <div class="h-10 bg-slate-200 rounded"></div>
            </div>
          </div>
          <div v-else-if="errorProfile" class="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6">
            <p class="text-sm sm:text-base text-red-600 mb-3">{{ errorProfile }}</p>
            <button @click="retryProfile" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Retry</button>
          </div>
          <div v-else-if="profile" class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Account Information</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input v-model="profileForm.fullName" type="text" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" @input="hasUnsavedChanges = true" />
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Email</label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input v-model="profileForm.email" type="email" class="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" @input="hasUnsavedChanges = true" />
                  <span class="px-3 py-2 bg-green-50 text-green-700 text-xs sm:text-sm font-medium rounded-lg flex items-center justify-center gap-1">
                    <CheckCircle :size="16" /> Verified
                  </span>
                </div>
                <p v-if="emailError" class="text-red-600 text-xs sm:text-sm mt-1">{{ emailError }}</p>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Username</label>
                  <input v-model="profile.username" type="text" disabled class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg bg-slate-50 text-slate-500 cursor-not-allowed" title="Username cannot be changed" />
                  <p class="text-xs text-slate-500 mt-1">Username cannot be changed</p>
                </div>
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Member Since</label>
                  <input :value="profile.memberSince" type="text" disabled class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg bg-slate-50 text-slate-500" />
                </div>
              </div>
              <button @click="saveProfile" :disabled="savingProfile || !hasUnsavedChanges" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {{ savingProfile ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'security'" class="space-y-4 sm:space-y-6">
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Password</h2>
            <div class="space-y-4">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Current Password</label>
                <div class="relative">
                  <input v-model="passwordForm.current" :type="showCurrentPassword ? 'text' : 'password'" class="w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  <button type="button" @click="showCurrentPassword = !showCurrentPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <Eye v-if="!showCurrentPassword" :size="18" />
                    <EyeOff v-else :size="18" />
                  </button>
                </div>
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">New Password</label>
                <div class="relative">
                  <input v-model="passwordForm.new" :type="showNewPassword ? 'text' : 'password'" class="w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" @input="validatePassword" />
                  <button type="button" @click="showNewPassword = !showNewPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <Eye v-if="!showNewPassword" :size="18" />
                    <EyeOff v-else :size="18" />
                  </button>
                </div>
                <p v-if="passwordError" class="text-red-600 text-xs sm:text-sm mt-1">{{ passwordError }}</p>
                <p v-else-if="passwordForm.new" :class="['text-xs sm:text-sm mt-1', passwordStrength === 'strong' ? 'text-green-600' : passwordStrength === 'medium' ? 'text-yellow-600' : 'text-red-600']">Password strength: {{ passwordStrength }}</p>
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                <div class="relative">
                  <input v-model="passwordForm.confirm" :type="showConfirmPassword ? 'text' : 'password'" class="w-full px-3 sm:px-4 py-2 pr-10 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" @input="validatePassword" />
                  <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <Eye v-if="!showConfirmPassword" :size="18" />
                    <EyeOff v-else :size="18" />
                  </button>
                </div>
                <p v-if="passwordForm.confirm && passwordForm.new !== passwordForm.confirm" class="text-red-600 text-xs sm:text-sm mt-1">Passwords do not match</p>
              </div>
              <button @click="updatePassword" :disabled="updatingPassword || !canUpdatePassword" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                {{ updatingPassword ? 'Updating...' : 'Update Password' }}
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <div>
                <h2 class="text-base sm:text-lg font-semibold text-slate-900">Two-Factor Authentication</h2>
                <p class="text-xs sm:text-sm text-slate-600 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0', security.twoFactor ? 'bg-indigo-600' : 'bg-slate-200']" @click="toggleTwoFactor" :disabled="togglingTwoFactor" aria-label="Toggle two-factor authentication">
                <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', security.twoFactor ? 'translate-x-6' : 'translate-x-1']"></span>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <h2 class="text-base sm:text-lg font-semibold text-slate-900">Active Sessions</h2>
              <button @click="revokeAllSessions" class="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium">Revoke All Others</button>
            </div>
            <div class="space-y-3">
              <div v-for="session in security.sessions" :key="session.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg">
                <div class="flex items-center gap-3">
                  <Monitor :size="18" class="sm:w-5 sm:h-5 text-slate-400 flex-shrink-0" />
                  <div>
                    <p class="text-sm sm:text-base font-medium text-slate-900">{{ session.device }}</p>
                    <p class="text-xs sm:text-sm text-slate-600">{{ session.location }} • {{ session.lastActive }}</p>
                  </div>
                </div>
                <button v-if="!session.current" @click="revokeSession(session.id)" class="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium self-end sm:self-auto">Revoke</button>
                <span v-else class="text-xs sm:text-sm text-green-600 font-medium self-end sm:self-auto">Current</span>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'notifications'" class="space-y-4 sm:space-y-6">
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Email Notifications</h2>
            <div class="space-y-4">
              <div v-for="notif in notifications" :key="notif.id" class="flex items-start justify-between gap-3 py-3 border-b border-slate-100 last:border-0">
                <div class="flex-1">
                  <p class="text-sm sm:text-base font-medium text-slate-900">{{ notif.label }}</p>
                  <p class="text-xs sm:text-sm text-slate-600">{{ notif.description }}</p>
                </div>
                <button :class="['relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0', notif.enabled ? 'bg-indigo-600' : 'bg-slate-200']" @click="toggleNotification(notif.id)" :aria-label="`Toggle ${notif.label}`">
                  <span :class="['inline-block h-4 w-4 transform rounded-full bg-white transition-transform', notif.enabled ? 'translate-x-6' : 'translate-x-1']"></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'api'" class="space-y-4 sm:space-y-6">
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
              <h2 class="text-base sm:text-lg font-semibold text-slate-900">API Tokens</h2>
              <button @click="showTokenModal = true" class="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">Generate Token</button>
            </div>
            <div v-if="apiTokens.length === 0" class="text-center py-6 sm:py-8">
              <Key :size="40" class="sm:w-12 sm:h-12 mx-auto text-slate-300 mb-3" />
              <p class="text-sm sm:text-base text-slate-600 mb-4">No API tokens yet</p>
              <button @click="showTokenModal = true" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">Create Your First Token</button>
            </div>
            <div v-else class="space-y-3">
              <div v-for="token in apiTokens" :key="token.id" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 sm:p-4 bg-slate-50 rounded-lg">
                <div>
                  <p class="text-sm sm:text-base font-medium text-slate-900">{{ token.name }}</p>
                  <p class="text-xs sm:text-sm text-slate-600">Created {{ token.created }} • Last used {{ token.lastUsed }}</p>
                </div>
                <button @click="deleteToken(token.id)" class="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium self-end sm:self-auto">Delete</button>
              </div>
            </div>
          </div>

          <div v-if="showTokenModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="showTokenModal = false">
            <div class="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full" @click.stop>
              <h3 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">{{ newToken ? 'Token Generated' : 'Generate API Token' }}</h3>
              <div v-if="newToken" class="space-y-4">
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Your new token</label>
                  <div class="flex flex-col sm:flex-row gap-2">
                    <input :value="newToken" readonly class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-mono" />
                    <button @click="copyToken" class="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">Copy</button>
                  </div>
                  <p class="text-xs sm:text-sm text-amber-600 mt-2">Save this token now. You won't be able to see it again!</p>
                </div>
                <button @click="closeTokenModal" class="w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium">Close</button>
              </div>
              <div v-else class="space-y-4">
                <div>
                  <label class="block text-xs sm:text-sm font-medium text-slate-700 mb-2">Token Name</label>
                  <input v-model="tokenName" type="text" placeholder="e.g., Production Deploy" class="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div class="flex gap-3">
                  <button @click="showTokenModal = false" class="flex-1 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium">Cancel</button>
                  <button @click="generateToken" :disabled="!tokenName || generatingToken" class="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium disabled:opacity-50">
                    {{ generatingToken ? 'Generating...' : 'Generate' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'privacy'" class="space-y-4 sm:space-y-6">
          <div class="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
            <h2 class="text-base sm:text-lg font-semibold text-slate-900 mb-4">Data & Privacy</h2>
            <div class="space-y-4">
              <button @click="exportData" :disabled="exportingData" class="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium disabled:opacity-50">
                <Download :size="16" />
                {{ exportingData ? 'Exporting...' : 'Export Account Data' }}
              </button>
              <div class="pt-4 border-t border-slate-200">
                <h3 class="text-sm sm:text-base font-medium text-slate-900 mb-2">Delete Account</h3>
                <p class="text-xs sm:text-sm text-slate-600 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                <button @click="deleteAccount" class="w-full sm:w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="dialog.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" @click="dialog.onCancel">
      <div class="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full" @click.stop>
        <h3 class="text-base sm:text-lg font-semibold text-slate-900 mb-2">{{ dialog.title }}</h3>
        <p class="text-sm sm:text-base text-slate-600 mb-6">{{ dialog.message }}</p>
        <div class="flex gap-3 justify-end">
          <button @click="dialog.onCancel" class="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium">Cancel</button>
          <button @click="dialog.onConfirm" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">Confirm</button>
        </div>
      </div>
    </div>

    <Toast v-model="toasts" />

    <PricingPlansModal :isOpen="showPricingModal" :currentPlan="subscription?.plan?.toLowerCase()" @cancel="showPricingModal = false" @select="handlePlanSelect" />
    <PaymentModal :isOpen="showPaymentModal" :selectedPlan="selectedPlanData" :billingCycle="selectedPlanData?.billingCycle" @cancel="showPaymentModal = false" @confirm="handlePaymentConfirm" />
    <CancelSubscriptionModal :isOpen="showCancelModal" :currentUsage="usage?.storage?.used" @cancel="showCancelModal = false" @confirm="handleCancelSubscription" @acceptOffer="handleAcceptOffer" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { CreditCard, User, Shield, Bell, Key, Lock, Monitor, CheckCircle, Download, Eye, EyeOff, AlertTriangle, XCircle } from 'lucide-vue-next'
import Toast from '~/components/ui/Toast.vue'
import BillingHistory from '~/components/settings/BillingHistory.vue'
import PricingPlansModal from '~/components/settings/PricingPlansModal.vue'
import PaymentModal from '~/components/settings/PaymentModal.vue'
import CancelSubscriptionModal from '~/components/settings/CancelSubscriptionModal.vue'
import { useToast } from '~/composables/useToast'

const { toasts, success, error: showError, info } = useToast()
const { dialog, confirm } = useConfirm()

const activeTab = ref('subscription')
const hasUnsavedChanges = ref(false)
const showPricingModal = ref(false)
const showPaymentModal = ref(false)
const showCancelModal = ref(false)
const selectedPlanData = ref(null)

const tabs = [
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'account', label: 'Account', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'api', label: 'API Tokens', icon: Key },
  { id: 'privacy', label: 'Privacy', icon: Lock }
]

const loadingSubscription = ref(true)
const errorSubscription = ref(null)
const loadingProfile = ref(true)
const errorProfile = ref(null)
const subscription = ref(null)
const profile = ref(null)
const usage = ref(null)

if (process.client) {
  fetch('/api/user/subscription')
    .then(res => res.json())
    .then(data => {
      subscription.value = data
      loadingSubscription.value = false
    })
    .catch(() => {
      errorSubscription.value = 'Failed to load subscription'
      loadingSubscription.value = false
    })

  fetch('/api/user/profile')
    .then(res => res.json())
    .then(data => {
      profile.value = data
      profileForm.value = { fullName: data.fullName, email: data.email }
      loadingProfile.value = false
    })
    .catch(() => {
      errorProfile.value = 'Failed to load profile'
      loadingProfile.value = false
    })

  fetch('/api/user/usage')
    .then(res => res.json())
    .then(data => usage.value = data)
}

const retrySubscription = () => {
  loadingSubscription.value = true
  errorSubscription.value = null
  fetch('/api/user/subscription')
    .then(res => res.json())
    .then(data => {
      subscription.value = data
      loadingSubscription.value = false
    })
    .catch(() => {
      errorSubscription.value = 'Failed to load subscription'
      loadingSubscription.value = false
    })
}

const retryProfile = () => {
  loadingProfile.value = true
  errorProfile.value = null
  fetch('/api/user/profile')
    .then(res => res.json())
    .then(data => {
      profile.value = data
      profileForm.value = { fullName: data.fullName, email: data.email }
      loadingProfile.value = false
    })
    .catch(() => {
      errorProfile.value = 'Failed to load profile'
      loadingProfile.value = false
    })
}

const profileForm = ref({ fullName: '', email: '' })
const savingProfile = ref(false)
const emailError = ref('')

const saveProfile = async () => {
  emailError.value = ''
  if (!profileForm.value.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailError.value = 'Please enter a valid email address'
    return
  }
  
  savingProfile.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    profile.value.fullName = profileForm.value.fullName
    profile.value.email = profileForm.value.email
    hasUnsavedChanges.value = false
    success('Profile updated successfully')
  } catch (e) {
    showError('Failed to update profile')
  } finally {
    savingProfile.value = false
  }
}

const passwordForm = ref({ current: '', new: '', confirm: '' })
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const updatingPassword = ref(false)
const passwordError = ref('')
const passwordStrength = ref('')

const validatePassword = () => {
  passwordError.value = ''
  const pwd = passwordForm.value.new
  if (!pwd) {
    passwordStrength.value = ''
    return
  }
  if (pwd.length < 8) {
    passwordError.value = 'Password must be at least 8 characters'
    passwordStrength.value = 'weak'
  } else if (pwd.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) {
    passwordStrength.value = 'strong'
  } else if (pwd.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) {
    passwordStrength.value = 'medium'
  } else {
    passwordStrength.value = 'weak'
  }
}

const canUpdatePassword = computed(() => {
  return passwordForm.value.current && 
         passwordForm.value.new && 
         passwordForm.value.confirm && 
         passwordForm.value.new === passwordForm.value.confirm &&
         !passwordError.value &&
         passwordStrength.value !== 'weak'
})

const updatePassword = async () => {
  updatingPassword.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    passwordForm.value = { current: '', new: '', confirm: '' }
    success('Password updated successfully')
  } catch (e) {
    showError('Failed to update password')
  } finally {
    updatingPassword.value = false
  }
}

const security = ref({
  twoFactor: false,
  sessions: [
    { id: 1, device: 'Chrome on Windows', location: 'New York, US', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on macOS', location: 'San Francisco, US', lastActive: '2 days ago', current: false }
  ]
})

const togglingTwoFactor = ref(false)
const toggleTwoFactor = async () => {
  togglingTwoFactor.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    security.value.twoFactor = !security.value.twoFactor
    success(`Two-factor authentication ${security.value.twoFactor ? 'enabled' : 'disabled'}`)
  } catch (e) {
    showError('Failed to update two-factor authentication')
  } finally {
    togglingTwoFactor.value = false
  }
}

const revokeSession = async (id) => {
  if (await confirm('Revoke Session', 'Are you sure you want to revoke this session?')) {
    security.value.sessions = security.value.sessions.filter(s => s.id !== id)
    success('Session revoked successfully')
  }
}

const revokeAllSessions = async () => {
  if (await confirm('Revoke All Sessions', 'Are you sure you want to revoke all other sessions?')) {
    security.value.sessions = security.value.sessions.filter(s => s.current)
    success('All other sessions revoked')
  }
}

const notifications = ref([
  { id: 1, label: 'Repository Updates', description: 'New tags and image pushes', enabled: true },
  { id: 2, label: 'Security Alerts', description: 'Vulnerability scans and security issues', enabled: true },
  { id: 3, label: 'Billing', description: 'Invoices and payment notifications', enabled: true },
  { id: 4, label: 'System Announcements', description: 'Platform updates and maintenance', enabled: false }
])

const toggleNotification = async (id) => {
  const notif = notifications.value.find(n => n.id === id)
  notif.enabled = !notif.enabled
  success(`${notif.label} notifications ${notif.enabled ? 'enabled' : 'disabled'}`)
}

const apiTokens = ref([
  { id: 1, name: 'Production Deploy', created: 'Jan 15, 2024', lastUsed: '2 hours ago' },
  { id: 2, name: 'CI/CD Pipeline', created: 'Dec 10, 2023', lastUsed: '1 day ago' }
])

const showTokenModal = ref(false)
const tokenName = ref('')
const newToken = ref('')
const generatingToken = ref(false)

const generateToken = async () => {
  generatingToken.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    newToken.value = 'tk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    apiTokens.value.push({ id: Date.now(), name: tokenName.value, created: 'Just now', lastUsed: 'Never' })
  } catch (e) {
    showError('Failed to generate token')
  } finally {
    generatingToken.value = false
  }
}

const copyToken = () => {
  navigator.clipboard.writeText(newToken.value)
  success('Token copied to clipboard')
}

const closeTokenModal = () => {
  showTokenModal.value = false
  tokenName.value = ''
  newToken.value = ''
}

const deleteToken = async (id) => {
  if (await confirm('Delete Token', 'Are you sure you want to delete this token? This action cannot be undone.')) {
    apiTokens.value = apiTokens.value.filter(t => t.id !== id)
    success('Token deleted successfully')
  }
}

const exportingData = ref(false)
const exportData = async () => {
  exportingData.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    success('Account data exported successfully')
  } catch (e) {
    showError('Failed to export data')
  } finally {
    exportingData.value = false
  }
}

const deleteAccount = async () => {
  if (await confirm('Delete Account', 'This will permanently delete your account and all data. This action cannot be undone. Are you absolutely sure?')) {
    info('Account deletion initiated')
  }
}

watch(activeTab, (newTab, oldTab) => {
  if (oldTab === 'account' && hasUnsavedChanges.value) {
    if (!window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
      activeTab.value = oldTab
    } else {
      hasUnsavedChanges.value = false
    }
  }
})

onBeforeUnmount(() => {
  if (hasUnsavedChanges.value) {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
})

const handleBeforeUnload = (e) => {
  if (hasUnsavedChanges.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

if (process.client) {
  window.addEventListener('beforeunload', handleBeforeUnload)
}

const planDetails = {
  free: { storage: '500 MB', bandwidth: '1 GB/month', priceMonthly: 0, priceYearly: 0 },
  pro: { storage: '50 GB', bandwidth: '100 GB/month', priceMonthly: 15, priceYearly: 144 },
  enterprise: { storage: '500 GB', bandwidth: '1 TB/month', priceMonthly: 49, priceYearly: 470 }
}

const handlePlanSelect = (data) => {
  selectedPlanData.value = { ...data, ...planDetails[data.plan], name: data.plan.charAt(0).toUpperCase() + data.plan.slice(1) }
  showPricingModal.value = false
  showPaymentModal.value = true
}

const handlePaymentConfirm = async (paymentData) => {
  showPaymentModal.value = false
  success('Subscription upgraded successfully!')
  
  subscription.value.plan = selectedPlanData.value.name
  subscription.value.billingCycle = selectedPlanData.value.billingCycle === 'monthly' ? 'Monthly' : 'Yearly'
  subscription.value.nextRenewal = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const handleCancelSubscription = async (data) => {
  showCancelModal.value = false
  success(`Subscription will be cancelled ${data.timing === 'immediate' ? 'immediately' : 'at the end of billing period'}`)
}

const handleAcceptOffer = () => {
  showCancelModal.value = false
  success('Offer accepted! 50% discount applied for next 3 months')
}
</script>
