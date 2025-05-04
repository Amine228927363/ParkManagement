<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-blue-950 text-white">
      <div class="p-4">
        <h1 class="text-xl font-bold">SOS System</h1>
        <p class="text-xs text-blue-200 mt-1">Vehicle Management</p>
      </div>
      
      <nav class="mt-6">
        <div class="px-4 py-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
          Main
        </div>
        <router-link to="/sosView" class="flex items-center px-4 py-3 text-blue-100 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </router-link>
        <router-link to="/vehicleExit" class="flex items-center px-4 py-3 text-blue-100 hover:bg-blue-700 bg-blue-800">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Vehicle Exit
        </router-link>
        
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
          @click="handleLogout" 
          class="mt-3 w-full text-sm px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-blue-100"
        >
          Sign out
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      
      <main class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Camera Section -->
          <div class="lg:col-span-2">
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="p-4 border-b border-gray-200">
      <h2 class="text-lg font-medium text-gray-900">Vehicle Exit</h2>
      <p class="mt-1 text-sm text-gray-500">Take a photo or upload an image for automatic detail recognition</p>
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

        <!-- Camera/Upload Controls -->
        <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-3">
          <!-- Camera Button -->
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
          
          <!-- Upload Button -->
          <label 
            v-if="!imageCaptured"
            class="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <input 
              type="file" 
              accept="image/*" 
              @change="handleFileUpload" 
              class="hidden"
            />
          </label>
          
          <!-- Retake/Save Buttons (After Capture) -->
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
              v-model="vehicleInfo.vehiclePlate"
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
              v-model="vehicleInfo.vehicleType"
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
              v-model="vehicleInfo.vehicleColor"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              :class="{'bg-green-50': vehicleInfo.autoDetected}"
            />
            <span v-if="vehicleInfo.autoDetected" class="text-xs text-green-600">Auto-detected</span>
          </div>
          <div>
            <label for="space" class="block text-sm font-medium text-gray-700">Assigned Space</label>
            <select 
              id="space" 
              v-model="vehicleInfo.parkingSpace"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Auto-assign</option>
              <option v-for="space in occupiedSpaces" :key="space" :value="space.spaceNumber">Space {{ space.spaceNumber }}</option>
            </select>
          </div>
        </div>

        <div class="mt-4 flex justify-end">
          <button 
            @click="submitEntry" 
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            :disabled="!imageCaptured"
          >
            Exit
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
                        <p>{{ entry.vehiclePlate}}</p>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex justify-between">
                          <p class="text-sm font-medium text-gray-900 truncate">
                            {{ entry.licensePlate }}
                          </p>
                          <p class="text-xs text-gray-400">
                            {{ formatTime(entry.createdAt) }}
                          </p>
                        </div>
                        <p class="text-sm text-gray-500 truncate">
                           {{ entry.vehicleType }} • {{ entry.vehicleColor }}
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

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { analyzeCarImage } from '../../../services/geminiModel'
import { deleteArrivalByVehiclePlate,getAllArrivals } from '../../../services/arrival'
import { getAllSpaces, updateSpaceStatusByNumber } from '../../../services/parkingSpace'
// Router
const router = useRouter()
const currentUser = reactive({
  name: 'SOS Officer',
  role: 'SOS_USER'
})
const parkingSpace = ref([]);
const occupiedSpaces = ref([])
const stream = ref<MediaStream | null>(null)
const imageCaptured = ref(false)
const capturedImage = ref<string | null>(null)
const vehicleInfo = reactive({
  vehiclePlate: '',
  vehicleType: '',
  vehicleColor: '',
  supplierName: '',
  companyName: '',
  parkingSpace: '',
  autoDetected: false,
})

const recentEntries = ref<any[]>([])
const fetchparkingSpaces = async () => {
  try {
    const response = await getAllSpaces()
    parkingSpace.value = response.data
    console.log('Parking Spaces:', parkingSpace.value)  
    occupiedSpaces.value = parkingSpace.value.filter(space => space.status === 'OCCUPIED')
    console.log('Available Spaces:', occupiedSpaces.value)
  } catch (error) {
    console.error('Error fetching parking spaces:', error)
  }
}
const notification = reactive({
  show: false,
  message: '',
  type: 'success'
})
const retakeImage = () => {
  imageCaptured.value = false
  capturedImage.value = null
  Object.assign(vehicleInfo, {
    vehiclePlate: '',
  vehicleType: '',
  vehicleColor: '',
  supplierName: '',
  companyName: '',
  parkingSpace: '',
  autoDetected: false,
  })
}


// Camera
const initCamera = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    const videoElement = document.querySelector('video') as HTMLVideoElement
    if (videoElement && stream.value) {
      videoElement.srcObject = stream.value
      await videoElement.play()
    }
  } catch (err) {
    console.error('Error accessing camera:', err)
    showNotification('Camera access denied. Please check permissions.', 'error')
  }
}

const stopCamera = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
  }
}

const captureImage = async () => {
  const video = document.querySelector('video') as HTMLVideoElement
  if (!video) return

  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  ctx?.drawImage(video, 0, 0, canvas.width, canvas.height)

  capturedImage.value = canvas.toDataURL('image/jpeg')
  imageCaptured.value = true

  await detectVehicleDetails()
}

