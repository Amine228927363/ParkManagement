<template>
  <div class="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <Sidebar />
    <div class="flex-1 p-6 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <!-- Header section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">Manage Suppliers</h1>
            <p class="text-gray-500 mt-1">
              Track and manage all company suppliers
            </p>
          </div>
          <div class="flex space-x-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search suppliers..."
                class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
            <button
              @click="showSupplierForm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition shadow-md hover:shadow-lg"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              New Supplier
            </button>
          </div>
        </div>

        <!-- Table section -->
        <div class="bg-white rounded-lg shadow overflow-hidden">
          <div v-if="loading" class="flex justify-center items-center py-12">
            <div
              class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
            ></div>
            <span class="ml-3 text-gray-500">Loading suppliers...</span>
          </div>

          <div
            v-else-if="filteredSuppliers.length === 0"
            class="flex flex-col items-center justify-center py-16 px-4 text-center"
          >
            <div class="rounded-full bg-gray-100 p-6 mb-4">
              <svg
                class="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-medium text-gray-900">
              No suppliers found
            </h3>
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
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Contact Person
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Vehicle Plate
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="supplier in filteredSuppliers"
                  :key="supplier.id"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ supplier.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <div
                        class="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold"
                      >
                        {{ supplier.company.charAt(0) }}
                      </div>
                      <div class="ml-3">
                        <div class="font-medium text-gray-900">
                          {{ supplier.company }}
                        </div>
                        <div class="text-xs text-gray-500">
                          {{ supplier.industry }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ supplier.contactPerson }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      class="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800"
                    >
                      {{ supplier.email }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ supplier.phone }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div class="flex items-center">
                      <span
                        class="w-3 h-3 rounded-full mr-2"
                        :class="getSupplierCategoryClass(supplier.category)"
                      ></span>
                      {{ supplier.vehiclePlate }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      class="px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusClass(supplier.status)"
                    >
                      {{ supplier.status }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right"
                  >
                    <div class="flex justify-end space-x-2">
                      <button
                        @click="viewSupplier(supplier)"
                        class="bg-blue-100 text-blue-700 px-1 py-1 rounded hover:bg-blue-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                      <button
                        @click="openScheduleForm(supplier)"
                        class="bg-yellow-100 text-yellow-700 px-1 py-1 rounded hover:bg-yellow-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                          />
                        </svg>
                      </button>
                      <button
                        @click="confirmDelete(supplier)"
                        class="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                      <button
                        @click="openUpdateForm(supplier)"
                        class="bg-green-100 text-green-700 px-1 py-1 rounded hover:bg-green-200 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.862 4.487a2.25 2.25 0 0 1 3.182 3.182l-1.414 1.414m-3.182-3.182L7.5 12l-2.25 6.75L12 16.5l6.75-6.75Z"
                          />
                        </svg>
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

    <!-- View Supplier Modal -->
    <div
      v-if="showSupplierDetails"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">Supplier Details</h2>
            <button
              @click="closeSupplierDetails"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="bg-blue-50 p-4 rounded-lg mb-4">
            <div class="flex justify-between">
              <span class="text-sm text-blue-800 font-semibold">ID</span>
              <span class="text-sm text-gray-800">{{
                selectedSupplier.id
              }}</span>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="text-md font-medium text-gray-800 mb-2">
              Company Information
            </h3>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Company Name</span>
                <span class="text-sm font-medium">{{
                  selectedSupplier.company
                }}</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="text-md font-medium text-gray-800 mb-2">
              Contact Information
            </h3>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Contact Person</span>
                <span class="text-sm font-medium">{{
                  selectedSupplier.contactPerson
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Email</span>
                <span class="text-sm font-medium">{{
                  selectedSupplier.email
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Phone</span>
                <span class="text-sm font-medium">{{
                  selectedSupplier.phone
                }}</span>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="text-md font-medium text-gray-800 mb-2">
              Additional Information
            </h3>
            <div class="bg-gray-50 p-4 rounded-lg space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Vehicle Plate</span>
                <div class="flex items-center">
                  <span
                    class="w-3 h-3 rounded-full mr-2"
                    :class="
                      getSupplierCategoryClass(selectedSupplier.vehiclePlate)
                    "
                  ></span>
                  <span class="text-sm font-medium">{{
                    selectedSupplier.vehiclePlate
                  }}</span>
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Status</span>
                <span
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(selectedSupplier.status)"
                >
                  {{ selectedSupplier.status }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Rating</span>
                <div class="flex">
                  <span v-for="i in 5" :key="i" class="text-yellow-400">
                    <svg
                      class="w-4 h-4"
                      :fill="
                        i <= selectedSupplier.rating ? 'currentColor' : 'none'
                      "
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <h3 class="text-md font-medium text-gray-800 mb-2">Address</h3>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-700">
                {{ selectedSupplier.address }}
              </p>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              @click="closeSupplierDetails"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex items-center mb-4">
            <div class="bg-red-100 rounded-full p-3 mr-4">
              <svg
                class="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Confirm Deletion</h2>
          </div>

          <p class="text-gray-600 mb-6">
            Are you sure you want to delete this supplier? This action cannot be
            undone.
          </p>

          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex justify-between mb-2">
              <span class="text-sm text-gray-600">ID</span>
              <span class="text-sm font-medium">{{
                supplierToDelete?.id
              }}</span>
            </div>
            <div class="flex justify-between mb-2">
              <span class="text-sm text-gray-600">Company</span>
              <span class="text-sm font-medium">{{
                supplierToDelete?.companyName
              }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Contact</span>
              <span class="text-sm font-medium">{{
                supplierToDelete?.contactName
              }}</span>
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
              @click="deleteSupplier()"
              class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add Supplier Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Add New Supplier</h2>
            <button
              @click="closeAddModal"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitSupplier">
            <div class="space-y-4">
              <!-- Company Name -->
              <div>
                <label
                  for="company"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Company Name *</label
                >
                <input
                  id="company"
                  v-model="newSupplier.company"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <!-- Contact Person -->
              <div>
                <label
                  for="contactPerson"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Contact Person *</label
                >
                <input
                  id="contactPerson"
                  v-model="newSupplier.contactPerson"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter contact person name"
                />
              </div>

              <!-- Name -->
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Supplier Name *</label
                >
                <input
                  id="name"
                  v-model="newSupplier.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter supplier name"
                />
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Email *</label
                >
                <input
                  id="email"
                  v-model="newSupplier.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <!-- Phone -->
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Phone *</label
                >
                <input
                  id="phone"
                  v-model="newSupplier.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <!-- Vehicle Plate -->
              <div>
                <label
                  for="vehiclePlate"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Vehicle Plate *</label
                >
                <input
                  id="vehiclePlate"
                  v-model="newSupplier.vehiclePlate"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vehicle plate number"
                />
              </div>

              <!-- Status -->
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Status</label
                >
                <select
                  id="status"
                  v-model="newSupplier.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="BLOCKED">Blocked</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeAddModal"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </span>
                <span v-else>Save Supplier</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
      v-if="showScheduleForm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">
              Create Supplier Arrival
            </h2>
            <button
              @click="closeScheduleForm"
              class="text-gray-500 hover:text-gray-700"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="submitArrival">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Arrival Date *</label
                >
                <input
                  type="datetime-local"
                  v-model="newArrival.arrivalTime"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <!-- New Field: Parking Space ID -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Parking Space ID *</label
                >
                <input
                  type="text"
                  v-model="newArrival.parkingSpaceId"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter parking space ID"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Notes</label
                >
                <textarea
                  v-model="newArrival.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Optional comments..."
                ></textarea>
              </div>
            </div>

            <div class="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                @click="closeScheduleForm"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmittingArrival"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <span v-if="isSubmittingArrival" class="flex items-center">
                  <svg
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Saving...
                </span>
                <span v-else>Save Arrival</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div
            v-if="showUpdateModal"
            class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
          >
            <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h2 class="text-xl font-bold text-gray-800">
                    Update Supplier
                  </h2>
                  <button
                    @click="closeUpdateForm"
                    class="text-gray-500 hover:text-gray-700"
                  >
                    <svg
                      class="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>

                <form @submit.prevent="editSupplier">
                  <div class="space-y-4">
                    <!-- Company Name -->
                    <div>
                      <label
                        for="company"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Company Name *</label
                      >
                      <input
                        id="company"
                        v-model="updatedSupplier.company"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter company name"
                      />
                    </div>

                    <!-- Contact Person -->
                    <div>
                      <label
                        for="contactPerson"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Contact Person *</label
                      >
                      <input
                        id="contactPerson"
                        v-model="updatedSupplier.contactPerson"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter contact person name"
                      />
                    </div>

                    <!-- Name -->
                    <div>
                      <label
                        for="name"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Supplier Name *</label
                      >
                      <input
                        id="name"
                        v-model="updatedSupplier.name"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter supplier name"
                      />
                    </div>

                    <!-- Email -->
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Email *</label
                      >
                      <input
                        id="email"
                        v-model="updatedSupplier.email"
                        type="email"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email address"
                      />
                    </div>

                    <!-- Phone -->
                    <div>
                      <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Phone *</label
                      >
                      <input
                        id="phone"
                        v-model="updatedSupplier.phone"
                        type="tel"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <!-- Vehicle Plate -->
                    <div>
                      <label
                        for="vehiclePlate"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Vehicle Plate *</label
                      >
                      <input
                        id="vehiclePlate"
                        v-model="updatedSupplier.vehiclePlate"
                        type="text"
                        required
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter vehicle plate number"
                      />
                    </div>

                    <!-- Status -->
                    <div>
                      <label
                        for="status"
                        class="block text-sm font-medium text-gray-700 mb-1"
                        >Status</label
                      >
                      <select
                        id="status"
                        v-model="updatedSupplier.status"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="BLOCKED">BLOCKED</option>
                      </select>
                    </div>
                  </div>

                  <div class="flex justify-end space-x-3 mt-6">
                    <button
                      type="button"
                      @click="closeUpdateForm"
                      class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      :disabled="isSubmitting"
                    >
                      <span v-if="isSubmitting" class="flex items-center">
                        <svg
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </span>
                      <span v-else>Save Supplier</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  getAllSuppliers,
  deleteSupplierById,
  createSupplier,
    updateSupplier
} from "../../services/supplierServices";
import { createSupplierArrival } from "../../services/supplierArrivalService";
import { updateSpace } from "../../services/parkingSpace";
import Sidebar from "./sidebar.vue";

// State
const suppliers = ref<any[]>([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedSupplier = ref(null);
const showSupplierDetails = ref(false);
const showDeleteModal = ref(false);
const closeAddForm = ref(false);
const showUpdateModal = ref(false);
const showAddModal = ref(false);
const showScheduleForm = ref(false);
const supplierToDelete = ref(null);
const isSubmitting = ref(false);
const newSupplier = ref({
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  company: "",
  vehiclePlate: "",
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});
const updatedSupplier = ref({
  name: "",
  contactPerson: "",
  phone: "",
  email: "",
  company: "",
  vehiclePlate: "",
  status: "ACTIVE" as "ACTIVE" | "INACTIVE",
});
const isSubmittingArrival = ref(false);
const newArrival = ref({
  arrivalTime: "",
  notes: "",
  parkingSpaceId: "",
});

// Fetch suppliers from API
const fetchSuppliers = async () => {
  try {
    loading.value = true;
    const response = await getAllSuppliers();
    suppliers.value = response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
  } finally {
    loading.value = false;
  }
};

// Filter suppliers based on search query
const filteredSuppliers = computed(() => {
  if (!searchQuery.value) return suppliers.value;

  const query = searchQuery.value.toLowerCase();
  return suppliers.value.filter((supplier) => {
    return (
      supplier.id.toString().includes(query) ||
      supplier.company.toLowerCase().includes(query) ||
      supplier.contactPerson.toLowerCase().includes(query) ||
      supplier.email.toLowerCase().includes(query) ||
      supplier.phone.toLowerCase().includes(query) ||
      supplier.status.toLowerCase().includes(query)
    );
  });
});

// Supplier category styling
const getSupplierCategoryClass = (category: string) => {
  const categoryMap: Record<string, string> = {
    "Raw Materials": "bg-green-500",
    Services: "bg-blue-500",
    Equipment: "bg-purple-500",
    Logistics: "bg-yellow-500",
    Technology: "bg-indigo-500",
  };
  return categoryMap[category] || "bg-gray-500";
};

// Status styling
const getStatusClass = (status: string) => {
  const statusMap: Record<string, string> = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Blacklisted: "bg-red-100 text-red-800",
  };
  return statusMap[status] || "bg-gray-100 text-gray-800";
};
const showSupplierForm = () => {
  showAddModal.value = true;
};
const closeAddModal = () => {
  showAddModal.value = false;
  newSupplier.value = {
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    company: "",
    vehiclePlate: "",
    status: "ACTIVE",
  };
};
//create new supplier
const createNewSupplier = () => {
  return createSupplier(newSupplier.value)
    .then(() => {
      alert("Supplier created successfully!");
      fetchSuppliers(); // Refresh the supplier list
    })
    .catch((error) => {
      console.error("Error creating supplier:", error);
    });
};

// Submit supplier form
const submitSupplier = async () => {
  isSubmitting.value = true;
  try {
    await createNewSupplier();
    showAddModal.value = false;
    newSupplier.value = {
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      company: "",
      vehiclePlate: "",
      status: "ACTIVE",
    };
  } catch (error) {
    console.error("Error submitting supplier:", error);
  } finally {
    isSubmitting.value = false;
  }
};

// View supplier details
const viewSupplier = (supplier: any) => {
  showSupplierDetails.value = true;
  selectedSupplier.value = supplier;
};
const closeSupplierDetails = () => {
  showSupplierDetails.value = false;
  selectedSupplier.value = null;
};

// Delete confirmation
const confirmDelete = (supplier: any) => {
  supplierToDelete.value = supplier;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  supplierToDelete.value = null;
  showDeleteModal.value = false;
};

// Delete supplier
const deleteSupplier = async () => {
  if (!supplierToDelete.value) return;

  try {
    await deleteSupplierById(supplierToDelete.value.id);
    suppliers.value = suppliers.value.filter(
      (item) => item.id !== supplierToDelete.value.id
    );
    showDeleteModal.value = false;
    supplierToDelete.value = null;
  } catch (error) {
    console.error("Error deleting supplier:", error);
  }
};
// function to schedule suuplier arrival
const openScheduleForm = (supplier: any) => {
  selectedSupplier.value = supplier;
  showScheduleForm.value = true;
};
const closeScheduleForm = () => {
  showScheduleForm.value = false;
  selectedSupplier.value = null;
};
const openUpdateForm = (supplier: any) => {
updatedSupplier.value = { ...supplier }; // Copy the supplier data to newSupplier
selectedSupplier.value = supplier;
showUpdateModal.value = true;
};

// Edit supplier method
const editSupplier = async () => {
  isSubmitting.value = true;
  try {
    const response = await updateSupplier(
      selectedSupplier.value?.id,
      updatedSupplier.value 
    );
    if (response.status === 200) {
      alert("Supplier updated successfully!");
      fetchSuppliers(); // Refresh the supplier list
    } else {
      alert("Failed to update supplier. Please try again.");
    }
    // Optionally show success message, refresh list, etc.
    showUpdateModal.value = false;
  } catch (error) {
    console.error("Failed to update supplier", error);
  } finally {
    isSubmitting.value = false;
  }
};

const closeUpdateForm = () => {
  showUpdateModal.value = false;
  selectedSupplier.value = null;
};
const connectedParkingSpaces = ref<any[]>([]); // Define connectedParkingSpaces

const submitArrival = async () => {
  try {
    const adminId = localStorage.getItem("id")?.toString();

    if (
      !selectedSupplier.value ||
      !newArrival.value.parkingSpaceId ||
      !newArrival.value.arrivalTime
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const arrivalPayload = {
      supplierId: selectedSupplier.value.id,
      arrivalTime: new Date(newArrival.value.arrivalTime).toISOString(),
      parkingSpaceId: newArrival.value.parkingSpaceId,
      notes: newArrival.value.notes || "",
      scheduledBy: adminId,
    };

    // Create supplier arrival
    const response = await createSupplierArrival(arrivalPayload);
    // Assuming you have a function to update the parking space status
    const parkingSpace = connectedParkingSpaces.value.find(
      (space) => space.id === newArrival.value.parkingSpaceId
    );
    await updateSpace(Number(arrivalPayload.parkingSpaceId), "RESERVED");

    alert("Supplier arrival scheduled successfully!");
    fetchSuppliers(); // Optionally refresh supplier list

    closeScheduleForm(); // Close the modal
  } catch (error) {
    console.error("Error scheduling supplier arrival:", error);
    alert("An error occurred while scheduling the arrival. Please try again.");
  }
};

onMounted(() => {
  fetchSuppliers();
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
