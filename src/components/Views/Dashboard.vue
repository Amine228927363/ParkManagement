// App.vue
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <!-- Sidebar -->
<div 
  class="fixed inset-y-0 left-0 w-64 bg-gray-800 text-white shadow-lg flex flex-col justify-between"
>
  <!-- Top Section -->
  <div>
    <!-- User Info / Logo -->
    <div class="p-4 font-bold text-xl flex items-center justify-between">
      Parking Admin
    </div>

    <!-- Navigation -->
    <nav class="mt-4">
      <button 
        v-for="(tab, index) in tabs" 
        :key="index"
        @click="activeTab = tab.id"
        :class="[
          'w-full text-left p-4 hover:bg-gray-700 transition flex items-center gap-2',
          activeTab === tab.id ? 'bg-gray-700 border-l-4 border-blue-500' : ''
        ]"
      >
        <span v-if="tab.icon">
          <component :is="tab.icon" class="w-5 h-5" />
        </span>
        <span>{{ tab.name }}</span>
      </button>
    </nav>
  </div>

  <!-- Bottom Section (Logout or Settings) -->
  <div class="p-4 border-t border-gray-700">
    <button 
      class="w-full text-left p-2 hover:bg-gray-700 rounded flex items-center gap-2"
      @click="logout"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
      </svg>
      Logout
    </button>
  </div>
