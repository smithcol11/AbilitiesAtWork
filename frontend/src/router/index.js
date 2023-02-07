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
      path: "/searchJobs",
      name: "searchJobs",
      component: () => import("../components/SearchJobs.vue"),
    },
    {
      path: "/searchClients",
      name: "searchClient",
      component: () => import("../components/SearchClient.vue"),
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
    {
      path: "/AddJob",
      name: "AddJob",
      component: () => import("../components/AddJob.vue"),
    },
    {
      path: "/RemoveJob",
      name: "RemoveJob",
      component: () => import("../components/RemoveJob.vue"),
    },
    {
      path: "/EditJob",
      name: "EditJob",
      component: () => import("../components/EditJob.vue"),
    },
    {
      path: "/AddClient",
      name: "/AddClient",
      component: () => import("../components/AddClient.vue"),
    },
    {
      path: "/RemoveClient",
      name: "/RemoveClient",
      component: () => import("../components/RemoveClient.vue"),
    },
    {
      path: "/EditClient",
      name: "/EditClient",
      component: () => import("../components/EditClient.vue"),
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
