import './assets/main.css';

import '@fontsource-variable/plus-jakarta-sans';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import routerOptions from './router/routerOptions';

const app = createApp(App)

app.use(createPinia())
    .use(createRouter(routerOptions))

app.mount('#app')
