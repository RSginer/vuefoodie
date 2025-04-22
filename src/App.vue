<style scoped></style>

<template>
  <MainLayout>
    <template #header>
      <PageHeader />
    </template>
    <template #default>
      <RouterView />
    </template>
    <template #footer>
      <PageFooter />
    </template>
    <template #credits>
      <PageCredits />
    </template>
  </MainLayout>
</template>


<script setup lang="ts">
import { provide, ref, watch } from 'vue';
import MainLayout from './components/MainLayout.vue';
import PageCredits from './components/PageCredits.vue';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue';
import SearchQueryKey from './types/SearchQueryKey';

const searchQuery = ref('');

provide(SearchQueryKey, searchQuery);

watch(searchQuery, () => {
  console.log('Search query changed:', searchQuery.value);
})
</script>
