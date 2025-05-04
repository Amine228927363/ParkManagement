<template>
    <div class="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div class="flex-1 p-6 overflow-hidden">
        <div class="max-w-7xl mx-auto">
          <!-- Header section -->
          <div class="flex justify-between items-center mb-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-800">Manage Arrivals</h1>
              <p class="text-gray-500 mt-1">Track and manage all incoming vehicles</p>
            </div>
            <div class="flex space-x-3">
              <div class="relative">
                <input 
                  v-model="searchQuery" 
                  type="text" 
                  placeholder="Search arrivals..." 
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
             
            </div>
          </div>

          <!-- Table section -->
          <div class="bg-white rounded-lg shadow overflow-hidden">
            <div v-if="loading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span class="ml-3 text-gray-500">Loading arrivals...</span>
            </div>
            
            <div v-else-if="filteredArrivals.length === 0" class="flex flex-col items-center justify-center py-16 px-4 text-center">
              <div class="rounded-full bg-gray-100 p-6 mb-4">
                <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-medium text-gray-900">No arrivals found</h3>
              <p class="text-gray-500 mt-1">Try adjusting your search criteria</p>
              <button 
                @click="searchQuery = ''" 
                class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Clear Search
              </button>
            </div>
            
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plate</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parking</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SOS_USER</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr 
                    v-for="arrival in filteredArrivals" 
                    :key="arrival.id" 
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ arrival.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                          {{ arrival.supplierName.charAt(0) }}
                        </div>
                        <div class="ml-3">
                          <div class="font-medium text-gray-900">{{ arrival.supplierName }}</div>
                          <div class="text-xs text-gray-500">{{ arrival.companyName }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        {{ arrival.vehiclePlate }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center">
                        <span 
                          class="w-3 h-3 rounded-full mr-2"
                          :class="getVehicleTypeClass(arrival.vehicleType)"
                        ></span>
                        {{ arrival.vehicleType }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center">
                        <span 
                          class="w-3 h-3 rounded-full mr-2"
                          :style="{ backgroundColor: arrival.vehicleColor.toLowerCase() }"
                        ></span>
                        {{ arrival.vehicleColor }}
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span class="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {{ arrival.parkingSpace }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                          </svg>
                        </div>
                        <span class="ml-2">{{ arrival.sosUser?.name || 'N/A' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                      <div class="flex justify-end space-x-2">
                        <button
                          @click="viewArrival(arrival)"
                          class="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition"
                        >
                          View
                        </button>
                        <button
                          @click="confirmDelete(arrival)"
                          class="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
      <!-- View Arrival Modal -->
      <div v-if="selectedArrival" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-800">Arrival Details</h2>
              <button @click="selectedArrival = null" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <div class="flex justify-between">
                <span class="text-sm text-blue-800 font-semibold">ID</span>
                <span class="text-sm text-gray-800">{{ selectedArrival.id }}</span>
              </div>
            </div>
            
            <div class="mb-4">
              <h3 class="text-md font-medium text-gray-800 mb-2">Company Information</h3>
              <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Supplier</span>
                  <span class="text-sm font-medium">{{ selectedArrival.supplierName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Company</span>
                  <span class="text-sm font-medium">{{ selectedArrival.companyName }}</span>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <h3 class="text-md font-medium text-gray-800 mb-2">Vehicle Information</h3>
              <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Plate</span>
                  <span class="text-sm font-medium">{{ selectedArrival.vehiclePlate }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Type</span>
                  <span class="text-sm font-medium">{{ selectedArrival.vehicleType }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-600">Color</span>
                  <div class="flex items-center">
                    <span 
                      class="w-4 h-4 rounded-full mr-2"
                      :style="{ backgroundColor: selectedArrival.vehicleColor.toLowerCase() }"
                    ></span>
                    <span class="text-sm font-medium">{{ selectedArrival.vehicleColor }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <h3 class="text-md font-medium text-gray-800 mb-2">Parking Information</h3>
              <div class="bg-gray-50 p-4 rounded-lg space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Parking Space</span>
                  <span class="text-sm font-medium">{{ selectedArrival.parkingSpace }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Requested By</span>
                  <span class="text-sm font-medium">{{ selectedArrival.sosUser?.name || 'N/A' }}</span>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6">
              <button 
                @click="selectedArrival = null"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div class="p-6">
            <div class="flex items-center mb-4">
              <div class="bg-red-100 rounded-full p-3 mr-4">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-gray-800">Confirm Deletion</h2>
            </div>
            
            <p class="text-gray-600 mb-6">
              Are you sure you want to delete this arrival? This action cannot be undone.
            </p>
            
            <div class="bg-gray-50 p-4 rounded-lg mb-6">
              <div class="flex justify-between mb-2">
                <span class="text-sm text-gray-600">ID</span>
                <span class="text-sm font-medium">{{ arrivalToDelete?.id }}</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-sm text-gray-600">Supplier</span>
                <span class="text-sm font-medium">{{ arrivalToDelete?.supplierName }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Vehicle Plate</span>
                <span class="text-sm font-medium">{{ arrivalToDelete?.vehiclePlate }}</span>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3">
              <button 
                @click="cancelDelete"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="deleteArrival()"
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { getAllArrivals, deleteArrivalById } from '../../../services/arrival';
  import Sidebar from '../sidebar.vue';
  
  // State
  const arrivals = ref<any[]>([]);
  const loading = ref(true);
  const searchQuery = ref('');
  const selectedArrival = ref(null);
  const showDeleteModal = ref(false);
  const arrivalToDelete = ref(null);
  
  // Fetch arrivals from API
  const fetchArrivals = async () => {
    try {
      loading.value = true;
      const response = await getAllArrivals();
      arrivals.value = response.data;
    } catch (error) {
      console.error('Error fetching arrivals:', error);
    } finally {
      loading.value = false;
    }
  };
  
  // Filter arrivals based on search query
  const filteredArrivals = computed(() => {
    if (!searchQuery.value) return arrivals.value;
    
    const query = searchQuery.value.toLowerCase();
    return arrivals.value.filter((arrival) => {
      return (
        arrival.id.toString().includes(query) ||
        arrival.supplierName.toLowerCase().includes(query) ||
        arrival.companyName.toLowerCase().includes(query) ||
        arrival.vehiclePlate.toLowerCase().includes(query) ||
        arrival.vehicleType.toLowerCase().includes(query) ||
        arrival.vehicleColor.toLowerCase().includes(query) ||
        arrival.parkingSpace.toLowerCase().includes(query) ||
        (arrival.sosUser?.name && arrival.sosUser.name.toLowerCase().includes(query))
      );
    });
  });
  
  // Vehicle type styling
  const getVehicleTypeClass = (type: string) => {
    const typeMap: Record<string, string> = {
      'Car': 'bg-green-500',
      'Truck': 'bg-blue-500',
      'Van': 'bg-purple-500',
      'Motorcycle': 'bg-yellow-500'
    };
    return typeMap[type] || 'bg-gray-500';
  };
  
  // View arrival details
  const viewArrival = (arrival: any) => {
    selectedArrival.value = arrival;
  };
  
  // Delete confirmation
  const confirmDelete = (arrival: any) => {
    arrivalToDelete.value = arrival;
    showDeleteModal.value = true;
  };
  
  const cancelDelete = () => {
    arrivalToDelete.value = null;
    showDeleteModal.value = false;
  };
  
  // Delete arrival
  const deleteArrival = async () => {
    if (!arrivalToDelete.value) return;
    
    try {
      await deleteArrivalById(arrivalToDelete.value.id);
      arrivals.value = arrivals.value.filter(
        (item) => item.id !== arrivalToDelete.value.id
      );
      showDeleteModal.value = false;
      arrivalToDelete.value = null;
    } catch (error) {
      console.error('Error deleting arrival:', error);
    }
  };
  
  // Add new arrival placeholder
  const addNewArrival = () => {
    alert('Add new arrival functionality would go here');
  };
  
  onMounted(() => {
    fetchArrivals();
  });
  </script>
  
  <style scoped>
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 8px;
  }
  </style>