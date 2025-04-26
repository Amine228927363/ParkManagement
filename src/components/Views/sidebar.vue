<template>
  <div>
    <!-- Mobile Overlay -->
    <div 
      v-if="isOpen" 
      @click="isOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden transition-opacity duration-300"
    ></div>

    <!-- Toggle Button - Only visible on mobile -->
    <button
      @click="isOpen = !isOpen"
      class="fixed z-30 top-4 left-4 p-2 rounded-md bg-gray-900 text-white shadow-lg hover:bg-gray-800 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label="Toggle menu"
    >
      <svg 
        v-if="!isOpen" 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg 
        v-else 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Sidebar -->
    <aside
      :class="[
        'fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 shadow-xl z-20 flex flex-col transition-all duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'md:relative md:block'
      ]"
    >
      <!-- Logo and Brand -->
      <div class="px-6 py-6 border-b border-gray-700/50 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <!-- Logo icon -->
          <div class="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold">Admin Panel</h1>
            <p class="text-xs text-blue-400">ParkEase System</p>
          </div>
        </div>

        <!-- Close button - Mobile only -->
        <button
          @click="isOpen = false"
          class="p-1 rounded-full hover:bg-gray-700 transition-colors md:hidden"
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- User Profile -->
      <div class="px-6 py-4 border-b border-gray-700/50">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {{ userInitials }}
          </div>
          <div>
            <p class="text-sm font-medium text-white">{{ userName }}</p>
            <p class="text-xs text-gray-400">{{ userRole }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2 mb-2">Main</p>
        <button
          v-for="item in mainMenuItems"
          :key="item.id"
          @click="navigateTo(item.id)"
          :class="[
            'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
            activeTab === item.id
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'hover:bg-gray-800/70 text-gray-300 hover:text-white'
          ]"
        >
          <component :is="item.icon" :class="['w-5 h-5', activeTab === item.id ? 'text-white' : 'text-gray-400']" />
          <span class="font-medium">{{ item.label }}</span>
        </button>

        <p class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">Configuration</p>
        <button
          v-for="item in configMenuItems"
          :key="item.id"
          @click="navigateTo(item.id)"
          :class="[
            'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3',
            activeTab === item.id
              ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
              : 'hover:bg-gray-800/70 text-gray-300 hover:text-white'
          ]"
        >
          <component :is="item.icon" :class="['w-5 h-5', activeTab === item.id ? 'text-white' : 'text-gray-400']" />
          <span class="font-medium">{{ item.label }}</span>
        </button>
      </nav>

      <!-- Footer -->
      <div class="px-4 py-4 border-t border-gray-700/50">
        <button
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium transition-all duration-300 hover:shadow-md hover:shadow-red-900/30"
        >
          <LogoutIcon class="w-5 h-5" />
          <span>Logout</span>
        </button>
        <p class="text-center text-xs text-gray-500 mt-4">ParkEase v1.2.0</p>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  HomeIcon,
  UsersIcon,
 
  Cog6ToothIcon,
  ChartBarSquareIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
  PowerIcon as LogoutIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const isOpen = ref(false) // Default closed on mobile, will be opened on desktop via CSS
const activeTab = ref('dashboard')

// User data - you can replace with data from your auth store
const userName = ref('Admin User')
const userRole = ref('System Administrator')
const userInitials = computed(() => {
  const names = userName.value.split(' ')
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`
  }
  return names[0][0] || 'A'
})

// Split menu items into categories for better organization
const mainMenuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { id: 'sosUsers', label: 'SOS Users', icon: UsersIcon, path: '/sos-users' },
  { id: 'Account Requests', label: 'Account Requests', icon:ClipboardDocumentListIcon , path: '/manageAccountRequests' },
  { id: 'reports', label: 'Reports', icon: ChartBarSquareIcon, path: '/reports' },
]

const configMenuItems = [
  { id: 'notifications', label: 'Notifications', icon: BellAlertIcon, path: '/notifications' },
  { id: 'logs', label: 'System Logs', icon: ClipboardDocumentListIcon, path: '/logs' },
  { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, path: '/settings' },
]

// Combined menu items for search functionality
const allMenuItems = [...mainMenuItems, ...configMenuItems]

// Set active based on current route on mount
onMounted(() => {
  // Get current path and set active tab based on path
  const path = window.location.pathname
  const matchingItem = allMenuItems.find(item => item.path === path)
  if (matchingItem) {
    activeTab.value = matchingItem.id
  }

  // Set initial sidebar state based on screen size
  isOpen.value = window.innerWidth >= 768 // md breakpoint
  
  // Add resize listener
  window.addEventListener('resize', handleResize)
})

const handleResize = () => {
  // Auto-open sidebar on desktop
  if (window.innerWidth >= 768) {
    isOpen.value = true
  }
}

const navigateTo = (tabId: string) => {
  activeTab.value = tabId
  
  // Find the menu item and navigate to its path
  const menuItem = [...mainMenuItems, ...configMenuItems].find(item => item.id === tabId)
  if (menuItem && menuItem.path) {
    router.push(menuItem.path)
  }
  
  // Close sidebar on mobile after navigation
  if (window.innerWidth < 768) {
    isOpen.value = false
  }
}

const handleLogout = () => {
  // Implement logout logic
  localStorage.removeItem('token')
  localStorage.removeItem('role')
  router.push('/login')
}
</script>

<style scoped>
/* Advanced styling for scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(107, 114, 128, 0.5);
  border-radius: 20px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(107, 114, 128, 0.7);
}

/* Sidebar width responsive handling */
@media (min-width: 768px) {
  aside {
    width: 280px; /* Slightly wider on desktop */
  }
}

/* Smooth transition for sidebar */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>