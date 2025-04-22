import HomePage from "@/pages/HomePage.vue";
import type { RouterOptions } from "@/router/index";

const routes = [
        {
            path: "/",
            component: HomePage
        },
        // Example route with path parameter
        {
            path: "/product/:id",
            component: HomePage
        },
        // Example route with multiple parameters
        {
            path: "/category/:categoryId/product/:productId",
            component: HomePage
        },
];

export default {
    routes: routes
} as RouterOptions;