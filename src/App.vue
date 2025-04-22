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
      <PageCredits />
    </template>
  </MainLayout>
</template>


<script setup lang="ts">
import MainLayout from './components/MainLayout.vue';
import PageCredits from './components/PageCredits.vue';
import PageHeader from './components/PageHeader.vue';
</script>
