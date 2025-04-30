import { ref, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export const useItemInfo = <T>(itemKey: MaybeRefOrGetter<string>) => {
  const loading = ref(true)
  const item = ref<T | undefined>(undefined)

  watchEffect(() => {
    fetch(`${import.meta.env.VITE_FOOD_API_URL}/${toValue(itemKey)}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        item.value = data.product
        console.log('Fetched data: ', data)
        loading.value = false
      })
      .catch((error) => {
        console.error('Error fetching data: ', error)
        loading.value = false
      })
  })

  return {
    item,
    loading,
  }
}
