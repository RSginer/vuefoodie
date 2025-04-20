import HomePage from "@/pages/HomePage.vue";
import type { RouterOptions } from "@/router/index";

const routes = [
        {
            path: "/",
            component: HomePage
        },
];

export default {
    routes: routes
} as RouterOptions;