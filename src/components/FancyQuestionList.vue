<template>
  <ul>
    <li v-if="!items.length">
      Loading...
    </li>
    <li v-for="item in items" v-bind:key="item.barcode">
      <slot name="item" v-bind="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

type Question = {
  barcode: string;
}

type QuestionResponse = {
  questions: Question[];
}

const { apiUrl } = defineProps(['apiUrl']);


watch(() => apiUrl, async (newApiUrl) => {
  if (newApiUrl) {
    new Promise<QuestionResponse>((resolve) => {
      const url = new URL(newApiUrl);
      
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