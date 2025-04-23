<template>
  <ul class="mt-4 flex flex-col gap-2">
    <template v-if="!error && !items">
      <li v-for="(_, index) in Array.from({ length: count })" :key="index">
        <slot name="skeleton" />
      </li>
    </template>
    <template v-if="error">
      <slot name="error" />
    </template>
    <template v-else-if="!error && items && items.length === 0">
      <slot name="empty" />
    </template>
    <template v-if="!error && items && items.length > 0">
      <li v-for="item in items" v-bind:key="getItemKey(item)">
        <slot name="item" v-bind:item="item"></slot>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { useItems } from '@/composables/useItems';

// Usando genéricos en el componente
interface Props {
  apiUrl: string;
  count?: number;
  dataKey?: string;
  itemKey?: string | ((item: T) => string | number);
  storeKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  count: 5,
  dataKey: 'questions',
  itemKey: 'barcode',
});

// Función para obtener la clave única del item
const getItemKey = (item: T): string | number => {
  if (typeof props.itemKey === 'function') {
    return props.itemKey(item);
  }

  return typeof props.itemKey === 'string' && props.itemKey in item 
    ? String(item[props.itemKey as keyof T]) 
    : JSON.stringify(item);
};

const { items, error } = useItems<T>(props.apiUrl, props.count, props.dataKey, props.storeKey);

// Definir explícitamente los slots para mejor inferencia de tipos
defineSlots<{
  item(props: { item: T }): void;
  skeleton(): void;
  empty(): void;
  error(): void;
}>();

</script>