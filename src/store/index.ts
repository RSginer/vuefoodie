import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("store", () => {
    const searchQuery = ref<string>("");

    return {
        searchQuery,
    };
});