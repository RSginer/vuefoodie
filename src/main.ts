import './assets/main.css'

import '@fontsource-variable/plus-jakarta-sans'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import routerOptions from './router/routerOptions'
import activeStores from './store/activeStores'

const app = createApp(App)

app
  .use(
    createPinia().use(({ store }) => {
      activeStores.set(store.$id, store)
    }),
  )
  .use(createRouter(routerOptions))

app.config.globalProperties.$appName = 'VueFoodie'
app.config.globalProperties.$appVersion = '1.0.0'
app.config.errorHandler = (err, vm, info) => {
  console.error('Error:', err)
  console.error('Component:', vm)
  console.error('Info:', info)
  // Optionally, you can log the error to an external service
  // logErrorToService(err, vm, info)
}

app.mount('#app')
