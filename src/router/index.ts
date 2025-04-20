import { computed, defineComponent, h, ref, type App, type Component } from "vue";

const RouterKey = Symbol("RouterKey");

interface Route {
    path: string;
    component: Component;
}

interface RouterOptions {
    routes: Route[];
}

interface ParsedPath {
    path: string;
    query: Record<string, string | number>;
}

function parsePath(url: string): ParsedPath {
    const [pre, _query] = url.split("?");
    const path = pre.replace(
        `${window.location.protocol}//${window.location.host}`,
        "",
    );
    const queryParams = new URLSearchParams(_query);
    const query: Record<string, string | number> = {};

    queryParams.forEach((value, key) => {
        query[key] = isNaN(Number(value)) ? value : Number(value);
    });

    return { path, query };
}

export function createRouter(options: RouterOptions) {
    const { routes } = options;
    const { pathname, search } = window.location;
    const parsed = parsePath(pathname + search);
    const route = ref(parsed);
    const routePath = computed(() => route.value.path);
    // const routeQuery = computed(() => route.value.query);

    const router = {
        app: null as App | null,
        install(app: App) {
            this.app = app;
            app.config.globalProperties.$router = this;
            app.provide(RouterKey, this);

            const RouterView = defineComponent({
                name: "RouterView",
                setup() {
                    const currentComponent = computed(() => {
                        const matchedRoute = routes.find(
                            (r) => r.path === routePath.value,
                        );
                        return matchedRoute ? matchedRoute.component : null;
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

            app.component("RouterView", RouterView);
        }
    }

    return router;
}