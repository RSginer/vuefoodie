<template>
    <WelcomeMessageCard />
</template>
<script setup lang="ts">
import WelcomeMessageCard from "@/components/WelcomeMessageCard.vue";
import useStore from "@/store";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const store = useStore();

const { searchQuery } = storeToRefs(store);

watch(searchQuery, () => {
    console.log("searchQuery changed:", searchQuery.value);
})
</script>