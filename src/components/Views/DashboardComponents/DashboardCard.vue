<template>
    <div :class="`bg-${color}-100 p-4 rounded-lg shadow text-center`">
      <p :class="`text-${color}-800 font-semibold`">{{ label }}</p>
      <p class="text-2xl font-bold" :class="`text-${color}-900`">{{ value }}</p>
      <p v-if="percent !== undefined" :class="`text-sm text-${color}-700`">{{ percent }}%</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DashboardCard',
    props: {
      label: {
        type: String,
        required: true
      },
      value: {
        type: Number,
        required: true
      },
      percent: {
        type: Number,
        default: undefined
      },
      color: {
        type: String,
        default: 'blue',
        validator: function(value) {
          return ['blue', 'green', 'red', 'yellow', 'gray'].includes(value)
        }
      }
    }
  }
  </script>