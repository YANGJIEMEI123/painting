import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import detail from './views/detail.vue'
import mycar from './views/mycar.vue'
import myorder from './views/myorder.vue'
import statistics from './views/statistics.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/mycar',
      name: 'mycar',
      component: mycar
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: statistics
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
