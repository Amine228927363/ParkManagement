<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col">
    <!-- Header with Logo -->
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

    <!-- Main Content -->
    <main class="flex-1 flex flex-col items-center justify-center px-4">
      <div class="max-w-3xl w-full text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Welcome to ParkEase</h2>
        <p class="text-lg text-gray-700 mb-12 max-w-xl mx-auto">
          The smart parking management solution for your facility. Easy to use, powerful to manage.
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <router-link 
            to="/login" 
            class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg shadow-blue-300/30 font-medium text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign In
          </router-link>
          <router-link 
            to="/register" 
            class="px-8 py-4 bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-200 rounded-lg shadow-lg shadow-blue-100/20 font-medium text-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Account
          </router-link>
        </div>
        
        <!-- Feature Highlights -->
        <div class="grid md:grid-cols-3 gap-6 mt-8">
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Easy Management</h3>
            <p class="text-gray-600">Simplify your parking operations with our intuitive dashboard</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Secure System</h3>
            <p class="text-gray-600">Advanced security features to protect your parking facility</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-md">
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-800 mb-2">Real-time Analytics</h3>
            <p class="text-gray-600">Track usage and optimize your parking resources</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-6 mt-12">
      <div class="container mx-auto px-4">
        <div class="text-center text-sm text-gray-500">
          <p>© 2025 LEONI. All rights reserved.</p>
          <div class="mt-2">
            <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Privacy Policy</a>
            <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Terms of Service</a>
            <a href="#" class="text-blue-600 hover:text-blue-500 mx-2">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No additional functionality needed for this landing page
// All navigation is handled by router-link components
</script>

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
</style>