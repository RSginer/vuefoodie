<template>
  <slot name="error" v-if="error">
    <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
      <p class="text-center">Error loading data</p>
    </div>
  </slot>
  <slot v-else />
</template>
<script setup lang="ts">
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | undefined>()

onErrorCaptured((err) => {
  console.error('Error captured:', err)
  error.value = err // Store the error in a ref for display
  // Handle the error as needed
  return false // Returning false allows the error to propagate further
})
</script>
