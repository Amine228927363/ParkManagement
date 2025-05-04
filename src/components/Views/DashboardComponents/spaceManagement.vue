<template>
    <div class="p-6 max-w-7xl mx-auto my-10 bg-gray-50">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <!-- Header with gradient background -->
        <header class="mb-8 p-6 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold">Parking Space Dashboard</h1>
              <p class="text-blue-100 mt-1">Real-time management and monitoring</p>
            </div>
            <button @click="fetchParkingSpots" class="flex items-center bg-white text-blue-800 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </header>
  
        <!-- Stats Overview -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div class="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <p class="text-sm text-gray-500">Available</p>
            <p class="text-2xl font-bold">{{ getStatusCount('AVAILABLE') }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <p class="text-sm text-gray-500">Occupied</p>
            <p class="text-2xl font-bold">{{ getStatusCount('OCCUPIED') }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <p class="text-sm text-gray-500">Reserved</p>
            <p class="text-2xl font-bold">{{ getStatusCount('RESERVED') }}</p>
          </div>
          <div class="bg-white p-4 rounded-lg shadow border-l-4 border-gray-500">
            <p class="text-sm text-gray-500">Maintenance</p>
            <p class="text-2xl font-bold">{{ getStatusCount('MAINTENANCE') }}</p>
          </div>
        </div>
  
        <!-- Filters and Search -->
        <div class="mb-8">
          <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <!-- Search with icon -->
            <div class="relative w-full md:w-64">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text"
                v-model="searchQuery"
                placeholder="Search by ID or location..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center" @click="searchQuery = ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!--button to add a new space -->
            <button @click="showAddSpaceModal = true" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Add New Space</button>
  
            <!-- Filter options with improved styling -->
            <div class="flex flex-wrap gap-2">
              <button 
                @click="filterStatus = ''"
                :class="[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  filterStatus === '' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                ]"
              >
                All Spaces
              </button>
              <button 
                @click="filterStatus = 'AVAILABLE'"
                :class="[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  filterStatus === 'AVAILABLE' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300'
                ]"
              >
                Available
              </button>
              <button 
                @click="filterStatus = 'OCCUPIED'"
                :class="[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  filterStatus === 'OCCUPIED' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300'
                ]"
              >
                Occupied
              </button>
              <button 
                @click="filterStatus = 'RESERVED'"
                :class="[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  filterStatus === 'RESERVED' ? 'bg-yellow-600 text-white border-yellow-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-yellow-50 hover:text-yellow-700 hover:border-yellow-300'
                ]"
              >
                Reserved
              </button>
              <button 
                @click="filterStatus = 'MAINTENANCE'"
                :class="[
                  'px-4 py-2 rounded-lg border text-sm font-medium transition-colors',
                  filterStatus === 'MAINTENANCE' ? 'bg-gray-600 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-400'
                ]"
              >
                Maintenance
              </button>
            </div>
          </div>
        </div>
  
        <!-- Loading state -->
        <div v-if="loading" class="flex justify-center py-16">
          <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
  
        <!-- Parking spaces grid with simplified cards -->
        <div v-else>
          <div v-if="filteredSpaces.length === 0" class="text-center py-16 bg-gray-50 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-gray-500 text-lg">No parking spaces found matching your criteria</p>
            <button @click="resetFilters" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Reset Filters</button>
          </div>
          
          <!-- Grid of simplified parking space cards -->
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
            <div 
              v-for="space in paginatedSpaces" 
              :key="space.id"
              @click="selectSpace(space)"
              class="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer transform hover:scale-105"
              :class="{
                'bg-gradient-to-br from-green-400 to-green-600': space.status === 'AVAILABLE',
                'bg-gradient-to-br from-red-400 to-red-600': space.status === 'OCCUPIED',
                'bg-gradient-to-br from-yellow-400 to-yellow-600': space.status === 'RESERVED',
                'bg-gradient-to-br from-gray-400 to-gray-600': space.status === 'MAINTENANCE'
              }"
            >
              <div class="h-full w-full flex flex-col items-center justify-center text-white">
                <h3 class="text-3xl font-bold">{{ space.spaceNumber }}</h3>
                <p class="text-sm mt-1 opacity-80">ID:{{space.id}}</p>
                <p class="text-xs mt-1 opacity-80">{{ space.status }}</p>
              </div>
            </div>
          </div>
  
          <!-- Pagination with improved styling -->
          <div class="flex flex-col sm:flex-row justify-between items-center mt-8 bg-gray-50 p-4 rounded-lg">
            <div class="text-sm text-gray-600 mb-4 sm:mb-0">
              Showing {{ startIndex + 1 }}-{{ Math.min(endIndex, filteredSpaces.length) }} of {{ filteredSpaces.length }} spaces
            </div>
            <div class="flex gap-2">
              <button 
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                First
              </button>
              <button 
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Previous
              </button>
              <div class="flex items-center px-4">
                <span class="text-sm font-medium">{{ currentPage }} / {{ totalPages }}</span>
              </div>
              <button 
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Next
              </button>
              <button 
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                Last
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Space Details Slide-in Panel -->
      <transition name="slide">
        <div v-if="selectedSpace" class="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl z-40 overflow-y-auto">
          <div class="p-6">
            <!-- Header with close button -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold">Space Details</h2>
              <button @click="selectedSpace = null" class="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Space header -->
            <div 
              class="p-5 rounded-lg text-white mb-6"
              :class="{
                'bg-gradient-to-r from-green-500 to-green-600': selectedSpace.status === 'AVAILABLE',
                'bg-gradient-to-r from-red-500 to-red-600': selectedSpace.status === 'OCCUPIED',
                'bg-gradient-to-r from-yellow-500 to-yellow-600': selectedSpace.status === 'RESERVED',
                'bg-gradient-to-r from-gray-500 to-gray-600': selectedSpace.status === 'MAINTENANCE'
              }"
            >
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="font-bold text-3xl">Space #{{ selectedSpace.spaceNumber }}</h3>
                  <p class="opacity-90">{{ selectedSpace.floor ? 'Floor ' + selectedSpace.floor : 'No location specified' }}</p>
                </div>
                <div>
                  <span 
                    class="px-3 py-1 text-sm font-semibold rounded-full bg-white"
                    :class="{
                      'text-green-700': selectedSpace.status === 'AVAILABLE',
                      'text-red-700': selectedSpace.status === 'OCCUPIED',
                      'text-yellow-700': selectedSpace.status === 'RESERVED',
                      'text-gray-700': selectedSpace.status === 'MAINTENANCE'
                    }"
                  >
                    {{ selectedSpace.status }}
                  </span>
                </div>
              </div>
            </div>
            
            <!-- Space details form -->
            <div class="space-y-6">
              <!-- Status change dropdown -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
                <select 
                  v-model="selectedSpace.newStatus" 
                  class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  :class="{
                    'border-green-300 bg-green-50': selectedSpace.newStatus === 'AVAILABLE',
                    'border-red-300 bg-red-50': selectedSpace.newStatus === 'OCCUPIED',
                    'border-yellow-300 bg-yellow-50': selectedSpace.newStatus === 'RESERVED',
                    'border-gray-300 bg-gray-50': selectedSpace.newStatus === 'MAINTENANCE'
                  }"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="OCCUPIED">Occupied</option>
                  <option value="RESERVED">Reserved</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
              
           
              
              <!-- Last updated -->
              <div class="text-sm text-gray-600">
                Last updated: {{ formatDate(selectedSpace.updatedAt) }}
              </div>
              
              <!-- Action buttons -->
              <div class="flex justify-end gap-2 pt-4">
                <button 
                  @click="resetSpaceChanges(selectedSpace)" 
                  class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  @click="updateSpaceStatus(selectedSpace)" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  :disabled="selectedSpace.newStatus === selectedSpace.status && !selectedSpace.notesChanged"
                  :class="{ 'opacity-50 cursor-not-allowed': selectedSpace.newStatus === selectedSpace.status && !selectedSpace.notesChanged }"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
      
      <!-- Dark overlay when side panel is open -->
      <div 
        v-if="selectedSpace" 
        class="fixed inset-0 bg-black bg-opacity-25 z-30"
        @click="selectedSpace = null"
      ></div>
  
      <!-- Status update confirmation modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
          <div 
            class="p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"
            :class="{
              'bg-green-100 text-green-600': updatedSpace?.status === 'AVAILABLE',
              'bg-red-100 text-red-600': updatedSpace?.status === 'OCCUPIED',
              'bg-yellow-100 text-yellow-600': updatedSpace?.status === 'RESERVED',
              'bg-gray-100 text-gray-600': updatedSpace?.status === 'MAINTENANCE'
            }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-center text-gray-900 mb-2">Update Successful!</h3>
          <p class="text-gray-600 text-center mb-6">
            Parking space #{{ updatedSpace?.spaceNumber || '' }} has been updated to 
            <span 
              class="font-semibold"
              :class="{
                'text-green-600': updatedSpace?.status === 'AVAILABLE',
                'text-red-600': updatedSpace?.status === 'OCCUPIED',
                'text-yellow-600': updatedSpace?.status === 'RESERVED',
                'text-gray-600': updatedSpace?.status === 'MAINTENANCE'
              }"
            >{{ updatedSpace?.status }}</span>.
          </p>
          <div class="flex justify-center">
            <button 
              @click="closeModal"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      
      <!-- Add Space Modal -->
      <div v-if="showAddSpaceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Add New Parking Space</h2>
            <button @click="showAddSpaceModal = false" class="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="addNewSpace" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Space Number</label>
              <input
                type="number"
                v-model="newSpace.spaceNumber"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Floor</label>
              <input
                type="text"
                v-model="newSpace.floor"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Section</label>
              <input
                type="text"
                v-model="newSpace.section"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="newSpace.status"
                required
                class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="AVAILABLE">Available</option>
                <option value="OCCUPIED">Occupied</option>
                <option value="RESERVED">Reserved</option>
                <option value="MAINTENANCE">Maintenance</option>
              </select>
            </div>
            
            
            <div class="flex justify-end gap-2 pt-4">
              <button
                type="button"
                @click="showAddSpaceModal = false"
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Space
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue'
  // Import API service (commented out since we're using mock data for this example)
   import { getAllSpaces, updateSpace , createSpace } from '../../../services/parkingSpace'
  
  // Mock data for demonstration
  const mockParkingSpots = [
    { id: 1, spaceNumber: 101, floor: '1', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-01T13:45:00Z' },
    { id: 2, spaceNumber: 102, floor: '1', status: 'OCCUPIED', notes: 'Reserved for Executive Team', updatedAt: '2025-05-01T10:30:00Z' },
    { id: 3, spaceNumber: 103, floor: '1', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-01T09:15:00Z' },
    { id: 4, spaceNumber: 104, floor: '1', status: 'MAINTENANCE', notes: 'Repairs scheduled for next week', updatedAt: '2025-05-02T11:20:00Z' },
    { id: 5, spaceNumber: 105, floor: '1', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-01T14:30:00Z' },
    { id: 6, spaceNumber: 201, floor: '2', status: 'RESERVED', notes: 'For visitor from HQ', updatedAt: '2025-05-03T08:45:00Z' },
    { id: 7, spaceNumber: 202, floor: '2', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-01T15:20:00Z' },
    { id: 8, spaceNumber: 203, floor: '2', status: 'OCCUPIED', notes: '', updatedAt: '2025-05-02T09:10:00Z' },
    { id: 9, spaceNumber: 204, floor: '2', status: 'OCCUPIED', notes: '', updatedAt: '2025-05-01T07:55:00Z' },
    { id: 10, spaceNumber: 205, floor: '2', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-02T16:40:00Z' },
    { id: 11, spaceNumber: 301, floor: '3', status: 'MAINTENANCE', notes: 'Paint refresh in progress', updatedAt: '2025-05-03T13:15:00Z' },
    { id: 12, spaceNumber: 302, floor: '3', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-02T11:30:00Z' },
    { id: 13, spaceNumber: 303, floor: '3', status: 'AVAILABLE', notes: '', updatedAt: '2025-05-03T10:25:00Z' },
    { id: 14, spaceNumber: 304, floor: '3', status: 'RESERVED', notes: 'For CEO visit on Friday', updatedAt: '2025-05-01T09:50:00Z' },
    { id: 15, spaceNumber: 305, floor: '3', status: 'OCCUPIED', notes: '', updatedAt: '2025-05-02T08:35:00Z' },
  ];
  
  // State
  const parkingSpots = ref([])
  const loading = ref(true)
  const searchQuery = ref('')
  const filterStatus = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(12)
  const showModal = ref(false)
  const updatedSpace = ref(null)
  const selectedSpace = ref(null)
  const showAddSpaceModal = ref(false)
  const newSpace = ref({
    spaceNumber: '',
    floor: '',
    section: '',
    status: 'AVAILABLE'
  })
  
  // Select a space to view/edit details
  const selectSpace = (space) => {
    selectedSpace.value = {
      ...space,
      newStatus: space.status
    }
  }
  
  // Fetch data from the API (using mock data for demonstration)
  const fetchParkingSpots = async () => {
    loading.value = true
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      
      const response = await getAllSpaces()
      parkingSpots.value = response.data;
      console.log('Fetched parking spots:', parkingSpots.value)
    } catch (error) {
      console.error('Error fetching parking spots:', error)
    } finally {
      loading.value = false
    }
  }
  
  // Add new space
  const addNewSpace = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real application, you would call your API
    const response = await createSpace({
        ...newSpace.value,
        floor: Number(newSpace.value.floor),
    })
    const createdSpace = response.data ;
      
      // Add to list
      parkingSpots.value.push(createdSpace)
      
      // Reset form and close modal
      newSpace.value = {
        spaceNumber: '',
        floor:'',
        status: 'AVAILABLE',
        notes: ''
      }
      showAddSpaceModal.value = false
      fetchParkingSpots() // Refresh the list after adding a new space
    } catch (error) {
        console.error('Error adding new space:', error)
        }
    }
    // Script setup continues from template code...

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Watch for changes in notes to track if they've been modified
watch(
  () => selectedSpace.value?.notes,
  (newValue, oldValue) => {
    if (selectedSpace.value && newValue !== undefined) {
      selectedSpace.value.notesChanged = newValue !== selectedSpace.value.originalNotes
    }
  }
)

// Filter spaces based on status and search query
const filteredSpaces = computed(() => {
  let filtered = parkingSpots.value
  
  // Apply status filter
  if (filterStatus.value) {
    filtered = filtered.filter(space => space.status === filterStatus.value)
  }
  
  // Apply search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    filtered = filtered.filter(space => 
      space.spaceNumber.toString().includes(query) ||
      (space.floor && space.floor.toLowerCase().includes(query))
    )
  }
  
  return filtered
})

// Get count of spaces by status
const getStatusCount = (status) => {
  return parkingSpots.value.filter(space => space.status === status).length
}

// Pagination logic
const totalPages = computed(() => {
  return Math.ceil(filteredSpaces.value.length / itemsPerPage.value)
})

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value
})

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value
})

