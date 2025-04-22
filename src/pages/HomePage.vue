<template>
    <WelcomeMessageCard />
    <FancyQuestionList :apiUrl="apiUrl" :count="5">
        <template #item="{ barcode, source_image_url }">
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <img class="w-20 h-20" :src="source_image_url" :alt="barcode + ' image'"/>
                <p>{{ barcode }}</p>
            </div>
        </template>
        <template #skeleton>
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <div class="skeleton w-20 h-20"></div>
                <div class="skeleton w-full h-6"></div>
            </div>
        </template>
    </FancyQuestionList>
</template>
<script setup lang="ts">
import FancyQuestionList from "@/components/FancyQuestionList.vue";
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import { ref } from "vue";

const apiUrl = ref("https://robotoff.openfoodfacts.org/api/v1/questions");
</script>