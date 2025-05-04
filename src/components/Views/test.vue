<template>
  <div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6">
    <div class="max-w-2xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        
        <!-- Header -->
        <header class="w-full py-6 bg-white border-b border-gray-200">
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

        <!-- Title -->
        <div class="bg-blue-900 py-6 px-6">
          <h2 class="text-2xl font-bold text-white text-center">SOS User Account Request</h2>
        </div>

        <div class="p-6">
          <!-- Intro -->
          <p class="text-gray-600 mb-6 text-center">
            Complete this form to request an SOS user account. Your request will be sent to an administrator for review.
          </p>

          <!-- Success Message -->
          <div v-if="submitted && !error" class="bg-green-50 border-l-4 border-green-600 p-4 rounded mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-green-800">Request Submitted Successfully!</h3>
                <p class="mt-2 text-sm text-green-700">You will be notified via email once your request has been processed.</p>
                <button @click="resetForm" class="mt-3 text-sm font-medium text-green-600 hover:underline">Submit another request</button>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-6">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.293 9.293a1 1 0 011.414 0L10 9.586l.293-.293a1 1 0 111.414 1.414L11.414 11l.293.293a1 1 0 01-1.414 1.414L10 12.414l-.293.293a1 1 0 01-1.414-1.414L8.586 11l-.293-.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-red-800">Submission Failed</h3>
                <p class="mt-2 text-sm text-red-700">{{ error }}</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form v-if="!submitted" @submit.prevent="submitForm" class="space-y-6">

            <!-- Personal Information -->
            <section class="bg-gray-50 p-4 rounded-md">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
              <InputField label="Full Name" id="fullName" type="text" v-model="form.fullName" required />
              <InputField label="Email Address" id="email" type="email" v-model="form.email" required />
              <InputField label="Phone Number" id="phone" type="tel" v-model="form.phone" required />
            </section>

            <!-- Professional Information -->
            <section class="bg-gray-50 p-4 rounded-md">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
              <InputField label="Organization" id="organization" type="text" v-model="form.organization" required />
              <InputField label="Role/Position" id="role" type="text" v-model="form.role" required />
              
              <div>
                <label for="accountType" class="block text-sm font-medium text-gray-700">Account Type <span class="text-red-600">*</span></label>
                <select id="accountType" v-model="form.accountType" required class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50">
                  <option value="" disabled>-- Select Account Type --</option>
                  <option value="emergency_responder">Emergency Responder</option>
                </select>
              </div>

              <div>
                <label for="justification" class="block text-sm font-medium text-gray-700">Justification <span class="text-red-600">*</span></label>
                <textarea id="justification" v-model="form.justification" rows="4" required class="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50" placeholder="Explain your need for access..."></textarea>
              </div>
            </section>

            <!-- Supervisor Information -->
            <section class="bg-gray-50 p-4 rounded-md">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Supervisor Information</h3>
              <InputField label="Supervisor Name" id="supervisorName" type="text" v-model="form.supervisorName" required />
              <InputField label="Supervisor Email" id="supervisorEmail" type="email" v-model="form.supervisorEmail" required />
            </section>

            <!-- Submit -->
            <div>
              <button type="submit" :disabled="isSubmitting" class="w-full py-3 px-4 bg-blue-900 hover:bg-blue-950 disabled:bg-gray-400 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                <span v-if="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Processing...
                </span>
                <span v-else>Submit Request</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    InputField: {
      props: ['label', 'id', 'type', 'modelValue', 'required'],
      emits: ['update:modelValue'],
      template: `
        <div>
          <label :for="id" class="block text-sm font-medium text-gray-700">
            {{ label }} <span v-if="required" class="text-red-600">*</span>
          </label>
          <input
            :id="id"
            :type="type"
            :required="required"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-500 focus:ring-opacity-50"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
          />
        </div>
      `
    }
  },
  data() {
    return {
      form: {
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        accountType: '',
        justification: '',
        supervisorName: '',
        supervisorEmail: '',
      },
      submitted: false,
      isSubmitting: false,
      error: null,
    };
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true;
      this.error = null;
      try {
        // Fake async simulation
        await new Promise(resolve => setTimeout(resolve, 1500));
        this.submitted = true;
      } catch (err) {
        this.error = "Something went wrong. Please try again.";
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.form = {
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
        accountType: '',
        justification: '',
        supervisorName: '',
        supervisorEmail: '',
      };
      this.submitted = false;
      this.error = null;
    }
  }
};
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>
