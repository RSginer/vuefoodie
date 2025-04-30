import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export const useItemInfo = <T>(itemKey: MaybeRefOrGetter<string>) => {
  const loading = ref(true)
  const item = ref<T | undefined>(undefined)

  // Modified version of useItemInfo.ts that propagates errors
  watchEffect(async () => {
    try {
      loading.value = true
      const response = await fetch(`${import.meta.env.VITE_FOOD_API_URL}/${toValue(itemKey)}.json`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      item.value = data.product
    } finally {
      loading.value = false
    }
  })

  return {
    item,
    loading,
  }
}
