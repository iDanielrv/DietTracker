import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/varejo',
      name: 'varejo',
      component: () => import('../views/RetailClients.vue')
    },
    {
      path: '/atacado',
      name: 'atacado',
      component: () => import('../views/WholesaleClients.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue')
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
