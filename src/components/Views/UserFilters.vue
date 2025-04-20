<template>
    <div class="bg-white rounded-lg shadow p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
        <!-- Search Input -->
        <div class="md:col-span-6">
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              id="search"
              v-model="filters.search"
              @input="emitFilterChange"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by name or email"
            />
          </div>
        </div>
        
        <!-- Status Filter -->
        <div class="md:col-span-3">
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="filters.status"
            @change="emitFilterChange"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        
        <!-- Date Range Filter -->
        <div class="md:col-span-3">
          <label for="daterange" class="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
          <select
            id="daterange"
            v-model="filters.dateRange"
            @change="emitFilterChange"
            class="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <!-- Filter Actions -->
      <div class="flex justify-end mt-4 space-x-2">
        <button 
          @click="resetFilters"
          class="px-3 py-1.5 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
        >
          Reset Filters
        </button>
        <button 
          @click="emitFilterChange"
          class="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  const emit = defineEmits(['filter-changed']);
  
  const filters = reactive({
    search: '',
    status: '',
    dateRange: ''
  });
  
  const emitFilterChange = () => {
    emit('filter-changed', { ...filters });
  };
  
  const resetFilters = () => {
    filters.search = '';
    filters.status = '';
    filters.dateRange = '';
    emitFilterChange();
  };
  </script>