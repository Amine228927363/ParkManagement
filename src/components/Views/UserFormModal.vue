<script setup lang="ts">
import { ref, watch } from 'vue'
import { defineProps, defineEmits } from 'vue'
import axios from 'axios'

const props = defineProps({
  isEdit: Boolean,
  user: Object
})

const emit = defineEmits(['close', 'save'])

const formData = ref({
  name: '',
  email: '',
  role: 'SOS_USER',
  password: '',
  status: 'ACTIVE'
})

watch(() => props.user, (newVal) => {
  if (newVal) {
    formData.value = { 
      name: newVal.name || '',
      email: newVal.email || '',
      role: newVal.role || 'SOS_USER',
      password: '', // Don't prefill password for security
      status: newVal.status || 'ACTIVE'
    }
  } else {
    formData.value = { name: '', email: '', role: 'SOS_USER', password: '', status: 'ACTIVE' }
  }
}, { immediate: true })

const isLoading = ref(false)

const generatePassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  formData.value.password = password
}

const validateForm = () => {
  if (!formData.value.name.trim()) {
    alert('Name is required.')
    return false
  }
  if (!formData.value.email.trim() || !formData.value.email.includes('@')) {
    alert('A valid email is required.')
    return false
  }
  if (!props.isEdit && (!formData.value.password || formData.value.password.length < 6)) {
    alert('Password must be at least 6 characters long.')
    return false
  }
  return true
}

const submitForm = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    let response
    if (props.isEdit && props.user?.id) {
      // Update user (including status now)
      response = await axios.put(`http://localhost:3000/api/users/updateUser/${props.user.id}`, {
        name: formData.value.name,
        email: formData.value.email,
        role: formData.value.role,
        password: formData.value.password ? formData.value.password : undefined,
        status: formData.value.status
      })
      alert('User updated successfully!')
    } else {
      // Create user
      response = await axios.post('http://localhost:3000/api/auth/register', formData.value)
      alert('User created successfully!')
    }

    emit('save', response.data)
    emit('close')

  } catch (error) {
    console.error('Error saving user:', error)
    if (error.response?.data?.message) {
      alert(`Error: ${error.response.data.message}`)
    } else {
      alert('Failed to save user. Please try again later.')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
      <h2 class="text-xl font-semibold mb-4">{{ isEdit ? 'Update User' : 'Create User' }}</h2>
      <form @submit.prevent="submitForm">
        <input v-model="formData.name" type="text" placeholder="Name" class="w-full border p-2 mb-2" />
        <input v-model="formData.email" type="email" placeholder="Email" class="w-full border p-2 mb-2" />
        
        <div v-if="!isEdit" class="relative">
          <input 
            v-model="formData.password" 
            type="text" 
            placeholder="Generated Password" 
            class="w-full border p-2 pr-24 mb-2"
          />
          <button
            type="button"
            @click="generatePassword"
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
          >
            Generate
          </button>
        </div>

        <input v-model="formData.role" type="hidden" />
        <div v-if="isEdit" class="mb-4">
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            v-model="formData.status" 
            id="status"
            class="w-full border p-2 rounded"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div class="flex justify-end gap-2 mt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button :disabled="isLoading" type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
            {{ isEdit ? 'Update' : 'Save' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Optional modal styling */
</style>
