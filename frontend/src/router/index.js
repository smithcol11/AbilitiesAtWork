import { createRouter, createWebHistory } from "vue-router";
import { useAuthenticationStore } from "../stores/AuthenticationStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/clientMenu",
      name: "clientMenu",
      component: () => import("../views/ClientMenu.vue"),
    },
    {
      path: "/jobMenu",
      name: "jobMenu",
      component: () => import("../views/JobMenu.vue"),
    },
    {
      path: "/JobAdd",
      name: "JobAdd",
      component: () => import("../components/AddJob.vue"),
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/Search.vue"),
    },
    {
      path: "/match",
      name: "match",
      component: () => import("../views/Match.vue"),
    },
    {
      path: "/logout",
      name: "logout",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
    },
  ],
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthenticationStore();

  //return to '/login' if user or admin is not authorized
  if (authRequired && (await auth.validateJWT())) {
    return "/login";
  }
});

export default router;