const paginatedSpaces = computed(() => {
  return filteredSpaces.value.slice(startIndex.value, endIndex.value)
})

// Reset filters
const resetFilters = () => {
  searchQuery.value = ''
  filterStatus.value = ''
  currentPage.value = 1
}

// Handle space status update
const updateSpaceStatus = async (space) => {
  try {

    await updateSpace(space.id, space.newStatus)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Update local space data
    const spaceIndex = parkingSpots.value.findIndex(s => s.id === space.id)
    if (spaceIndex !== -1) {
      parkingSpots.value[spaceIndex].status = space.newStatus
      parkingSpots.value[spaceIndex].notes = space.notes
      parkingSpots.value[spaceIndex].originalNotes = space.notes
      parkingSpots.value[spaceIndex].notesChanged = false
      parkingSpots.value[spaceIndex].updatedAt = new Date().toISOString()
    }
    
    // Set updated space for modal and show confirmation
    updatedSpace.value = {
      ...parkingSpots.value[spaceIndex]
    }
    showModal.value = true
    
    // Close the details panel
    selectedSpace.value = null
    
  } catch (error) {
    console.error('Error updating space:', error)
    // Here you could add error handling, like showing an error message
  }
}

// Reset changes made to a space
const resetSpaceChanges = (space) => {
  const originalSpace = parkingSpots.value.find(s => s.id === space.id)
  if (originalSpace) {
    space.newStatus = originalSpace.status
    space.notes = originalSpace.notes
    space.notesChanged = false
  }
}

// Close the confirmation modal
const closeModal = () => {
  showModal.value = false
  updatedSpace.value = null
}

// Fetch data on component mount
onMounted(() => {
  fetchParkingSpots()
})

// Watch for filter changes to reset pagination
watch([filterStatus, searchQuery], () => {
  currentPage.value = 1
})
    </script>   