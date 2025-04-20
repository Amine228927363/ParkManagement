<script setup lang="ts">
// Import the same font that we used in the landing page
import { ref } from 'vue';
import { login } from '../../services/authServices';
// Form validation state
const email = ref('');
const password = ref('');
const emailError = ref('');
const passwordError = ref('');

// Form validation
const validateForm = () => {
  let isValid = true;
  
  // Email validation
  if (!email.value) {
    emailError.value = 'Email is required';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailError.value = 'Please enter a valid email';
    isValid = false;
  } else {
    emailError.value = '';
  }
  
  // Password validation
  if (!password.value) {
    passwordError.value = 'Password is required';
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.value = 'Password must be at least 6 characters';
    isValid = false;
  } else {
    passwordError.value = '';
  }
  
  return isValid;
};

// Submit handler
const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const data = await login({ email: email.value, password: password.value });

      // Save token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      // Redirect based on role
      if (data.role === 'ADMIN') {
        window.location.href = '/dashboard';
      } else if (data.role === 'SOS_USER') {
        window.location.href = '/sosView';
      } else {
        window.location.href = '/';
      }

    } catch (error: any) {
      console.error('Login error:', error.message);
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12 flex flex-col justify-center">
    <!-- LEONI Logo -->
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-5xl font-bold text-blue-950">LEONI</h1>
      <p class="mt-2 text-blue-600 font-medium">ParkEase Management System</p>
    </div>
    
    <div class="relative max-w-md mx-auto w-full px-4">
      <!-- Decorative background with the brand color -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      
      <!-- Login form container -->
      <div class="relative bg-white shadow-xl rounded-3xl p-8 md:p-10">
        <div class="max-w-md mx-auto">
          <div class="text-center">
            <h2 class="text-2xl md:text-3xl font-bold text-blue-900">Welcome Back</h2>
            <p class="mt-2 text-gray-600">Log in to access your ParkEase dashboard</p>
          </div>
          
          <div class="mt-8">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Email input with floating label -->
              <div class="relative">
                <input 
                  v-model="email"
                  autocomplete="email" 
                  id="email" 
                  name="email" 
                  type="email" 
                  class="peer placeholder-transparent h-12 w-full px-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" 
                  placeholder="Email address" 
                />
                <label 
                  for="email" 
                  class="absolute left-2 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
                >
                  Email Address
                </label>
                <p v-if="emailError" class="mt-1 text-red-500 text-sm">{{ emailError }}</p>
              </div>
              
              <!-- Password input with floating label -->
              <div class="relative">
                <input 
                  v-model="password"
                  autocomplete="current-password" 
                  id="password" 
                  name="password" 
                  type="password" 
                  class="peer placeholder-transparent h-12 w-full px-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600 transition-colors" 
                  placeholder="Password" 
                />
                <label 
                  for="password" 
                  class="absolute left-2 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 transition-all peer-focus:-top-3.5 peer-focus:text-blue-600 peer-focus:text-sm"
                >
                  Password
                </label>
                <p v-if="passwordError" class="mt-1 text-red-500 text-sm">{{ passwordError }}</p>
              </div>
              
              <!-- Remember me and forgot password -->
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                  <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <div class="text-sm">
                  <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot password?</a>
                </div>
              </div>
              
              <!-- Login button -->
              <div>
                <button 
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-300 hover:scale-105"
                >
                  Sign in
                </button>
              </div>
            </form>
            
            <!-- Divider -->
            <div class="my-6 flex items-center">
              <div class="flex-grow border-t border-gray-300"></div>
              <span class="flex-shrink mx-4 text-gray-500">or</span>
              <div class="flex-grow border-t border-gray-300"></div>
            </div>
            
            <!-- Social login buttons -->
            <div class="space-y-4">
              <!-- Google login button -->
              <button 
                class="w-full flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48">
                  <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" fill="#FBBC05"></path>
                  <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" fill="#EB4335"></path>
                  <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" fill="#34A853"></path>
                  <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" fill="#4285F4"></path>
                </svg>
                <span>Continue with Google</span>
              </button>
              
              <!-- Microsoft login button -->
              <button 
                class="w-full flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-sm px-6 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105"
              >
                <svg class="h-5 w-5 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                  <path d="M11 11H0V0h11v11z" fill="#F25022"/>
                  <path d="M23 11H12V0h11v11z" fill="#7FBA00"/>
                  <path d="M11 23H0V12h11v11z" fill="#00A4EF"/>
                  <path d="M23 23H12V12h11v11z" fill="#FFB900"/>
                </svg>
                <span>Continue with Microsoft</span>
              </button>
            </div>
          </div>
          
          <!-- Sign up link -->
          <div class="text-center mt-8">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500"> Sign up </a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="mt-12 text-center text-sm text-gray-500">
      <p>© 2025 LEONI. All rights reserved.</p>
      <div class="mt-2">
        <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Privacy Policy</a>
        <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Terms of Service</a>
        <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Contact Us</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Add a subtle animation for smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Enhance hover effects with transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}

/* Enhance focus effects for accessibility */
input:focus, 
button:focus {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}
</style>