import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/clientMenu',
      name: 'clientMenu',
      component: () => import('../views/ClientMenu.vue')
    },
    {
      path: '/jobMenu',
      name: 'jobMenu',
      component: () => import('../views/JobMenu.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue')
    },
    {
      path: '/match',
      name: 'match',
      component: () => import('../views/Match.vue')
    },
    {
      path: '/logout',
      name: 'logout',
    },
  ]
})

export default router