// Detection (AI)
// Function to detect vehicle details from an image
const detectVehicleDetails = async (imageData = null) => {
  try {
    // Create the form data for the API request
    const formData = new FormData();
    
    if (imageData) {
      // If imageData is provided (from file upload), use it directly
      formData.append('image', imageData);
    } else if (capturedImage.value) {
      // For camera capture, we need to convert the data URL to a blob
      // Check if capturedImage is a string (data URL) or already a Blob
      if (typeof capturedImage.value === 'string' && capturedImage.value.startsWith('data:')) {
        // Convert data URL to Blob
        const response = await fetch(capturedImage.value);
        const blob = await response.blob();
        formData.append('image', blob);
      } else {
        // It's already a Blob
        formData.append('image', capturedImage.value);
      }
    } else {
      showNotification('No image available to analyze.', 'error');
      return;
    }

    // Notify that analysis is starting
    showNotification('Analyzing vehicle image...', 'info');

    // Call the API to analyze the image
    const result = await analyzeCarImage(formData);

    // Process the results
    if (result && result.result) {
      const vehicleDetails = parseVehicleDetails(result.result);
      
      // Update vehicle info with detected details
      vehicleInfo.vehiclePlate = vehicleDetails.vehiclePlate || '';
      vehicleInfo.vehicleType = vehicleDetails.vehicleType || '';
      vehicleInfo.vehicleColor = vehicleDetails.vehicleColor || '';
      vehicleInfo.autoDetected = true;

      showNotification('Vehicle details detected successfully!', 'success');
    } else {
      showNotification('No vehicle information found.', 'error');
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    showNotification('Failed to analyze vehicle image.', 'error');
  }
};

// Helper function to parse vehicle details from the result string
const parseVehicleDetails = (resultString) => {
  const details = {};
  
  // Split the result into lines and extract relevant information
  const lines = resultString.split('\n');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('Car Model:')) {
      details.vehicleType = trimmedLine.replace('Car Model:', '').trim();
    } else if (trimmedLine.startsWith('License Plate:')) {
      details.vehiclePlate = trimmedLine.replace('License Plate:', '').trim();
    } else if (trimmedLine.startsWith('Car Color:')) {
      details.vehicleColor = trimmedLine.replace('Car Color:', '').trim();
    } 
  });
  
  return details;
};

// Function to handle file upload
const handleFileUpload = async (event) => {
  const input = event.target;
  
  // Check if a file was selected
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    // Check if the selected file is an image
    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file.', 'error');
      return;
    }
    
    // Display the selected image
    const reader = new FileReader();
    reader.onload = (e) => {
      // Set the image data and update UI state
      capturedImage.value = e.target.result;
      imageCaptured.value = true;
      
      // Process the uploaded image
      detectVehicleDetails(file);
    };
    
    // Read the file as a data URL to display it
    reader.readAsDataURL(file);
  }
};

// Submit
const submitEntry = async () => {
  if (!vehicleInfo.vehiclePlate) {
    showNotification('License plate is required', 'error')
    return
  }

  try {
    const imageResponse = await fetch(capturedImage.value!)
    const blob = await imageResponse.blob()
    const sosUserId = localStorage.getItem('id') 
    console.log('sosUserId', sosUserId)
    const arrivalData = {
      vehiclePlate: vehicleInfo.vehiclePlate,
      vehicleType: vehicleInfo.vehicleType,
      vehicleColor: vehicleInfo.vehicleColor,
      supplierName: vehicleInfo.supplierName,
      companyName: vehicleInfo.companyName,
      parkingSpace: vehicleInfo.parkingSpace.toString(),
      sosUserId: sosUserId,
      requestedTime: new Date().toISOString(),
      autoDetected: vehicleInfo.autoDetected
    }

    const response = await deleteArrivalByVehiclePlate(arrivalData.vehiclePlate)
    await updateSpaceStatusByNumber(Number(vehicleInfo.parkingSpace), 'AVAILABLE')
    console.log('response', response)
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to submit entry')
    }

    const newEntry = response.data
    recentEntries.value.unshift(newEntry)
    recentEntries.value = recentEntries.value.slice(0, 5)
    
    showNotification('Vehicle entry registered successfully', 'success')
    retakeImage()
  } catch (error) {
    console.error('Error submitting entry:', error)
    showNotification('Failed to register vehicle entry', 'error')
  }
}

// Fetch Dashboard Data
const fetchRecentEntries = async () => {
  try {
    const response = await getAllArrivals()
    console.log('Recent Entries:', response.data)
    recentEntries.value = response.data.slice(0, 5) // Limit to 5 entries
    recentEntries.value.forEach(entry => {
    entry.requestedTime = new Date(entry.timestamp).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    })
  } catch (error) {
    console.error('Error fetching recent entries:', error)
  }
}

const fetchDashboardStats = async () => {
  try {
    const arrivalsResponse = await getAllArrivals()
    console.log('Arrivals:', arrivalsResponse.data)
    stats.totalVehicles = arrivalsResponse.data.length
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
  }
}

// Utils
const formatTime = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
}

const showNotification = (message: string, type: 'success' | 'error') => {
  notification.message = message
  notification.type = type
  notification.show = true
  setTimeout(() => {
    notification.show = false
  }, 3000)
}

const handleLogout = () => {
  // Implement logout logic
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}

// Lifecycle
onMounted(() => {
  initCamera()
  fetchRecentEntries()
  fetchDashboardStats()
  fetchparkingSpaces()
})

onBeforeUnmount(() => {
  stopCamera()
})
</script>
