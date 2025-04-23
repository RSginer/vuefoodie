<template>
  <slot v-bind:loading="loading" name="info"></slot>
</template>
<script setup lang="ts">
import { defineProps, watch, ref } from "vue";

const loading = ref(true);

const props = defineProps<{
    itemKey: string;
}>();

const { itemKey } = props;

watch(() => itemKey, (newItemKey) => {
    console.log("Barcode changed to: ", newItemKey);
}, {
    immediate: true,
    deep: true
});

</script>