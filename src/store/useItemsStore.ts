import { defineStore } from "pinia";
import { ref } from "vue";

type ApiResponse<T> = {
  [key: string]: T[];
}

// Create a factory function that returns a new store instance
export const createItemsStore = (storeKey?: string) => {
  // Use a unique id for each store instance
  const uniqueId = storeKey ? storeKey : `items-store-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return defineStore(uniqueId, () => {
    const error = ref<Error | null>(null);
    const items = ref<unknown[] | undefined>(undefined);
    
    const fetchData = <T>(url: URL, dataKey: string = "questions") => {
        fetch(url)
          .then((response) => {
            if (!response.ok) {
                error.value = new Error('Network response was not ok');
            }

            return response;
        }).then((response) => response.json()).then((data: ApiResponse<T>) => {
          items.value = data[dataKey];
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


export default createItemsStore;