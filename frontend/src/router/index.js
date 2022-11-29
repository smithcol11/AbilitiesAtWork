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
    {
      path: '/userlogin',
      name: 'userlogin',
      component: () => import('../views/UserLogin.vue')
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('../views/AdminLogin.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue')
    }
  ]
})
/*
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/userlogin','/adminlogin'];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.user) {
    console.log("hjere");
      auth.returnUrl = to.fullPath;
      return '/login';
  }
});*/
export default router