</div>


    <!-- Main Content -->
    <div class="ml-64 p-6">
      <header class="bg-white shadow-sm rounded-lg p-4 mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-800">{{ currentTab.name }}</h1>
        <div class="flex gap-4">
          <button @click="refreshData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Refresh Data
          </button>
          <button class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Settings
          </button>
        </div>
      </header>

      <!-- Dashboard Content -->
      <div class="bg-white shadow-sm rounded-lg p-6">
        <!-- Parking Spaces -->
        <div v-if="activeTab === 'spaces'">
          <div class="mb-4 flex justify-between items-center">
            <div>
              <span class="mr-4 font-semibold">
                Available: <span class="text-green-500">{{ availableSpaces }}</span>
              </span>
              <span class="font-semibold">
                Occupied: <span class="text-red-500">{{ totalSpaces - availableSpaces }}</span>
              </span>
            </div>
            <div class="flex gap-2">
              <input 
                v-model="spaceSearch" 
                placeholder="Search space or user..." 
                class="border p-2 rounded" 
              />
              <select v-model="spaceFilter" class="border p-2 rounded">
                <option value="all">All Spaces</option>
                <option value="available">Available Only</option>
                <option value="occupied">Occupied Only</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-5 gap-4">
            <div 
              v-for="space in filteredSpaces" 
              :key="space.id" 
              :class="['p-4 rounded-lg shadow-sm border cursor-pointer', 
                      space.status === 'available' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300']"
              @click="showSpaceDetails(space)"
            >
              <div class="font-bold">Space #{{ space.id }}</div>
              <div class="text-sm">{{ space.status === 'available' ? 'Available' : 'Occupied' }}</div>
              <div v-if="space.status === 'occupied'" class="text-sm mt-1">
                <div>User: {{ space.user }}</div>
                <div>Since: {{ space.since }}</div>
              </div>
            </div>
          </div>

          <!-- Space Details Modal -->
          
        </div>

      

        <!-- Requests -->
        <div v-if="activeTab === 'requests'">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-xl font-semibold">User Requests</h2>
            <div class="flex gap-2">
              <input 
                v-model="requestSearch" 
                placeholder="Search user or type..." 
                class="border p-2 rounded" 
              />
              <select v-model="requestFilter" class="border p-2 rounded">
                <option value="all">All Requests</option>
                <option value="pending">Pending Only</option>
                <option value="approved">Approved Only</option>
                <option value="rejected">Rejected Only</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full bg-white">
              <thead>
                <tr class="bg-gray-100 text-gray-600 text-left">
                  <th class="py-3 px-4 font-semibold">ID</th>
                  <th class="py-3 px-4 font-semibold">User</th>
                  <th class="py-3 px-4 font-semibold">Type</th>
                  <th class="py-3 px-4 font-semibold">Status</th>
                  <th class="py-3 px-4 font-semibold">Created</th>
                  <th class="py-3 px-4 font-semibold">Details</th>
                  <th class="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="request in filteredRequests" :key="request.id" class="border-t">
                  <td class="py-3 px-4">{{ request.id }}</td>
                  <td class="py-3 px-4">{{ request.user }}</td>
                  <td class="py-3 px-4 capitalize">{{ request.type }}</td>
                  <td class="py-3 px-4">
                    <span 
                      :class="{
                        'text-orange-500': request.status === 'pending',
                        'text-green-500': request.status === 'approved',
                        'text-red-500': request.status === 'rejected'
                      }"
                    >
                      {{ request.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4">{{ request.createdAt }}</td>
                  <td class="py-3 px-4">
                    <button 
                      @click="showRequestDetails(request)"
                      class="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                  <td class="py-3 px-4 flex gap-2">
                    <button 
                      v-if="request.status === 'pending'"
                      @click="updateRequestStatus(request.id, 'approved')"
                      class="text-green-500 hover:text-green-700"
                    >
                      Approve
                    </button>
                    <button 
                      v-if="request.status === 'pending'"
                      @click="updateRequestStatus(request.id, 'rejected')"
                      class="text-red-500 hover:text-red-700 ml-2"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Request Details Modal -->
          <div v-if="selectedRequest" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div class="bg-white rounded-lg p-6 shadow-lg max-w-lg w-full">
              <div class="flex justify-between mb-4">
                <h3 class="text-xl font-bold">Request #{{ selectedRequest.id }}</h3>
                <button @click="selectedRequest = null" class="text-gray-500 hover:text-gray-700">&times;</button>
              </div>
              <div class="mb-4">
                <div class="mb-2"><span class="font-semibold">User:</span> {{ selectedRequest.user }}</div>
                <div class="mb-2"><span class="font-semibold">Type:</span> {{ selectedRequest.type }}</div>
                <div class="mb-2"><span class="font-semibold">Status:</span> {{ selectedRequest.status }}</div>
                <div class="mb-2"><span class="font-semibold">Created:</span> {{ formatTime(selectedRequest.createdAt) }}</div>
                <div class="mb-2">
                  <span class="font-semibold">Details:</span>
                  <p class="mt-1">{{ selectedRequest.details }}</p>
                </div>
              </div>
              <div class="flex justify-end gap-2">
                <button 
                  v-if="selectedRequest.status === 'pending'"
                  @click="updateRequestStatus(selectedRequest.id, 'approved'); selectedRequest = null" 
                  class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Approve
                </button>
                <button 
                  v-if="selectedRequest.status === 'pending'"
                  @click="updateRequestStatus(selectedRequest.id, 'rejected'); selectedRequest = null" 
                  class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
                <button @click="selectedRequest = null" class="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Users -->
      

        <!-- Dashboard Home -->
        <div v-if="activeTab === 'dashboard'">
          <div class="grid grid-cols-4 gap-6 mb-6">
            <!-- Summary Cards -->
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div class="text-sm text-gray-500 mb-1">Total Spaces</div>
              <div class="text-2xl font-bold">{{ totalSpaces }}</div>
              <div class="mt-2 text-sm">
                <span class="text-green-500">{{ availableSpaces }} available</span> / 
                <span class="text-red-500">{{ totalSpaces - availableSpaces }} occupied</span>
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div class="text-sm text-gray-500 mb-1">Registered Users</div>
              <div class="text-2xl font-bold">{{ users.length }}</div>
              <div class="mt-2 text-sm">
                <span class="text-green-500">{{ users.filter(u => u.status === 'active').length }} active</span>
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div class="text-sm text-gray-500 mb-1">Pending Requests</div>
              <div class="text-2xl font-bold">{{ requests.filter(r => r.status === 'pending').length }}</div>
              <div class="mt-2 text-sm text-blue-500 cursor-pointer" @click="activeTab = 'requests'">
                View all requests
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div class="text-sm text-gray-500 mb-1">Today's Activity</div>
              <div class="text-2xl font-bold">{{  }}</div>
              <div class="mt-2 text-sm text-blue-500 cursor-pointer" @click="activeTab = 'history'">
                View history
              </div>
            </div>
          </div>

          <!-- Recent Activity and Spaces Overview -->
          <div class="grid grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 class="font-bold mb-4">Recent Activity</h3>
              <div class="max-h-64 overflow-y-auto">
                <div v-for="activity in recentActivities" :key="activity.id" class="mb-3 pb-3 border-b">
                  <div class="flex justify-between">
                    <div class="font-semibold">{{ activity.type }}</div>
                    <div class="text-sm text-gray-500">{{ activity.time }}</div>
                  </div>
                  <div class="text-sm">{{ activity.description }}</div>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 class="font-bold mb-4">Spaces Overview</h3>
              <div class="grid grid-cols-8 gap-2">
                <div 
                  v-for="space in parkingSpaces.slice(0, 24)" 
                  :key="space.id" 
                  :class="['h-8 w-full rounded flex items-center justify-center text-xs font-bold cursor-pointer',
                          space.status === 'available' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800']"
                  @click="showSpaceDetails(space)"
                >
                  {{ space.id }}
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
import { ref, computed, onMounted } from 'vue'

// Tabs and navigation
const activeTab = ref('dashboard')
const tabs = [
  { id: 'dashboard', name: 'Dashboard' },
  { id: 'spaces', name: 'Parking Spaces' },
  { id: 'history', name: 'History' },
  { id: 'requests', name: 'User Requests' },
  { id: 'users', name: 'Registered Users' },
]

// State
const parkingSpaces = ref([
  { id: 1, number: "A1", status: "occupied", vehicle: "ABC-123", since: "10:30 AM" },
  { id: 2, number: "B2", status: "available" },
  { id: 3, number: "C3", status: "available" },
  { id: 4, number: "D4", status: "available" },
  { id: 5, number: "E5", status: "available" },
  { id: 2, number: "A2", status: "available" },
  { id: 3, number: "B1", status: "reserved", reservedBy: "user_01" },
])
const history = ref([
  { id: 1, user: "John Doe", action: "Parked at A1", timestamp: "2025-04-08 10:30" },
  { id: 2, user: "Sarah Lee", action: "Left from B2", timestamp: "2025-04-08 09:50" },
])
const requests = ref([
  { id: 1, user: "admin", type: "Maintenance", message: "Broken sensor in Zone C", status: "pending" },
  { id: 2, user: "guard_01", type: "Assistance", message: "Vehicle blocked in B4", status: "resolved" },
])
const users = ref([
  { id: 1, name: "John Doe", role: "Visitor", lastLogin: "2025-04-08 09:00" },
  { id: 2, name: "Admin User", role: "Admin", lastLogin: "2025-04-08 08:45" },
  { id: 3, name: "Security Guard", role: "Staff", lastLogin: "2025-04-07 16:30" },
])
const recentActivities = ref([])

// UI state
const selectedSpace = ref(null)
const selectedRequest = ref(null)
const selectedUser = ref(null)

// Filters
const spaceSearch = ref('')
const spaceFilter = ref('all')
const historySearch = ref('')
const historyFilter = ref('all')
const requestSearch = ref('')
const requestFilter = ref('all')
const userSearch = ref('')
const userFilter = ref('all')

// Computed properties
const currentTab = computed(() =>
  tabs.find(tab => tab.id === activeTab.value)
)

const totalSpaces = computed(() => parkingSpaces.value.length)

const availableSpaces = computed(() =>
  parkingSpaces.value.filter(space => space.status === 'available').length
)

const filteredSpaces = computed(() => {
  let spaces = [...parkingSpaces.value]
  if (spaceFilter.value !== 'all') {
    spaces = spaces.filter(space => space.status === spaceFilter.value)
  }
  if (spaceSearch.value) {
    const search = spaceSearch.value.toLowerCase()
    spaces = spaces.filter(space =>
      space.id.toString().includes(search) ||
      (space.user && space.user.toLowerCase().includes(search))
    )
  }
  return spaces
})

const filteredHistory = computed(() => {
  let records = [...history.value]
  if (historyFilter.value === 'active') {
    records = records.filter(record => !record.exitTime)
  } else if (historyFilter.value === 'completed') {
    records = records.filter(record => record.exitTime)
  }
  if (historySearch.value) {
    const search = historySearch.value.toLowerCase()
    records = records.filter(record =>
      record.user.toLowerCase().includes(search) ||
      record.spaceId?.toString().includes(search)
    )
  }
  return records.sort((a, b) => new Date(b.entryTime) - new Date(a.entryTime))
})

const filteredRequests = computed(() => {
  let filtered = [...requests.value]
  if (requestFilter.value !== 'all') {
    filtered = filtered.filter(req => req.status === requestFilter.value)
  }
  if (requestSearch.value) {
    const search = requestSearch.value.toLowerCase()
    filtered = filtered.filter(req =>
      req.user.toLowerCase().includes(search) ||
      req.type.toLowerCase().includes(search)
    )
  }
  return filtered
})

const filteredUsers = computed(() => {
  let filtered = [...users.value]
  if (userFilter.value !== 'all') {
    filtered = filtered.filter(user => user.status === userFilter.value)
  }
  if (userSearch.value) {
    const search = userSearch.value.toLowerCase()
    filtered = filtered.filter(user =>
      user.name.toLowerCase().includes(search) ||
      user.email?.toLowerCase().includes(search) ||
      user.vehicle?.toLowerCase().includes(search)
    )
  }
  return filtered.sort((a, b) => a.name.localeCompare(b.name))
})

// Methods
function showSpaceDetails(space) {
  selectedSpace.value = space
}

function reserveSpace(id) {
  const space = parkingSpaces.value.find(s => s.id === id)
  if (space && space.status === 'available') {
    space.status = 'occupied'
    space.user = 'Current User'
    space.since = new Date().toISOString()
    selectedSpace.value = space
  }
}

function releaseSpace(id) {
  const space = parkingSpaces.value.find(s => s.id === id)
  if (space && space.status === 'occupied') {
    space.status = 'available'
    space.user = null
    space.since = null
    selectedSpace.value = space
  }
}

function getOccupiedDuration(since) {
  const startTime = new Date(since)
  const now = new Date()
  const diffMs = now - startTime
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  return `${hours}h ${minutes}m`
}

function showRequestDetails(request) {
  selectedRequest.value = request
}

function showUserDetails(user) {
  selectedUser.value = user
}

function refreshData() {
  loadMockData()
  recentActivities.value.unshift({
    id: Date.now(),
    type: 'System',
    description: 'Dashboard data refreshed',
    time: new Date().toISOString()
  })
}

function loadMockData() {
  parkingSpaces.value = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    status: Math.random() > 0.5 ? 'available' : 'occupied',
    user: Math.random() > 0.5 ? `User ${Math.floor(Math.random() * 10)}` : null,
    since: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString() : null
  }))

  history.value = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    spaceId: Math.floor(Math.random() * 50) + 1,
    user: `User ${Math.floor(Math.random() * 10)}`,
    entryTime: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    exitTime: Math.random() > 0.5 ? new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString() : null,
    paymentStatus: Math.random() > 0.5 ? 'paid' : 'pending'
  }))
}


</script>