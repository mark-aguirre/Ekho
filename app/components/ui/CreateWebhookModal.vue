<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Upload, Trash2, Tag, CheckCircle, Pause } from 'lucide-vue-next'
import type { CreateWebhookInput } from '@@/types/repository'

const props = defineProps<{
  isOpen: boolean
  repositoryId: string
  webhook?: any
}>()

const emit = defineEmits<{
  close: []
  submit: [data: CreateWebhookInput]
}>()

const name = ref('')
const url = ref('')
const selectedEvents = ref<string[]>(['push'])
const status = ref<'active' | 'paused'>('active')
const urlError = ref('')

const availableEvents = [
  { value: 'push', label: 'Push', icon: Upload },
  { value: 'delete', label: 'Delete', icon: Trash2 },
  { value: 'tag_delete', label: 'Tag Delete', icon: Tag }
]

const validateUrl = () => {
  try {
    new URL(url.value)
    urlError.value = ''
    return true
  } catch {
    urlError.value = 'Please enter a valid URL'
    return false
  }
}

const handleSubmit = () => {
  if (!name.value.trim()) return
  if (!validateUrl()) return
  if (selectedEvents.value.length === 0) return

  emit('submit', {
    name: name.value.trim(),
    url: url.value.trim(),
    events: selectedEvents.value,
    status: status.value
  })
  
  resetForm()
}

const resetForm = () => {
  name.value = ''
  url.value = ''
  selectedEvents.value = ['push']
  status.value = 'active'
  urlError.value = ''
}

const handleClose = () => {
  resetForm()
  emit('close')
}

watch(() => props.isOpen, (isOpen) => {
  if (isOpen && props.webhook) {
    name.value = props.webhook.name
    url.value = props.webhook.url
    selectedEvents.value = props.webhook.events || ['push']
    status.value = props.webhook.status || 'active'
  } else if (!isOpen) {
    resetForm()
  }
})
</script>

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ webhook ? 'Edit Webhook' : 'Add Webhook' }}</h2>
        <button @click="handleClose" class="close-btn" aria-label="Close">
          <X :size="20" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-body">
        <div class="form-group">
          <label for="webhook-name">Name</label>
          <input
            id="webhook-name"
            v-model="name"
            type="text"
            placeholder="My Webhook"
            required
          />
        </div>

        <div class="form-group">
          <label for="webhook-url">Payload URL</label>
          <input
            id="webhook-url"
            v-model="url"
            type="url"
            placeholder="https://example.com/webhook"
            required
            @blur="validateUrl"
          />
          <span v-if="urlError" class="error-text">{{ urlError }}</span>
        </div>

        <div class="form-group">
          <label>Events</label>
          <p class="help-text">Select which events will trigger this webhook</p>
          <div class="event-cards">
            <label v-for="event in availableEvents" :key="event.value" class="event-card" :class="{ selected: selectedEvents.includes(event.value) }">
              <input
                v-model="selectedEvents"
                type="checkbox"
                :value="event.value"
                class="event-checkbox"
              />
              <div class="event-content">
                <component :is="event.icon" :size="18" class="event-icon" />
                <span class="event-label">{{ event.label }}</span>
              </div>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Status</label>
          <p class="help-text">Set the initial status of the webhook</p>
          <div class="status-cards">
            <label class="status-card" :class="{ selected: status === 'active' }">
              <input v-model="status" type="radio" value="active" class="status-radio" />
              <div class="status-content">
                <CheckCircle :size="18" class="status-icon" />
                <div>
                  <div class="status-label">Active</div>
                  <div class="status-desc">Webhook will receive events</div>
                </div>
              </div>
            </label>
            <label class="status-card" :class="{ selected: status === 'paused' }">
              <input v-model="status" type="radio" value="paused" class="status-radio" />
              <div class="status-content">
                <Pause :size="18" class="status-icon" />
                <div>
                  <div class="status-label">Paused</div>
                  <div class="status-desc">Webhook will not receive events</div>
                </div>
              </div>
            </label>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" @click="handleClose" class="btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn-primary" :disabled="!name || !url || selectedEvents.length === 0">
            {{ webhook ? 'Update Webhook' : 'Create Webhook' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e0e0e0;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #1d1c1d;
  margin: 0;
}

.close-btn {
  padding: 4px;
  border: none;
  background: none;
  color: #616061;
  cursor: pointer;
  border-radius: 4px;
  transition: background 150ms;
}

.close-btn:hover {
  background: #f0f0f0;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1d1c1d;
  margin-bottom: 8px;
}

.form-group input[type="text"],
.form-group input[type="url"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 150ms;
}

.form-group input[type="text"]:focus,
.form-group input[type="url"]:focus {
  outline: none;
  border-color: #611f69;
}

.error-text {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #e01e5a;
}

.help-text {
  font-size: 13px;
  color: #616061;
  margin-top: -4px;
  margin-bottom: 12px;
}

.event-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.event-card {
  position: relative;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms;
  background: white;
}

.event-card:hover {
  border-color: #b8b8b8;
  background: #f8f8f8;
}

.event-card.selected {
  border-color: #611f69;
  background: #f8f4f9;
}

.event-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.event-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.event-icon {
  color: #616061;
}

.event-card.selected .event-icon {
  color: #611f69;
}

.event-label {
  font-size: 13px;
  font-weight: 600;
  color: #1d1c1d;
  text-align: center;
}

.status-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.status-card {
  position: relative;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 150ms;
  background: white;
}

.status-card:hover {
  border-color: #b8b8b8;
  background: #f8f8f8;
}

.status-card.selected {
  border-color: #611f69;
  background: #f8f4f9;
}

.status-radio {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.status-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  color: #616061;
  flex-shrink: 0;
}

.status-card.selected .status-icon {
  color: #611f69;
}

.status-label {
  font-size: 14px;
  font-weight: 600;
  color: #1d1c1d;
}

.status-desc {
  font-size: 12px;
  color: #616061;
  margin-top: 2px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.btn-secondary,
.btn-primary {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms;
  border: none;
}

.btn-secondary {
  background: white;
  color: #1d1c1d;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #f8f8f8;
}

.btn-primary {
  background: #611f69;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #4a154b;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
