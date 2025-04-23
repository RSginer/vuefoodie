import { createItemsStore } from '@/store/useItemsStore';
import { storeToRefs } from 'pinia';
import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue';

/**
 * Generic composable for fetching data from an API
 * @param apiUrl URL to fetch data from
 * @param count Number of items to fetch
 * @param dataKey Key in the response object that contains the items array (default: "questions")
 * @returns Object with error and items from the store
 */
const useItems = <T>(
  apiUrl: MaybeRefOrGetter<string>, 
  count: MaybeRefOrGetter<number>,
  dataKey: string = "questions",
  storeKey?: string
) => {
  // Create a new dynamic store instance each time this composable is used
  const itemsStore = createItemsStore(storeKey);
  const storeRefs = storeToRefs(itemsStore);
  
  watchEffect(() => {
    if (apiUrl) {
      const url = new URL(toValue(apiUrl));
      
      if (count) {
        url.searchParams.append('count', toValue(count).toString());
      }
      
      itemsStore.fetchData<T>(url, dataKey);
    }
  });

  return {
    error: storeRefs.error,
    items: storeRefs.items as MaybeRefOrGetter<T[] | undefined>,
  }
}

// Mantener el nombre original para compatibilidad
const useQuestions = useItems;

export default useQuestions;
export { useItems };
