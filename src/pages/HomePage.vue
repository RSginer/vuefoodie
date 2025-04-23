<template>
    <WelcomeMessageCard />
    <QuestionList
        :apiUrl="apiUrl" 
        :limit="5" 
        dataKey="questions" 
        limitKey="count" 
        itemKey="barcode" 
        storeKey="QuestionsStore">
        <template #item="{ barcode, source_image_url }: Question">
            <FancyItemInfo :itemKey="barcode">
                <template #info="info">
                    <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                        <div class="flex flex-col justify-center items-center">
                            <img :src="source_image_url" alt="Question Image" class="w-30 h-30 rounded-lg" />
                        </div>
                        <div v-if="info.loading" class="flex flex-col">
                            <div class="text-xs">{{ barcode }}</div>
                            <div class="skeleton w-30 h-4 mt-1.5"></div>
                            <div class="skeleton w-45 h-10 mt-4"></div>
                        </div>
                        <div v-else class="flex flex-col">
                            <h3 class="text-lg font-semibold">{{ info.title }}</h3>
                            <p class="text-sm text-gray-500">{{ info.description }}</p>
                        </div>
                    </div>
                </template>
            </FancyItemInfo>
        </template>
        <template #skeleton>
            <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
                <div class="skeleton w-30 h-30"></div>
                <div class="skeleton w-25 h-3 mt-1.5"></div>
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
    </QuestionList>
</template>
<script setup lang="ts">
import FancyItemInfo from "@/components/FancyItemInfo.vue";
import createFancyItemList from "@/components/createFancyItemList";
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import type { Question } from "@/types/Question";
import { ref } from "vue";

const QuestionList = createFancyItemList<Question>();

const apiUrl = ref(import.meta.env.VITE_QUESTIONS_API_URL);
</script>