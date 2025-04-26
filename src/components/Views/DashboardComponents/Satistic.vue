<template>
    <div class="p-6 max-w mx-auto my-10">
      <div class="bg-white rounded-xl shadow-md p-6">
        <!-- Header -->
        <header class="mb-6">
          <h1 class="text-3xl font-bold text-gray-800">Space Parking Management</h1>
          <div class="flex items-center mt-2 text-gray-600">
            <p class="text-sm">Current Date: {{ currentDate }}</p>
            <button @click="refreshData" class="ml-2 text-blue-500 hover:text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </header>
  
        <!-- Dashboard cards -->
        <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <DashboardCard label="Total Spots" :value="statistics.total" color="blue" />
          <DashboardCard label="Available" :value="statistics.available" :percent="percentAvailable" color="green" />
          <DashboardCard label="Occupied" :value="statistics.occupied" :percent="percentOccupied" color="red" />
          <DashboardCard label="Reserved" :value="statistics.reserved" :percent="percentReserved" color="yellow" />
          <DashboardCard label="Maintenance" :value="statistics.maintenance" :percent="percentMaintenance" color="gray" />
        </div>
  
        <!-- Capacity Overview -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Capacity Overview</h2>
          <div class="w-full bg-gray-200 rounded-full h-4">
            <div class="flex rounded-full h-4 overflow-hidden">
              <div :style="`width: ${percentOccupied}%`" class="bg-red-500"></div>
              <div :style="`width: ${percentReserved}%`" class="bg-yellow-500"></div>
              <div :style="`width: ${percentMaintenance}%`" class="bg-gray-500"></div>
              <div :style="`width: ${percentAvailable}%`" class="bg-green-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import DashboardCard from './DashboardCard.vue'
  
  const parkingSpots = ref([
    { id: 'A1', status: 'occupied' },
    { id: 'A2', status: 'available' },
    { id: 'A3', status: 'reserved' },
    { id: 'A4', status: 'available' },
    { id: 'B1', status: 'maintenance' },
    { id: 'B2', status: 'occupied' },
    { id: 'B3', status: 'available' },
    { id: 'B4', status: 'occupied' },
    { id: 'B5', status: 'occupied' },
    { id: 'B6', status: 'occupied' },
    { id: 'B7', status: 'occupied' },
    { id: 'B8', status: 'occupied' },
  ])
  
  const currentDate = ref(
    new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())
  )
  
  const statistics = computed(() => {
    const total = parkingSpots.value.length
    const available = parkingSpots.value.filter(s => s.status === 'available').length
    const occupied = parkingSpots.value.filter(s => s.status === 'occupied').length
    const reserved = parkingSpots.value.filter(s => s.status === 'reserved').length
    const maintenance = parkingSpots.value.filter(s => s.status === 'maintenance').length
    return { total, available, occupied, reserved, maintenance }
  })
  
  const percentAvailable = computed(() => Math.round((statistics.value.available / statistics.value.total) * 100))
  const percentOccupied = computed(() => Math.round((statistics.value.occupied / statistics.value.total) * 100))
  const percentReserved = computed(() => Math.round((statistics.value.reserved / statistics.value.total) * 100))
  const percentMaintenance = computed(() => Math.round((statistics.value.maintenance / statistics.value.total) * 100))
  
  const refreshData = () => {
    alert('Data refreshed!')
    currentDate.value = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())
  }
  </script>
  
  <style scoped>
  body {
    background-color: #f3f4f6;
  }
  </style>