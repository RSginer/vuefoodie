import { createItemsStore } from '@/store/useItemsStore';
import { storeToRefs } from 'pinia';
import { toValue, watchEffect, type MaybeRefOrGetter, type Ref } from 'vue';

/**
 * Generic composable for fetching data from an API
 * @param apiUrl URL to fetch data from
 * @param count Number of items to fetch
 * @param dataKey Key in the response object that contains the items array (default: "questions")
 * @returns Object with error and items from the store
 */
const useItems = <T>(
  apiUrl: MaybeRefOrGetter<string>, 
  limit: MaybeRefOrGetter<number>,
  dataKey?: string,
  storeKey?: string,
  limitKey?: string,
) => {
  // Create a new dynamic store instance each time this composable is used
  const itemsStore = createItemsStore(storeKey);
  const storeRefs = storeToRefs(itemsStore);
  
  watchEffect(() => {
    if (apiUrl) {
      const url = new URL(toValue(apiUrl));
      
      if (limit) {
        url.searchParams.append(limitKey || 'limit', toValue(limit).toString());
      }
      
      itemsStore.fetchData(url, dataKey);
    }
  });

  return {
    error: storeRefs.error,
    items: storeRefs.items as Ref<T[] | undefined>,
  }
}


export default useItems;
