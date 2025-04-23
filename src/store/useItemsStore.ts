import { defineStore, type Store } from "pinia";
import { ref } from "vue";
import activeStores from "./activeStores";

type ApiResponse<T> = {
  [key: string]: T[];
}

// Create a factory function that returns a new store instance
export const useItemsStore = <T>(storeKey?: string) => {
  // Use a unique id for each store instance
  const uniqueId = storeKey ? storeKey : `items-store-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  let itemsStore;
  if (storeKey && activeStores.has(uniqueId)) {
      itemsStore = activeStores.get(uniqueId) as Store<string, {
        items: T[] | undefined;
        error: Error | null;
        fetchData: (url: URL, dataKey?: string) => void;
      }>;

      console.info(`Using existing store instance for key: ${uniqueId}`);

      return itemsStore;
  }

  return defineStore(uniqueId, () => {
    const error = ref<Error | null>(null);
    const items = ref<T[] | undefined>(undefined);
    
    const fetchData = (url: URL, dataKey?: string) => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
                error.value = new Error('Network response was not ok');
            }

            return response;
        }).then((response) => response.json()).then((data: ApiResponse<T> | T[]) => {
          items.value = dataKey ? (data as ApiResponse<T>)[dataKey] : data as T[];
        }).catch((err) => {
          error.value = new Error('There has been a problem with your fetch operation: ' + err);
      });
    }

    return {
        items,
        error,
        fetchData
    };
  })();
};


export default useItemsStore;