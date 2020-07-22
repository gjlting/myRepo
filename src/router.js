import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      component: Main,
      meta: {
        title: 'Main'
      },
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('./views/Home.vue'),
          meta: {
            title: 'home'
          }
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
          meta: {
            title: 'about'
          }
        },
        {
          path: '/importExcel',
          name: 'importExcel',
          component: () => import('./views/ImportExcel.vue'),
          meta: {
            title: 'importExcel'
          }
        },
        {
          path: '/overview',
          name: 'overview',
          component: () => import('./views/Overview.vue'),
          meta: {
            title: 'overview'
          }
        },
        {
          path: '/pasteCopyImg',
          name: 'pasteCopyImg',
          component: () => import('./views/PasteCopyImg.vue'),
          meta: {
            title: 'pasteCopyImg'
          }
        },
      ]
    }
  ]
})
