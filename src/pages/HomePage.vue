<template>
  <QuestionList
    :apiUrl="apiUrl"
    :limit="5"
    dataKey="questions"
    limitKey="count"
    itemKey="barcode"
    storeKey="QuestionsStore"
  >
    <template #item="{ barcode, source_image_url }: Question">
      <ProductItemInfo :itemKey="barcode">
        <template #info="{ loading, data }: FancyItemInfoBindedProps<Product>">
          <div
            class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md"
          >
            <div class="flex flex-col justify-center items-center">
              <div
                :style="`background-image: url(${source_image_url})`"
                alt="Question Image"
                class="w-30 h-30 rounded-lg bg-center bg-cover bg-no-repeat"
              />
            </div>
            <div class="flex flex-col">
              <div class="text-xs"><span class="font-semibold">EAN:</span>{{ barcode }}</div>
              <div v-if="loading" class="skeleton w-40 h-5 mt-1.5"></div>
              <h3 v-else class="text-lg font-semibold">
                {{ data?.product_name || data?.product_name_en }}
              </h3>
              <div v-if="loading" class="skeleton w-15 h-4 mt-2"></div>
              <p v-else class="text-sm text-gray-500">{{ data?.brands }}</p>
            </div>
          </div>
        </template>
      </ProductItemInfo>
    </template>
    <template #skeleton>
      <div class="flex flex-row gap-2 dark:bg-base-200 w-full rounded-2xl bg-white p-6 shadow-md">
        <div class="skeleton w-30 h-30"></div>
        <div class="flex flex-col">
          <div class="skeleton w-30 h-3"></div>
          <div class="skeleton w-40 h-5 mt-2.5"></div>
          <div class="skeleton w-15 h-4 mt-2"></div>
        </div>
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
import {
  createFancyItemInfo,
  type FancyItemInfoBindedProps,
} from '@/components/createFancyItemInfo'
import createFancyItemList from '@/components/createFancyItemList'
import type { Product } from '@/types/Product'
import type { Question } from '@/types/Question'
import { ref } from 'vue'

const QuestionList = createFancyItemList<Question>()
const ProductItemInfo = createFancyItemInfo<Product>()

const apiUrl = ref(import.meta.env.VITE_QUESTIONS_API_URL)
</script>
