import type { Question } from "@/types/Question";
import { defineStore } from "pinia";
import { ref } from "vue";

type QuestionResponse = {
  questions: Question[];
}

export const useQuestionsStore = defineStore("QuestionsStore", () => {
    const error = ref<Error | null>(null);
    const items = ref<Question[] | undefined>(undefined);
    
      const fetchData = (url: URL) => {
          fetch(url)
            .then((response) => {
              if (!response.ok) {
                  error.value = new Error('Network response was not ok');
              }

              return response;
          }).then((response) => response.json()).then((data: QuestionResponse) => {
            items.value = data.questions;
          }).catch((err) => {
            error.value = new Error('There has been a problem with your fetch operation: ' + err);
        });
      }

    return {
        items,
        error,
        fetchData
    };
});

export default useQuestionsStore;