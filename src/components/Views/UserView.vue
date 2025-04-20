<template>
  <div class="flex">
    <!-- Sidebar (déjà importé) -->
    <sidebarvue></sidebarvue>
    /*
    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header with Title and Create Button -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">SOS Users</h1>
            <p class="text-gray-600">Manage all system users with SOS access</p>
          </div>
          <button 
            @click="openCreateUserModal"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Create User
          </button>
        </div>

        <!-- Filters and Search -->
        <UserFilters @filter-changed="applyFilters" />
        
        <!-- Users Table -->
        <UsersTable 
          :users="filteredUsers" 
          @edit-user="openEditUserModal" 
          @delete-user="openDeleteUserModal" 
        />
        
        <!-- Pagination Component -->
        <Pagination 
          :total-pages="totalPages"
          :current-page="currentPage"
          @page-changed="changePage"
        />
      </div>
    </div>
    
    <!-- User Modal (Create/Edit) -->
    <UserFormModal 
      v-if="showUserModal"
      :is-edit="isEditMode"
      :user="selectedUser"
      @close="closeUserModal"
      @save="saveUser"
    />
    
    <!-- Delete Confirmation Modal -->
    <DeleteConfirmModal
      v-if="showDeleteModal"
      :user="selectedUser"
      @close="closeDeleteModal"
      @confirm="deleteUser"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import sidebarvue from './sidebar.vue';
/*
import UserFilters from './components/UserFilters.vue';
import UsersTable from './components/UsersTable.vue';
import Pagination from './components/Pagination.vue';
import UserFormModal from './components/UserFormModal.vue';
import DeleteConfirmModal from './components/DeleteConfirmModal.vue';*/

// User data state
const users = ref([]);
const filteredUsers = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value));

// Modal state
const showUserModal = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);
const showDeleteModal = ref(false);

// Fetch users data
onMounted(async () => {
  try {
    isLoading.value = true;
    // Replace with your actual API call
    const response = await fetch('/api/sos-users');
    const data = await response.json();
    users.value = data;
    filteredUsers.value = data;
    isLoading.value = false;
  } catch (err) {
    error.value = "Failed to load users. Please try again.";
    isLoading.value = false;
  }
});

// Modal handlers
const openCreateUserModal = () => {
  selectedUser.value = null;
  isEditMode.value = false;
  showUserModal.value = true;
};

const openEditUserModal = (user) => {
  selectedUser.value = { ...user };
  isEditMode.value = true;
  showUserModal.value = true;
};

const closeUserModal = () => {
  showUserModal.value = false;
  selectedUser.value = null;
};

const openDeleteUserModal = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  selectedUser.value = null;
};

// Action handlers
const saveUser = async (userData) => {
  try {
    // Handle create or update based on isEditMode
    if (isEditMode.value) {
      // Update existing user
      await fetch(`/api/sos-users/${userData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      // Update local data
      const index = users.value.findIndex(u => u.id === userData.id);
      if (index !== -1) {
        users.value[index] = { ...userData };
      }
    } else {
      // Create new user
      const response = await fetch('/api/sos-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const newUser = await response.json();
      users.value.push(newUser);
    }
    
    // Apply current filters to update filtered users
    applyFilters();
    closeUserModal();
  } catch (err) {
    // Handle error
    console.error('Error saving user:', err);
  }
};

const deleteUser = async () => {
  if (!selectedUser.value) return;
  
  try {
    await fetch(`/api/sos-users/${selectedUser.value.id}`, {
      method: 'DELETE'
    });
    
    // Remove from local data
    users.value = users.value.filter(u => u.id !== selectedUser.value.id);
    filteredUsers.value = filteredUsers.value.filter(u => u.id !== selectedUser.value.id);
    closeDeleteModal();
  } catch (err) {
    console.error('Error deleting user:', err);
  }
};

// Filter handling
const applyFilters = (filters = {}) => {
  // Apply filters to users array
  let result = [...users.value];
  
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    result = result.filter(user => 
      user.name.toLowerCase().includes(searchTerm) || 
      user.email.toLowerCase().includes(searchTerm)
    );
  }
  
  if (filters.status) {
    result = result.filter(user => user.status === filters.status);
  }
  
  // Apply any other filters as needed
  
  filteredUsers.value = result;
  currentPage.value = 1; // Reset to first page when filters change
};

// Pagination handler
const changePage = (page) => {
  currentPage.value = page;
};
</script>