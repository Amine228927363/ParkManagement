<template>
    <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Header -->
          <header class="w-full py-6">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center">
          <div class="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-blue-950">LEONI</h1>
            <p class="text-sm text-blue-600">ParkEase Management System</p>
          </div>
        </div>
      </div>
    </header>
          <div class="bg-blue-900 py-6 px-6">
            <h1 class="text-2xl font-bold text-white text-center">SOS User Account Request</h1>
          </div>
          
          <div class="p-6">
            <p class="text-gray-600 mb-6 text-center">
              Complete this form to request an SOS user account. Your request will be automatically sent to an administrator for review.
            </p>
            
            <!-- Form -->
            <form v-if="!submitted" @submit.prevent="submitForm" class="space-y-6">
              <!-- Personal Information Section -->
              <div class="bg-gray-50 p-4 rounded-md">
                <h2 class="text-lg font-medium text-gray-800 mb-4">Personal Information</h2>
                
                <div class="space-y-4">
                  <!-- Full Name -->
                  <div>
                    <label for="fullName" class="block text-sm font-medium text-gray-700">
                      Full Name <span class="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      v-model="form.name"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </div>
                  
                  <!-- Email -->
                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">
                      Email Address <span class="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      v-model="form.email"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </div>
                  
                  <!-- Phone -->
                  <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">
                      Phone Number <span class="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      v-model="form.phone"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Professional Information Section -->
              <div class="bg-gray-50 p-4 rounded-md">
                <h2 class="text-lg font-medium text-gray-800 mb-4">Professional Information</h2>
                
                <div class="space-y-4">
                  <!-- Organization -->
                  <div>
                    <label for="organization" class="block text-sm font-medium text-gray-700">
                      Organization <span class="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="organization"
                      v-model="form.organization"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </div>
                  
                  <!-- Role -->
                  <div>
                    <label for="role" class="block text-sm font-medium text-gray-700">
                      Role/Position <span class="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="role"
                      v-model="form.role"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    />
                  </div>
                  
                  <!-- Account Type -->
                  <div>
                    <label for="accountType" class="block text-sm font-medium text-gray-700">
                      Account Type Requested <span class="text-red-600">*</span>
                    </label>
                    <select
                      id="accountType"
                      v-model="form.accountType"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    >
                      <option value="" disabled>-- Select Account Type --</option>
                      <option value="emergency_responder">Emergency Responder</option>
                    </select>
                  </div>
                  <!-- Justification -->
                  <div>
                    <label for="justification" class="block text-sm font-medium text-gray-700">
                      Justification for Account <span class="text-red-600">*</span>
                    </label>
                    <textarea
                      id="justification"
                      v-model="form.message"
                      rows="4"
                      required
                      placeholder="Please explain why you need access to the SOS system and how you will use it."
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
                    ></textarea>
                  </div>
                </div>
              </div>
              
            
              
              <!-- Submit Button -->
              <div>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-3 px-4 bg-blue-900 hover:bg-blue-950 disabled:bg-red-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <span v-if="isSubmitting">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else>Submit Request</span>
                </button>
              </div>
            </form>
            
            <!-- Success Message -->
            <div v-if="submitted && !error" class="mt-6 bg-green-50 border-l-4 border-green-600 p-4 rounded">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-green-800">Request Submitted Successfully!</h3>
                  <p class="mt-2 text-sm text-green-700">
                    Your SOS user account request has been sent to the administrator for review. 
                    You will be notified via email once your request has been processed.
                  </p>
                  <div class="mt-4">
                    <button
                      type="button"
                      @click="resetForm"
                      class="text-sm font-medium text-green-600 hover:text-green-500"
                    >
                      Submit another request
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Error Message -->
            <div v-if="error" class="mt-6 bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg class="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <h3 class="text-lg font-medium text-red-800">Error Submitting Request</h3>
                  <p class="mt-2 text-sm text-red-700">
                    There was a problem submitting your request. Please try again later or contact support.
                  </p>
                  <div class="mt-4">
                    <button
                      type="button"
                      @click="error = false"
                      class="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
import { createAccountRequest } from '../../../services/accountRequests';

  // Form data
  const form = reactive({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  // Form state
  const submitted = ref(false);
  const isSubmitting = ref(false);
  const error = ref(false);
  
  // Submit form
  const submitForm = async () => {
    isSubmitting.value = true;
    console.log('Submitting form:', form);
    
    try {
      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await (createAccountRequest(form));
  
      
      console.log('Form submitted:', form);
      submitted.value = true;
    } catch (err) {
      console.error('Error submitting form:', err);
      error.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Reset form for new submission
  const resetForm = () => {
    Object.keys(form).forEach(key => {
      form[key] = '';
    });
    submitted.value = false;
    error.value = false;
  };
  </script>