import './assets/main.css';

import '@fontsource-variable/plus-jakarta-sans';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import HomePage from './pages/HomePage.vue';
import { createRouter } from './router';

const app = createApp(App)

app.use(createPinia()).use(createRouter({
    routes: [
        {
            path: "/",
            component: HomePage
        }]
}))

app.mount('#app')
