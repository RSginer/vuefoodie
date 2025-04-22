<template>
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
            <p><!----><strong>OpenFoodFacts Explorer</strong> is a tool to explore the OpenFoodFacts database.<!---->
            </p>
            <p>You can enter a product code in the search bar above to get started or click on one of the products
                below.
            </p>
            
            <!-- Display route parameters if they exist -->
            <div v-if="Object.keys(params).length > 0" class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h4 class="text-lg font-bold mb-2">Route Parameters:</h4>
                <div v-for="(value, key) in params" :key="key" class="mb-1">
                    <span class="font-medium">{{ key }}:</span> {{ value }}
                </div>
            </div>
            
            <!-- Example navigation links -->
            <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button @click="$router.push('/product/123')" 
                        class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    View Product #123
                </button>
                <button @click="$router.push('/category/snacks/product/456')" 
                        class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
                    View Snack Product #456
                </button>
            </div>
        </div><!---->
    </div>
</template>
<script setup lang="ts">
import { useRoute } from '@/router';

// Access the route parameters
const { params } = useRoute();
</script>