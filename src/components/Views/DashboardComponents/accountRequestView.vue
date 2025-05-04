<template>
    <div class="flex bg-gray-50 min-h-screen">
      <Sidebar />
      
      <div class="flex-1 p-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <!-- Header with stats -->
          <div class="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Manage Account Requests</h2>
            
            <div class="flex flex-wrap gap-4 mt-4 md:mt-0">
              <div class="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <span class="text-blue-600 font-medium">{{ getCountByStatus('all') }}</span>
                </div>
                <span class="text-gray-700">Total</span>
              </div>
              
              <div class="flex items-center bg-yellow-50 px-4 py-2 rounded-lg">
                <div class="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                  <span class="text-yellow-600 font-medium">{{ getCountByStatus('PENDING') }}</span>
                </div>
                <span class="text-gray-700">Pending</span>
              </div>
              
              <div class="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <span class="text-green-600 font-medium">{{ getCountByStatus('APPROVED') }}</span>
                </div>
                <span class="text-gray-700">Approved</span>
              </div>
              
              <div class="flex items-center bg-red-50 px-4 py-2 rounded-lg">
                <div class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-2">
                  <span class="text-red-600 font-medium">{{ getCountByStatus('REJECTED') }}</span>
                </div>
                <span class="text-gray-700">Rejected</span>
              </div>
            </div>
          </div>
          
          <!-- Search and filters -->
          <div class="flex flex-col md:flex-row gap-4 mb-6">
            <div class="flex-1">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search by name, email, or ID..." 
                  class="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="flex gap-4">
              <select 
                v-model="statusFilter" 
                class="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
              
              <button 
                @click="fetchRequests" 
                class="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
          
          <!-- Loading state -->
          <div v-if="loading" class="py-20 flex justify-center items-center">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
          
          <!-- Empty state -->
          <div v-else-if="filteredRequests.length === 0" class="py-20 text-center">
            <div class="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p class="text-gray-600 text-lg">No account requests found.</p>
            <p v-if="searchQuery || statusFilter !== 'all'" class="text-gray-500 mt-2">
              Try changing your search or filter criteria.
            </p>
          </div>
          
          <!-- Requests table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead class="bg-gray-100 text-gray-700 text-left">
                <tr>
                  <th class="py-3 px-4 font-semibold">ID</th>
                  <th class="py-3 px-4 font-semibold">Name</th>
                  <th class="py-3 px-4 font-semibold">Email</th>
                  <th class="py-3 px-4 font-semibold">Phone</th>
                  <th class="py-3 px-4 font-semibold">Message</th>
                  <th class="py-3 px-4 font-semibold">Status</th>
                  <th class="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="request in filteredRequests" 
                  :key="request.id" 
                  class="border-t hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4 font-medium">{{ request.id }}</td>
                  <td class="py-3 px-4">{{ request.name }}</td>
                  <td class="py-3 px-4">
                    <a :href="`mailto:${request.email}`" class="text-blue-600 hover:underline">
                      {{ request.email }}
                    </a>
                  </td>
                  <td class="py-3 px-4">{{ request.phone }}</td>
                  <td class="py-3 px-4">
                    <span v-if="request.message.length > 50">
                      {{ request.message.substring(0, 50) }}...
                      <button 
                        @click="viewMessage(request)"
                        class="text-blue-600 hover:underline ml-1"
                      >
                        View
                      </button>
                    </span>
                    <span v-else>{{ request.message }}</span>
                  </td>
                  <td class="py-3 px-4">
                    <span
                      class="inline-flex px-2 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-yellow-100 text-yellow-800': request.status === 'PENDING',
                        'bg-green-100 text-green-800': request.status === 'APPROVED',
                        'bg-red-100 text-red-800': request.status === 'REJECTED'
                      }"
                    >
                      {{ request.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">
                    <div class="flex gap-2">
                      <button
                        v-if="request.status === 'PENDING'"
                        @click="updateStatus(request.id, 'APPROVED')"
                        class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Approve
                      </button>
                      <button
                        v-if="request.status === 'PENDING'"
                        @click="updateStatus(request.id, 'REJECTED')"
                        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reject
                      </button>
                      <button
                        v-if="request.status !== 'PENDING'"
                        @click="resetStatus(request.id)"
                        class="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                      >
                        Reset
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- Pagination if needed -->
          <div v-if="filteredRequests.length > 0" class="flex justify-between items-center mt-6">
            <p class="text-sm text-gray-600">
              Showing {{ filteredRequests.length }} of {{ requests.length }} requests
            </p>
            
            <!-- Add pagination controls here if implementing pagination -->
          </div>
        </div>
      </div>
      
      <!-- Message Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
          <div class="border-b px-6 py-4 flex justify-between items-center">
            <h3 class="text-lg font-medium">Message Details</h3>
            <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div class="px-6 py-4">
            <div class="mb-4">
              <p class="text-sm text-gray-500">From</p>
              <p class="font-medium">{{ selectedRequest?.name }}</p>
            </div>
            <div class="mb-4">
              <p class="text-sm text-gray-500">Email</p>
              <p class="font-medium">{{ selectedRequest?.email }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">Message</p>
              <p class="mt-1 whitespace-pre-wrap">{{ selectedRequest?.message }}</p>
            </div>
          </div>
          <div class="bg-gray-50 px-6 py-4 flex justify-end">
            <button @click="showModal = false" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { getAllAccountRequests,updateAccountRequest } from '../../../services/accountRequests'
  import Sidebar from '../sidebar.vue'
  
  const requests = ref([])
  const loading = ref(true)
  const searchQuery = ref('')
  const statusFilter = ref('all')
  const showModal = ref(false)
  const selectedRequest = ref(null)
  const adminId = ref(null) // Replace with actual admin ID from your authentication context or store
  const fetchRequests = async () => {
    loading.value = true
    try {

      const response = await getAllAccountRequests()
      requests.value = response.data
    } catch (error) {
      console.error('Error fetching account requests:', error)
      
    } finally {
      loading.value = false
    }
  }
  
  // Update request status
  const updateStatus = async (id: number, status: string) => {
    try {
      const userId = localStorage.getItem('id')?.toString()
      console.log('User ID:', userId)
      loading.value = true
      await updateAccountRequest(id, { status,reviewedBy: userId })
      // Optimistic UI update
      const index = requests.value.findIndex(req => req.id === id)
      if (index !== -1) {
        requests.value[index].status = status
      }
      
      // Show success notification
      showNotification(`Request ${status} successfully`)
    } catch (error) {
      console.error('Error updating account request:', error)
      // Show error notification
    } finally {
      loading.value = false
    }
  }
  const resetStatus = async (id: number) => {
    await updateStatus(id, 'PENDING')
  }
  
  const showNotification = (message: string) => {
    console.log(message)
  }
  const viewMessage = (request) => {
    selectedRequest.value = request
    showModal.value = true
  }
  const getCountByStatus = (status: string) => {
    if (status === 'all') {
      return requests.value.length
    }
    return requests.value.filter(req => req.status === status).length
  }
  
  const filteredRequests = computed(() => {
    return requests.value.filter(request => {
      if (statusFilter.value !== 'all' && request.status !== statusFilter.value) {
        return false
      }
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        return (
          request.id.toString().includes(query) ||
          request.name.toLowerCase().includes(query) ||
          request.email.toLowerCase().includes(query) ||
          request.message.toLowerCase().includes(query)
        )
      }
      
      return true
    })
  })
  
  onMounted(fetchRequests)
  </script>
  
  <style scoped>
  /* Optional: smooth hover transition */
  button {
    transition: all 0.2s ease;
  }
  
  /* Table responsive styles */
  @media (max-width: 768px) {
    table {
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }
  }
  </style>