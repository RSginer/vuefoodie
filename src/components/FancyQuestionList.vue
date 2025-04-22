<template>
  <ul class="mt-4 flex flex-col gap-2">
    <template v-if="!items.length">
      <li v-for="(_, index) in Array.from({ length: count })" :key="index">
        <slot name="skeleton" />
      </li>
    </template>
    <li v-for="item in items" v-bind:key="item.barcode" class="flex flex-row gap-2">
      <slot name="item" v-bind="item"></slot>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Question } from '@/types/Question';
import { ref, watch } from 'vue';


type QuestionResponse = {
  questions: Question[];
}

const { apiUrl, count } = defineProps(['apiUrl', 'count']);


watch([() => apiUrl, () => count], async ([newApiUrl, newCount]) => {
  if (newApiUrl) {
    new Promise<QuestionResponse>((resolve) => {
      const url = new URL(newApiUrl);

      if (newCount) {
        url.searchParams.append('count', newCount.toString());
      }
      
      fetch(url.toString())
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    })
      .then((data: QuestionResponse) => {
        items.value = data.questions;
      });
  }
}, { immediate: true });

const items = ref<Question[]>([])

</script>