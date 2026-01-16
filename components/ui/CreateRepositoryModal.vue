<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" @click.self="onCancel" @keydown.esc="onCancel">
      <div class="bg-white rounded-xl shadow-xl max-w-2xl w-full flex flex-col max-h-[90vh]" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-xl">
          <h2 id="modal-title" class="text-xl font-semibold text-slate-900">Create repository</h2>
          <button @click="onCancel" class="p-2 text-slate-400 hover:text-slate-600 rounded-lg" aria-label="Close" :disabled="loading">
            <X :size="20" />
          </button>
        </div>

        <div class="p-6 space-y-6 overflow-y-auto flex-1">
          <div>
            <label for="repo-name" class="block text-sm font-medium text-slate-900 mb-2">
              Repository Name <span class="text-red-500">*</span>
            </label>
            <input ref="nameInput" id="repo-name" v-model="repoName" type="text" placeholder="my-repository" maxlength="100" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" :class="{ 'border-red-500': errors.name }" aria-required="true" @input="handleNameInput" @blur="validateName" />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            <p v-else class="mt-1 text-xs text-slate-500">{{ repoName.length }}/100 characters</p>
          </div>

          <div>
            <label for="repo-description" class="block text-sm font-medium text-slate-900 mb-2">Short description</label>
            <textarea id="repo-description" v-model="description" rows="3" maxlength="500" placeholder="A short description to identify your repository" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"></textarea>
            <p class="mt-1 text-xs text-slate-500">{{ description.length }}/500 characters. If the repository is public, this description is used to index your content.</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-900 mb-3">Visibility</label>
            <p class="text-xs text-slate-500 mb-3">Using 1 of 1 private repositories. <a href="#" class="text-indigo-600 hover:text-indigo-700">Get more</a></p>
            <div class="space-y-3">
              <label class="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors" :class="visibility === 'public' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'">
                <input v-model="visibility" type="radio" value="public" class="mt-1" />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <Globe :size="16" />
                    <span class="font-medium text-slate-900">Public</span>
                  </div>
                  <p class="text-sm text-slate-600">Anyone can pull images from this repository</p>
                </div>
              </label>
              <label class="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors" :class="visibility === 'private' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'">
                <input v-model="visibility" type="radio" value="private" class="mt-1" />
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-1">
                    <Lock :size="16" />
                    <span class="font-medium text-slate-900">Private</span>
                  </div>
                  <p class="text-sm text-slate-600">Only you and collaborators can access</p>
                </div>
              </label>
            </div>
          </div>

          <div class="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 class="font-medium text-slate-900 mb-2">Pushing images</h3>
            <p class="text-sm text-slate-600 mb-3">You can push a new image to this repository using the CLI:</p>
            <div class="space-y-2 font-mono text-sm">
              <div class="bg-slate-900 text-slate-100 px-3 py-2 rounded">docker tag local-image:tagname imagehub.com/{{ repoName || 'new-repo' }}:tagname</div>
              <div class="bg-slate-900 text-slate-100 px-3 py-2 rounded">docker push imagehub.com/{{ repoName || 'new-repo' }}:tagname</div>
            </div>
            <p class="text-xs text-slate-500 mt-2">Make sure to replace tagname with your desired image repository tag.</p>
          </div>
        </div>

        <div class="bg-white border-t border-slate-200 px-6 py-4 flex gap-3 justify-end rounded-b-xl">
          <button @click="onCancel" class="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 font-medium" :disabled="loading">
            Cancel
          </button>
          <button @click="handleCreate" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed" :disabled="loading || !repoName.trim()">
            <span v-if="loading">Creating...</span>
            <span v-else>Create</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { X, Globe, Lock } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['create', 'cancel'])

const nameInput = ref(null)
const repoName = ref('')
const description = ref('')
const visibility = ref('private')
const loading = ref(false)
const errors = ref({})

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    repoName.value = ''
    description.value = ''
    visibility.value = 'private'
    errors.value = {}
    loading.value = false
    await nextTick()
    nameInput.value?.focus()
  }
})

const handleNameInput = (e) => {
  repoName.value = e.target.value.toLowerCase()
  if (errors.value.name) validateName()
}

const validateName = () => {
  errors.value.name = ''
  if (!repoName.value.trim()) {
    errors.value.name = 'Repository name is required'
    return false
  }
  if (repoName.value.length < 2) {
    errors.value.name = 'Repository name must be at least 2 characters'
    return false
  }
  if (!/^[a-z0-9][a-z0-9-_\/]*[a-z0-9]$/.test(repoName.value)) {
    errors.value.name = 'Must start and end with a letter or number'
    return false
  }
  return true
}

const validateForm = () => validateName()

const handleCreate = async () => {
  if (!validateForm()) return
  loading.value = true
  try {
    await emit('create', {
      name: repoName.value.trim(),
      description: description.value.trim(),
      visibility: visibility.value
    })
  } catch (e) {
    loading.value = false
  }
}

const onCancel = () => {
  if (!loading.value) emit('cancel')
}
</script>
