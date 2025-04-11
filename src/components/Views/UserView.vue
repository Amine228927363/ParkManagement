<!-- RequestParkingSpace.vue -->
<template>
    <div class="min-h-screen py-8 px-4 bg-gradient dark-gradient text-gray-100">
      <!-- Header -->
      <header class="max-w-6xl mx-auto mb-10 text-center">
        <div class="flex justify-start mb-4 text-7xl font-bold text-white">
          <h1>LEONI</h1>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-2">Request Parking Space</h1>
        <p class="text-gray-400">Reserve your spot in our smart parking facility</p>
      </header>
  
      <!-- Main Content -->
      <main class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Main Form -->
          <div class="glass p-8 flex-grow">
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- Full Name -->
                <div class="col-span-1">
                  <label for="fullName" class="block text-sm font-medium mb-2">Full Name</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-user"></i>
                    </span>
                    <input 
                      type="text" 
                      id="fullName" 
                      v-model="formData.fullName" 
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      placeholder="John Doe" 
                      required
                    >
                  </div>
                </div>
  
                <!-- Vehicle Type -->
                <div class="col-span-1">
                  <label for="vehicleType" class="block text-sm font-medium mb-2">Vehicle Type</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-car"></i>
                    </span>
                    <select 
                      id="vehicleType" 
                      v-model="formData.vehicleType" 
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none" 
                      required
                    >
                      <option value="" disabled selected>Select vehicle type</option>
                      <option value="sedan">Sedan</option>
                      <option value="suv">SUV</option>
                      <option value="hatchback">Hatchback</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="truck">Truck</option>
                      <option value="electric">Electric Vehicle</option>
                    </select>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <i class="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </div>
  
                <!-- License Plate -->
                <div class="col-span-1">
                  <label for="licensePlate" class="block text-sm font-medium mb-2">License Plate Number</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-id-card"></i>
                    </span>
                    <input 
                      type="text" 
                      id="licensePlate" 
                      v-model="formData.licensePlate" 
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      placeholder="ABC-1234" 
                      required
                    >
                  </div>
                </div>
  
                <!-- Date & Time -->
                <div class="col-span-1">
                  <label for="arrivalTime" class="block text-sm font-medium mb-2">Date & Time of Arrival</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-calendar-alt"></i>
                    </span>
                    <input 
                      type="datetime-local" 
                      id="arrivalTime" 
                      v-model="formData.arrivalTime" 
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      :min="minDateTime"
                      required
                    >
                  </div>
                </div>
  
                <!-- Duration -->
                <div class="col-span-1">
                  <label for="duration" class="block text-sm font-medium mb-2">Duration of Parking</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-clock"></i>
                    </span>
                    <select 
                      id="duration" 
                      v-model="formData.duration" 
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                      required
                    >
                      <option value="" disabled selected>Select duration</option>
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="4">4 hours</option>
                      <option value="8">8 hours</option>
                      <option value="12">12 hours</option>
                      <option value="24">1 day</option>
                      <option value="48">2 days</option>
                      <option value="custom">Custom duration</option>
                    </select>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                      <i class="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </div>
  
                <!-- Custom Duration (shown only when custom is selected) -->
                <div v-if="formData.duration === 'custom'" class="col-span-1">
                  <label for="customDuration" class="block text-sm font-medium mb-2">Specify Custom Duration (hours)</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <i class="fas fa-hourglass-half"></i>
                    </span>
                    <input 
                      type="number" 
                      id="customDuration" 
                      v-model="formData.customDuration" 
                      min="1"
                      class="w-full py-2 px-10 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                      placeholder="Enter hours"
                      required
                    >
                  </div>
                </div>
              </div>
  
              <!-- Special Requirements -->
              <div class="mb-8">
                <label for="specialRequirements" class="block text-sm font-medium mb-2">Special Requirements</label>
                <div class="relative">
                  <textarea 
                    id="specialRequirements" 
                    v-model="formData.specialRequirements" 
                    rows="3" 
                    class="w-full py-2 px-4 rounded-lg bg-opacity-5 bg-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" 
                    placeholder="Any special parking needs or assistance required?"
                  ></textarea>
                </div>
              </div>
  
              <!-- Vehicle Image Upload -->
              <div class="mb-8">
                <label class="block text-sm font-medium mb-2">Vehicle Image</label>
                <div 
                  class="upload-area rounded-lg p-8 text-center cursor-pointer border-2 border-dashed border-gray-700 hover:border-blue-500 transition-colors"
                  :class="{ 'border-blue-500 bg-blue-500 bg-opacity-5': isDragging }"
                  @dragenter.prevent="isDragging = true"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleFileDrop"
                  @click="triggerFileInput"
                >
                  <div v-if="!imagePreview">
                    <div class="mb-4">
                      <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                    </div>
                    <div>
                      <p class="mb-2">Drag and drop your vehicle image here</p>
                      <p class="text-sm text-gray-400">or</p>
                      <button type="button" class="mt-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Browse Files</button>
                    </div>
                  </div>
                  <div v-else class="mt-4">
                    <img :src="imagePreview" alt="Vehicle preview" class="mx-auto max-h-40 rounded">
                    <button 
                      type="button" 
                      @click.stop="removeImage" 
                      class="mt-2 text-sm text-red-400 hover:text-red-300"
                    >
                      Remove image
                    </button>
                  </div>
                  <input 
                    type="file" 
                    ref="fileInput" 
                    class="hidden" 
                    accept="image/*"
                    @change="handleFileSelect"
                  >
                </div>
              </div>
  
              <!-- Submit Button -->
              <div class="text-center">
                <button 
                  type="submit" 
                  class="gradient-btn py-3 px-8 rounded-lg font-medium text-white shadow-lg transform transition hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-blue-500 to-blue-600"
                >
                  <i class="fas fa-paper-plane mr-2"></i> Submit Request
                </button>
              </div>
            </form>
          </div>
  
          <!-- Sidebar -->
          <div class="w-full md:w-80 lg:w-96">
            <!-- Admin Note Card -->
            <div class="glass p-6 mb-6">
              <div class="flex items-start mb-4">
                <div class="bg-blue-500 rounded-full p-2 mr-3">
                  <i class="fas fa-info text-white"></i>
                </div>
                <h3 class="text-lg font-medium">Admin Note</h3>
              </div>
              <p class="text-gray-300 mb-4">Requests are processed within 24 hours. You'll receive confirmation via email.</p>
              <div class="text-sm text-gray-400">
                <p><i class="fas fa-check-circle mr-2 text-green-400"></i> 95% of requests are approved</p>
                <p><i class="fas fa-clock mr-2 text-yellow-400"></i> Average response time: 4 hours</p>
              </div>
            </div>
  
            <!-- Parking Information Card -->
            <div class="glass p-6">
              <div class="flex items-start mb-4">
                <div class="bg-purple-500 rounded-full p-2 mr-3">
                  <i class="fas fa-parking text-white"></i>
                </div>
                <h3 class="text-lg font-medium">Parking Info</h3>
              </div>
              <div class="flex justify-between items-center p-3 bg-opacity-30 bg-gray-700 rounded-lg mb-3">
                <div>
                  <div class="text-sm text-gray-400">Available Spaces</div>
                  <div class="text-xl font-bold">{{ availableSpaces }}</div>
                </div>
                <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <i class="fas fa-car text-white"></i>
                </div>
              </div>
              <div class="text-sm text-gray-300">
                <p class="flex items-center mb-2"><i class="fas fa-map-marker-alt mr-2 text-red-400"></i> Floor levels: B1, B2, Ground</p>
                <p class="flex items-center mb-2"><i class="fas fa-charging-station mr-2 text-blue-400"></i> EV charging available</p>
                <p class="flex items-center"><i class="fas fa-wheelchair mr-2 text-yellow-400"></i> Accessible parking spaces</p>
              </div>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Toast Notification -->
      <div 
        class="fixed bottom-6 right-6 glass p-4 rounded-lg shadow-lg max-w-sm flex items-center transform transition-all duration-300"
        :class="showToast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'"
      >
        <div class="bg-green-500 rounded-full p-2 mr-3">
          <i class="fas fa-check text-white"></i>
        </div>
        <div>
          <h4 class="font-medium">Request Submitted!</h4>
          <p class="text-sm text-gray-300">Your parking space request has been received.</p>
        </div>
        <button @click="showToast = false" class="ml-4 text-gray-400 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RequestParkingSpace',
    data() {
      return {
        formData: {
          fullName: '',
          vehicleType: '',
          licensePlate: '',
          arrivalTime: this.getCurrentDateTime(),
          duration: '',
          customDuration: null,
          specialRequirements: ''
        },
        imageFile: null,
        imagePreview: null,
        isDragging: false,
        showToast: false,
        availableSpaces: 42
      }
    },
    computed: {
      minDateTime() {
        return this.getCurrentDateTime();
      }
    },
    methods: {
      getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      },
      triggerFileInput() {
        this.$refs.fileInput.click();
      },
      handleFileSelect(event) {
        const file = event.target.files[0];
        if (file && file.type.match('image.*')) {
          this.processImageFile(file);
        }
      },
      handleFileDrop(event) {
        this.isDragging = false;
        const file = event.dataTransfer.files[0];
        if (file && file.type.match('image.*')) {
          this.processImageFile(file);
        }
      },
      processImageFile(file) {
        this.imageFile = file;
        // For a real application, we would use the actual file
        // Here we use a placeholder image since we can't access the file system
        this.imagePreview = "/api/placeholder/400/320";
        
        // In a real app, you would do this:
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   this.imagePreview = e.target.result;
        // };
        // reader.readAsDataURL(file);
      },
      removeImage(event) {
        event.stopPropagation();
        this.imageFile = null;
        this.imagePreview = null;
      },
      submitForm() {
        // In a real application, you would send this data to your backend
        console.log('Form submitted:', this.formData);
        console.log('Image file:', this.imageFile);
        
        // Show success toast
        this.showToast = true;
        
        // Hide toast after 5 seconds
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
        
        // Reset form
        this.resetForm();
      },
      resetForm() {
        this.formData = {
          fullName: '',
          vehicleType: '',
          licensePlate: '',
          arrivalTime: this.getCurrentDateTime(),
          duration: '',
          customDuration: null,
          specialRequirements: ''
        };
        this.imageFile = null;
        this.imagePreview = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .dark-gradient {
    background: linear-gradient(135deg, #25252e 0%, #0c1327 100%);
  }
  
  .glass {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
  }
  
  /* These additional styles could be included in your Tailwind CSS configuration */
  @media (max-width: 768px) {
    .responsive-flex {
      flex-direction: column;
    }
  }
  </style>