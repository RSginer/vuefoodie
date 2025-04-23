<template>
  <slot v-bind:loading="loading" name="info" v-bind:data="item"></slot>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { useItemInfo } from "@/composables/useItemInfo";

const props = defineProps<{
    itemKey: string;
}>();

const { itemKey } = props;
const { item, loading } = useItemInfo(itemKey);

</script>