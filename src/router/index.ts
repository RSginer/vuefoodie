import { computed, defineComponent, h, inject, ref, type App, type Component } from "vue";

const RouterKey = Symbol("RouterKey");

interface Route {
    path: string;
    component: Component;
}

export interface RouterOptions {
    routes: Route[];
}

interface ParsedPath {
    path: string;
    params: Record<string, string>;
    query: Record<string, string | number>;
}

function parsePath(url: string): ParsedPath {
    const [pre, _query] = url.split("?");
    const path = pre.replace(
        `${window.location.protocol}//${window.location.host}`,
        "",
    );
    const queryParams = new URLSearchParams(_query || "");
    const query: Record<string, string | number> = {};

    queryParams.forEach((value, key) => {
        query[key] = isNaN(Number(value)) ? value : Number(value);
    });

    return { path, params: {}, query };
}

// Function to match route patterns and extract params
function matchRoute(routePath: string, currentPath: string): { matched: boolean; params: Record<string, string> } {
    // Special case for root path
    if (routePath === "/" && (currentPath === "/" || currentPath === "")) {
        return { matched: true, params: {} };
    }

    const routeSegments = routePath.split('/').filter(Boolean);
    const pathSegments = currentPath.split('/').filter(Boolean);
    
    // For static routes (without params), the segment count must match
    if (routeSegments.length !== pathSegments.length && !routePath.includes(':')) {
        return { matched: false, params: {} };
    }
    
    const params: Record<string, string> = {};
    
    // Check each segment
    for (let i = 0; i < routeSegments.length; i++) {
        const routeSegment = routeSegments[i];
        const pathSegment = pathSegments[i];
        
        // If this segment doesn't exist in the path
        if (pathSegment === undefined) {
            return { matched: false, params: {} };
        }
        
        // If this is a parameter segment (starts with :)
        if (routeSegment.startsWith(':')) {
            const paramName = routeSegment.substring(1);
            params[paramName] = pathSegment;
            continue;
        }
        
        // For regular segments, they must match exactly
        if (routeSegment !== pathSegment) {
            return { matched: false, params: {} };
        }
    }
    
    return { matched: true, params };
}

export function createRouter(options: RouterOptions) {
    const { routes } = options;
    const { pathname, search } = window.location;
    const parsed = parsePath(pathname + search);
    const route = ref(parsed);
    const routePath = computed(() => route.value.path);
    const routeQuery = computed(() => route.value.query);
    const routeParams = computed(() => route.value.params);

    const router = {
        app: null as App | null,
        
        // Current route state
        currentRoute: route,
        
        // Route accessors
        currentPath: routePath,
        currentParams: routeParams,
        currentQuery: routeQuery,
        
        // Navigation method
        push(path: string) {
            window.history.pushState({}, "", path);
            // Update the current route
            const parsed = parsePath(path);
            route.value = parsed;
            this.updateRouteParams();
        },
        
        // Method to extract and update params
        updateRouteParams() {
            for (const r of routes) {
                const { matched, params } = matchRoute(r.path, route.value.path);
                if (matched) {
                    route.value.params = params;
                    break;
                }
            }
        },
        
        install(app: App) {
            this.app = app;
            app.provide(RouterKey, this);
            app.config.globalProperties.$vuefoodieRouter = this;

            // Initialize route params on first load
            this.updateRouteParams();

            const RouterView = defineComponent({
                name: "RouterView",
                setup() {
                    const currentComponent = computed(() => {
                        for (const r of routes) {
                            const { matched } = matchRoute(r.path, routePath.value);
                            if (matched) {
                                return r.component;
                            }
                        }
                        return null;
                    });

                    return () => {
                        const RouteComponent = currentComponent.value;
                        return RouteComponent ? h("div", {
                            class: "vuefoodie-router-view",
                        },
                            h(RouteComponent),
                        ) : null;
                    };
                },
            });

            // Handle back/forward browser navigation
            window.addEventListener('popstate', () => {
                const { pathname, search } = window.location;
                const parsed = parsePath(pathname + search);
                route.value = parsed;
                this.updateRouteParams();
            });

            app.component("RouterView", RouterView);
        }
    }

    return router;
}

export function useRouter() {
    const router = inject(RouterKey) as ReturnType<typeof createRouter>;
    if (!router) {
        throw new Error("useRouter() must be used within a component that is a child of RouterView");
    }
    
    return router;
}
// Add a composable function to access route parameters in Vue components
export function useRoute() {
    const router = inject(RouterKey) as ReturnType<typeof createRouter>;
    if (!router) {
        throw new Error("useRoute() must be used within a component that is a child of RouterView");
    }
    
    return {
        // Current route
        route: router.currentRoute,
        
        // Route data
        path: router.currentPath,
        params: router.currentParams,
        query: router.currentQuery,
        
        // Navigation
        push: (path: string) => router.push(path)
    };
}