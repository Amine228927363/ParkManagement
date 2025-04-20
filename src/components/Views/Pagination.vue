<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm">
      <div class="flex flex-1 justify-between sm:hidden">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
            currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          ]"
        >
          Previous
        </button>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'relative ml-3 inline-flex items-center rounded-md px-4 py-2 text-sm font-medium',
            currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          ]"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing 
            <span class="font-medium">{{ startItem }}</span>
            to
            <span class="font-medium">{{ endItem }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              :class="{ 'cursor-not-allowed': currentPage === 1 }"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <!-- First Page -->
            <button 
              v-if="showFirstPageButton" 
              @click="changePage(1)" 
              :class="getPageButtonClass(1)"
            >
              1
            </button>
            
            <!-- Ellipsis -->
            <span v-if="showLeftEllipsis" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
              ...
            </span>
            
            <!-- Page Numbers -->
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="changePage(page)"
              :class="getPageButtonClass(page)"
            >
              {{ page }}
            </button>
            
            <!-- Ellipsis -->
            <span v-if="showRightEllipsis" class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
              ...
            </span>
            
            <!-- Last Page -->
            <button 
              v-if="showLastPageButton" 
              @click="changePage(totalPages)" 
              :class="getPageButtonClass(totalPages)"
            >
              {{ totalPages }}
            </button>
            
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
              :class="{ 'cursor-not-allowed': currentPage === totalPages }"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps({
    totalPages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    totalItems: {
      type: Number,
      default: 0
    }
  });
  
  const emit = defineEmits(['page-changed']);
  
  // Calculate start and end items for the current page
  const startItem = computed(() => {
    return ((props.currentPage - 1) * props.itemsPerPage) + 1;
  });
  
  const endItem = computed(() => {
    const end = props.currentPage * props.itemsPerPage;
    return end > props.totalItems ? props.totalItems : end;
  });
  
  // Logic for which page buttons to show
  const displayedPages = computed(() => {
    const maxButtons = 5;
    const pages = [];
    
    if (props.totalPages <= maxButtons) {
      // Show all pages if the total is less than max
      for (let i = 1; i <= props.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Calculate range based on current page
      let start = Math.max(props.currentPage - Math.floor(maxButtons / 2), 1);
      let end = start + maxButtons - 1;
      
      if (end > props.totalPages) {
        end = props.totalPages;
        start = Math.max(end - maxButtons + 1, 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  });
  
  // Logic for showing ellipsis and first/last page buttons
  const showFirstPageButton = computed(() => {
    return props.totalPages > 5 && !displayedPages.value.includes(1);
  });
  
  const showLastPageButton = computed(() => {
    return props.totalPages > 5 && !displayedPages.value.includes(props.totalPages);
  });
  
  const showLeftEllipsis = computed(() => {
    return showFirstPageButton.value && displayedPages.value[0] > 2;
  });
  
  const showRightEllipsis = computed(() => {
    return showLastPageButton.value && displayedPages.value[displayedPages.value.length - 1] < props.totalPages - 1;
  });
  
  // Handle page change
  const changePage = (page) => {
    if (page < 1 || page > props.totalPages || page === props.currentPage) {
      return;
    }
    emit('page-changed', page);
  };
  
  // Generate CSS classes for page buttons
  const getPageButtonClass = (page) => {
    return [
      'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:outline-offset-0',
      page === props.currentPage 
        ? 'bg-blue-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 border-blue-600 z-10'
        : 'text-gray-900 hover:bg-gray-50'
    ];
  };
  </script>