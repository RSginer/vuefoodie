<style scoped></style>

<template>
  <MainLayout>
    <template #header>
      <PageHeader />
    </template>
    <template #default>
      <div class="dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
        <div class="card-body items-center text-center">
          <h3 class="card-title mb-4 block text-2xl md:flex">Welcome to <div class="block xl:inline-block">
              <picture class="mx-2 block h-10 w-44 sm:h-12 sm:w-68 lg:mx-6">
                <source srcset="https://static.openfoodfacts.org/images/logos/off-logo-horizontal-dark.svg"
                  media="(prefers-color-scheme: dark)"> <img
                  src="https://static.openfoodfacts.org/images/logos/off-logo-horizontal-light.svg"
                  alt="OpenFoodFacts Explorer" class="h-full w-full">
              </picture><!---->
            </div> Explorer!</h3>
          <p><!----><strong>OpenFoodFacts Explorer</strong> is a tool to explore the OpenFoodFacts database.<!----></p>
          <p>You can enter a product code in the search bar above to get started or click on one of the products below.
          </p>
        </div><!---->
      </div>
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
import MainLayout from './components/MainLayout.vue';
import PageCredits from './components/PageCredits.vue';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue';
</script>
