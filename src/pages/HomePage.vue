<template>
    <WelcomeMessageCard />
    <FancyFoodList
        :apiUrl="apiUrl"
        :searchQuery="searchQuery"
        itemsPerPage="5">
        <template #item="{ barcode }">
            <div class="item">
                <p>{{ barcode }}</p>
            </div>
        </template>    
    </FancyFoodList>
</template>
<script setup lang="ts">
import FancyFoodList from "@/components/FancyQuestionList.vue";
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";

const store = useStore();

const { searchQuery } = storeToRefs(store);
const apiUrl = ref("https://robotoff.openfoodfacts.org/api/v1/questions?count=10");

watch(searchQuery, () => {
    console.log("searchQuery changed:", searchQuery.value);
})
</script>