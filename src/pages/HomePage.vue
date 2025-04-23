<template>
    <WelcomeMessageCard />
    <FancyItemList 
        :apiUrl="apiUrl" 
        :limit="5" 
        dataKey="questions" 
        limitKey="count" 
        itemKey="barcode" 
        storeKey="QuestionsStore">
        <template #item="{ source_image_url, barcode }">
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <img class="w-20 h-20" :src="source_image_url" :alt="barcode + ' image'"/>
                <p>{{ barcode }}</p>
            </div>
        </template>
        <template #skeleton>
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <div class="skeleton w-20 h-20"></div>
                <div class="skeleton w-35 h-4 mt-1"></div>
            </div>
        </template>
        <template #empty>
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <p class="text-center">No questions available</p>
            </div>
        </template>
        <template #error>
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <p class="text-center">Error loading questions</p>
            </div>
        </template>
    </FancyItemList>
</template>
<script setup lang="ts">
import { createFancyItemList } from "@/components/createFancyItemList";
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import type { Question } from "@/types/Question";
import { ref } from "vue";

const FancyItemList = createFancyItemList<Question>();

const apiUrl = ref(import.meta.env.VITE_QUESTIONS_API_URL);
</script>