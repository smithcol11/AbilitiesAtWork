import { createRouter, createWebHistory } from "vue-router";

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
      path: "/ViewAllJobs",
      name: "ViewAllJobs",
      component: () => import("../components/ViewAllJobs.vue"),
    },
  ],
});
export default router;
