import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue';

import { useQuestionsStore } from '@/store/questionsStore';
import { storeToRefs } from 'pinia';

const useQuestions = (apiUrl: MaybeRefOrGetter<string>, count: MaybeRefOrGetter<number>) => {
  const questionsStore = useQuestionsStore();
  const questionsStoreRefs = storeToRefs(questionsStore);
  
  watchEffect(() => {
    if (apiUrl) {
        const url = new URL(toValue(apiUrl));
        
        if (count) {
          url.searchParams.append('count', toValue(count).toString());
        }
        
        questionsStore.fetchData(url);
        
      
    }
  });

  return {
    error: questionsStoreRefs.error,
    items: questionsStoreRefs.items,
  }

}


export default useQuestions;
