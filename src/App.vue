<style scoped>

</style>

<template>
  <MainLayout>
    <template #header>
      <img alt="OpenFoodFacts logo" class="logo" src="./assets/openfoodfacts-horizontal-logo.svg" width="325" height="125" />
    </template>
    <template #default>
      <h1 class="text-3xl font-bold text-center mt-4">Welcome to OpenFoodFacts Explorer</h1>
      <p class="text-center mt-2">Explore the world of food products and their nutritional information.</p>
      </template> 
      <template #footer>
        <PageFooter />
      </template>
  </MainLayout>
</template>


<script setup lang="ts">
import MainLayout from './components/MainLayout.vue';
import PageFooter from './components/PageFooter.vue';
</script>
