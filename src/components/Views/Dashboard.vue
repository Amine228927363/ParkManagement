// App.vue
<template>
  <div class="flex min-h-screen bg-gray-100">
       <Sidebar :activeTab="activeTab" @setActive="setActive" />
    <!-- Main Content -->
    <div class="p-3 flex-1">
      <!-- Dashboard Content -->
      <div class="bg-white shadow-sm rounded-lg p-6">
        <Satistic :totalSpaces="totalSpaces" :availableSpaces="availableSpaces" @refresh="refreshData" />
        <spaceManagement :spaces="filteredSpaces" @showDetails="showSpaceDetails" @reserveSpace="reserveSpace" @releaseSpace="releaseSpace" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './sidebar.vue'
import Satistic from './DashboardComponents/Satistic.vue'
import spaceManagement from './DashboardComponents/spaceManagement.vue'
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