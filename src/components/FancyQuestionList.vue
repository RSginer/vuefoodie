<template>
  <ul class="mt-4 flex flex-col gap-2">
    <template v-if="!error && !items">
      <li v-for="(_, index) in Array.from({ length: count })" :key="index">
        <slot name="skeleton" />
      </li>
    </template>
    <template v-if="error">
      <slot name="error" />
    </template>
    <template v-else-if="!error && items && items.length === 0">
      <slot name="empty" />
    </template>
    <template v-if="!error && items && items.length > 0">
      <li v-for="item in items" v-bind:key="item.barcode" class="flex flex-row gap-2">
        <slot name="item" v-bind="item"></slot>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import useQuestions from '@/composables/useQuestions';

const {apiUrl, count} = defineProps({
  apiUrl: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 5,
  },
});

const { items, error } = useQuestions(apiUrl, count);
</script>