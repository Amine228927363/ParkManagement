<template>
  <div class="flex">
    <!-- Sidebar -->
    <sidebarvue />

    <!-- Main Content Area -->
    <div class="flex-1 p-6 bg-gray-100 min-h-screen">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
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
          :users="paginatedUsers" 
          @edit-user="openEditUserModal"
          @delete-user="deleteUser"
        />

        <!-- Pagination -->
        <Pagination 
          :total-pages="totalPages"
          :current-page="currentPage"
          @page-changed="changePage"
        />
      </div>
    </div>

    <!-- Modal -->
    <UserFormModal 
      v-if="showUserModal"
      :is-edit="isEditMode"
      :user="selectedUser"
      @close="closeUserModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import sidebarvue from './sidebar.vue';
import UserFormModal from './UserFormModal.vue';
import UserFilters from './UserFilters.vue';
import UsersTable from './UsersTable.vue';
import Pagination from './Pagination.vue';
import { createUser, getSOSUsers, updateUser, deleteUserById } from '../../services/userServices'; 

const users = ref([]);
const filteredUsers = ref([]);
const isLoading = ref(true);
const error = ref(null);

const currentPage = ref(1);
const itemsPerPage = 10;
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

const showUserModal = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const { data } = await getSOSUsers();
    users.value = data;
    filteredUsers.value = data;
  } catch (err) {
    error.value = 'Failed to load users. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

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



const deleteUser = async (userId) => {
  try {
    await deleteUserById(userId);
    users.value = users.value.filter(u => u.id !== userId);
    filteredUsers.value = filteredUsers.value.filter(u => u.id !== userId);
  } catch (err) {
    console.error('Delete user failed:', err);
  }
};

const applyFilters = (filters = {}) => {
  let result = [...users.value];

  if (filters.search) {
    const term = filters.search.toLowerCase();
    result = result.filter(user => 
      user.name.toLowerCase().includes(term) || 
      user.email.toLowerCase().includes(term)
    );
  }

  if (filters.status) {
    result = result.filter(user => user.status === filters.status);
  }

  filteredUsers.value = result;
  currentPage.value = 1;
};

const changePage = (page) => {
  currentPage.value = page;
};
</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>