<template>
    <WelcomeMessageCard />
    <FancyQuestionList :apiUrl="apiUrl">
        <template #item="{ barcode, source_image_url }">
            <div class="item">
                <img :src="source_image_url" :alt="barcode + ' image'"/>
                <p>{{ barcode }}</p>
            </div>
        </template>    
    </FancyQuestionList>
</template>
<script setup lang="ts">
import FancyQuestionList from "@/components/FancyQuestionList.vue";
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import { ref } from "vue";

const apiUrl = ref("https://robotoff.openfoodfacts.org/api/v1/questions?count=10");
</script>