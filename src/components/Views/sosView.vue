<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-800 text-white">
      <div class="p-4">
        <h1 class="text-xl font-bold">SOS System</h1>
        <p class="text-xs text-blue-200 mt-1">Vehicle Management</p>
      </div>
      
      <nav class="mt-6">
        <div class="px-4 py-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
          Main
        </div>
        <a href="#" class="flex items-center px-4 py-3 text-blue-100 bg-blue-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Vehicle Entry
        </a>
        <a href="#" class="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          Reports
        </a>
        
        <div class="px-4 py-2 mt-6 text-xs font-semibold text-blue-300 uppercase tracking-wider">
          Administration
        </div>
        <a href="#" class="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </a>
      </nav>

      <div class="absolute bottom-0 w-64 p-4 bg-blue-900">
        <div class="flex items-center">
          <div class="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-blue-800 font-bold">
            {{ currentUser.name.charAt(0) }}
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium">{{ currentUser.name }}</p>
            <p class="text-xs text-blue-300">{{ currentUser.role }}</p>
          </div>
        </div>
        <button 
          @click="logout" 
          class="mt-3 w-full text-sm px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-blue-100"
        >
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <header class="bg-white shadow">
        <div class="px-4 py-4 sm:px-6 flex justify-between items-center">
          <h1 class="text-xl font-semibold text-gray-900">SOS Vehicle Management</h1>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-600">{{ new Date().toLocaleDateString() }}</span>
            <button class="p-1 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main class="p-6">
        <!-- Dashboard Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-blue-500 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-600">Today's Entries</h2>
                <p class="text-2xl font-bold text-gray-900">{{ stats.todayEntries }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-green-500 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-600">Total Vehicles</h2>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalVehicles }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-purple-500 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-600">Available Spaces</h2>
                <p class="text-2xl font-bold text-gray-900">{{ stats.availableSpaces }}</p>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="bg-red-500 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <h2 class="text-sm font-medium text-gray-600">Average Stay</h2>
                <p class="text-2xl font-bold text-gray-900">{{ stats.averageStay }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Camera Section -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Vehicle Entry</h2>
                <p class="mt-1 text-sm text-gray-500">Take a photo and system will recognize details automatically</p>
              </div>

              <div class="p-4">
                <!-- Camera View -->
                <div class="relative">
                  <video 
                    ref="videoElement" 
                    class="w-full h-64 bg-black object-cover rounded-lg"
                    v-show="!imageCaptured"
                  ></video>
                  <img 
                    v-if="imageCaptured" 
                    :src="capturedImage" 
                    class="w-full h-64 object-cover rounded-lg"
                    alt="Captured vehicle" 
                  />

                  <!-- Camera Controls -->
                  <div class="absolute bottom-4 left-0 right-0 flex justify-center">
                    <button 
                      v-if="!imageCaptured"
                      @click="captureImage" 
                      class="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    <div v-else class="flex space-x-3">
                      <button 
                        @click="retakeImage" 
                        class="bg-gray-600 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                      <button 
                        @click="saveImage" 
                        class="bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Vehicle Details Form - Auto-filled after image capture -->
                <div class="mt-6">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label for="licensePlate" class="block text-sm font-medium text-gray-700">License Plate</label>
                      <input 
                        type="text" 
                        id="licensePlate" 
                        v-model="vehicleInfo.licensePlate"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="{'bg-green-50': vehicleInfo.autoDetected}"
                      />
                      <span v-if="vehicleInfo.autoDetected" class="text-xs text-green-600">Auto-detected</span>
                    </div>
                    <div>
                      <label for="model" class="block text-sm font-medium text-gray-700">Vehicle Model</label>
                      <input 
                        type="text" 
                        id="model" 
                        v-model="vehicleInfo.model"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="{'bg-green-50': vehicleInfo.autoDetected}"
                      />
                      <span v-if="vehicleInfo.autoDetected" class="text-xs text-green-600">Auto-detected</span>
                    </div>
                    <div>
                      <label for="make" class="block text-sm font-medium text-gray-700">Make</label>
                      <input 
                        type="text" 
                        id="make" 
                        v-model="vehicleInfo.make"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="{'bg-green-50': vehicleInfo.autoDetected}"
                      />
                      <span v-if="vehicleInfo.autoDetected" class="text-xs text-green-600">Auto-detected</span>
                    </div>
                    <div>
                      <label for="color" class="block text-sm font-medium text-gray-700">Color</label>
                      <input 
                        type="text" 
                        id="color" 
                        v-model="vehicleInfo.color"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        :class="{'bg-green-50': vehicleInfo.autoDetected}"
                      />
                      <span v-if="vehicleInfo.autoDetected" class="text-xs text-green-600">Auto-detected</span>
                    </div>
                    <div>
                      <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
                      <input 
                        type="text" 
                        id="notes" 
                        v-model="vehicleInfo.notes"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="space" class="block text-sm font-medium text-gray-700">Assigned Space</label>
                      <select 
                        id="space" 
                        v-model="vehicleInfo.space"
                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="">Auto-assign</option>
                        <option v-for="space in availableSpaces" :key="space" :value="space">Space {{ space }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="mt-4 flex justify-end">
                    <button 
                      @click="submitEntry" 
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      :disabled="!imageCaptured"
                    >
                      Register Entry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Entries -->
          <div>
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 class="text-lg font-medium text-gray-900">Recent Entries</h2>
                  <p class="mt-1 text-sm text-gray-500">Last 5 vehicle entries</p>
                </div>
                <button class="text-sm text-blue-600 hover:text-blue-800">View All</button>
              </div>
              <div class="p-4">
                <div v-if="recentEntries.length === 0" class="text-center py-8 text-gray-500">
                  No recent entries
                </div>
                <ul v-else class="divide-y divide-gray-200">
                  <li v-for="entry in recentEntries" :key="entry.id" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0 h-12 w-12">
                        <img 
                          :src="entry.imageUrl" 
                          alt="Vehicle photo" 
                          class="h-12 w-12 rounded-md object-cover"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex justify-between">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ entry.licensePlate }}
                          </p>
                          <p class="text-xs text-gray-400">
                            {{ formatTime(entry.timestamp) }}
                          </p>
                        </div>
                        <p class="text-sm text-gray-500 truncate">
                          {{ entry.make }} {{ entry.model }} • {{ entry.color }}
                        </p>
                        <div class="flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span class="text-xs text-gray-500 ml-1">Space {{ entry.space }}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Parking Capacity Chart -->
            <div class="bg-white rounded-lg shadow overflow-hidden mt-6">
              <div class="p-4 border-b border-gray-200">
                <h2 class="text-lg font-medium text-gray-900">Parking Capacity</h2>
              </div>
              <div class="p-4">
                <div class="relative pt-1">
                  <div class="flex mb-2 items-center justify-between">
                    <div>
                      <span class="text-xs font-semibold inline-block text-blue-600">
                        {{ capacityPercentage }}% Occupied
                      </span>
                    </div>
                    <div class="text-right">
                      <span class="text-xs font-semibold inline-block text-blue-600">
                        {{ stats.totalVehicles }}/{{ stats.totalVehicles + stats.availableSpaces }}
                      </span>
                    </div>
                  </div>
                  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                    <div :style="{ width: capacityPercentage + '%' }" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"></div>
                  </div>
                </div>

                <!-- Time distribution chart placeholder -->
                <div class="h-48 bg-gray-50 rounded-lg flex items-center justify-center mt-4">
                  <span class="text-gray-400 text-sm">Entry/Exit Time Distribution Chart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    
    <!-- Status Notification -->
    <div 
      v-if="notification.show" 
      class="fixed bottom-4 right-4 rounded-md px-4 py-3 shadow-lg z-50"
      :class="notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SOSUserDashboard',
  data() {
    return {
      currentUser: {
        name: 'SOS Officer',
        role: 'SOS_USER'
      },
      stream: null,
      imageCaptured: false,
      capturedImage: null,
      vehicleInfo: {
        licensePlate: '',
        model: '',
        make: '',
        color: '',
        notes: '',
        space: '',
        autoDetected: false
      },
      recentEntries: [],
      stats: {
        todayEntries: 42,
        totalVehicles: 135,
        availableSpaces: 65,
        averageStay: '2.3h'
      },
      availableSpaces: [101, 102, 103, 105, 107, 110, 115, 120],
      notification: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    capacityPercentage() {
      const total = this.stats.totalVehicles + this.stats.availableSpaces;
      return Math.round((this.stats.totalVehicles / total) * 100);
    }
  },
  mounted() {
    this.initCamera();
    this.fetchRecentEntries();
    this.fetchDashboardStats();
  },
  beforeUnmount() {
    this.stopCamera();
  },
  methods: {
    async initCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        
        this.$refs.videoElement.srcObject = this.stream;
        this.$refs.videoElement.play();
      } catch (err) {
        console.error('Error accessing camera:', err);
        this.showNotification('Camera access denied. Please check permissions.', 'error');
      }
    },
    stopCamera() {
      if (this.stream) {
        const tracks = this.stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
    captureImage() {
      const video = this.$refs.videoElement;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      this.capturedImage = canvas.toDataURL('image/jpeg');
      this.imageCaptured = true;
      
      // Simulate auto-detection of vehicle details
      this.detectVehicleDetails();
    },
    detectVehicleDetails() {
      // In a real application, this would send the image to an AI/ML service
      // Here we'll simulate a response after a delay
      
      this.showNotification('Processing image...', 'success');
      
      setTimeout(() => {
        // Mock data - in real life this would come from the AI service
        const detectedData = {
          licensePlate: 'ABC 123',
          make: 'Toyota',
          model: 'Corolla',
          color: 'Silver',
          year: '2023'
        };
        
        // Populate form fields with detected data
        this.vehicleInfo = {
          ...this.vehicleInfo,
          licensePlate: detectedData.licensePlate,
          make: detectedData.make,
          model: detectedData.model,
          color: detectedData.color,
          autoDetected: true
        };
        
        this.showNotification('Vehicle details detected successfully', 'success');
      }, 1500);
    },
    retakeImage() {
      this.imageCaptured = false;
      this.capturedImage = null;
      this.vehicleInfo = {
        licensePlate: '',
        model: '',
        make: '',
        color: '',
        notes: '',
        space: '',
        autoDetected: false
      };
    },
    async submitEntry() {
      // Validate input
      if (!this.vehicleInfo.licensePlate) {
        this.showNotification('License plate is required', 'error');
        return;
      }
      
      try {
        // Convert base64 to blob for upload
        const imageResponse = await fetch(this.capturedImage);
        const blob = await imageResponse.blob(); 
        const formData = new FormData();
        formData.append('image', blob, 'vehicle.jpg');
        formData.append('licensePlate', this.vehicleInfo.licensePlate);
        formData.append('model', this.vehicleInfo.model);
        formData.append('make', this.vehicleInfo.make);
        formData.append('color', this.vehicleInfo.color);
        formData.append('notes', this.vehicleInfo.notes);
        formData.append('space', this.vehicleInfo.space);
        formData.append('timestamp', new Date().toISOString());
        formData.append('userId', this.currentUser.name); // Assuming user ID is the name for simplicity
        formData.append('autoDetected', this.vehicleInfo.autoDetected);
        formData.append('year', this.vehicleInfo.year); // Assuming year is part of vehicle info
        const entryResponse = await fetch('/api/entries', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) {
          throw new Error('Failed to submit entry');
        }
        const newEntry = await response.json();
        this.recentEntries.unshift(newEntry);
        this.recentEntries = this.recentEntries.slice(0, 5); // Keep only the last 5 entries
        this.showNotification('Vehicle entry registered successfully', 'success');
        this.retakeImage(); // Reset the form after submission
      } catch (error) {
        console.error('Error submitting entry:', error);
        this.showNotification('Failed to register vehicle entry', 'error');
      }
    },
    async fetchRecentEntries() {
      try {
        const response = await fetch('/api/entries/recent');
        if (!response.ok) {
          throw new Error('Failed to fetch recent entries');
        }
        this.recentEntries = await response.json();
      } catch (error) {
        console.error('Error fetching recent entries:', error);
      }
    },
    async fetchDashboardStats() {
      try {
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        this.stats = await response.json();
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    },
    showNotification(message, type) {
      this.notification.message = message;
      this.notification.type = type;
      this.notification.show = true;
      setTimeout(() => {
        this.notification.show = false;
      }, 3000);
    },
    logout() {
      // Handle logout logic here
      this.showNotification('Logged out successfully', 'success');
    }
  }
}
</script>
<style scoped>
  /* Add any additional styles here */
  .bg-gray-50 {
    background-color: #f9fafb;
  }
  </style>