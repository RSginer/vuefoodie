import type { Question } from '@/types/Question';
import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue';

type QuestionResponse = {
  questions: Question[];
}

const useQuestions = (apiUrl: MaybeRefOrGetter<string>, count: MaybeRefOrGetter<number>) => {
  const error = ref<Error | null>(null);
  const items = ref<Question[] | undefined>(undefined);

watchEffect(() => {
  if (apiUrl) {
      const url = new URL(toValue(apiUrl));

      if (count) {
        url.searchParams.append('count', toValue(count).toString());
      }
      
      fetch(url.toString())
        .then((response) => {
          if (!response.ok) {
            error.value = new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: QuestionResponse) => {
          items.value = data.questions;
        })
        .catch((err) => {
          items.value = undefined;
          error.value = new Error(err);

          // Handle the error
          console.error('There has been a problem with your fetch operation:', err);
        });
  }
});

return {
  error,
  items,
}

}


export default useQuestions;