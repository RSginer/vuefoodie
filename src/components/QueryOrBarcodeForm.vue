<template>
  <input type="text" v-model="searchQuery" class="input join-item input-bordered xl:w-full" placeholder="Query or barcode">
  <button
    :disabled="searchQuery.length === 0"
    class="btn btn-square btn-secondary join-item px-10">Go</button>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const searchQuery = ref<string>('');

</script>