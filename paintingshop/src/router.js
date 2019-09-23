import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import detail from './views/detail.vue'
import mycar from './views/mycar.vue'
import myorder from './views/myorder.vue'
import echarts from './views/echarts.vue'
import release from './views/release.vue'
// import statistics from './views/statistics.vue'
import regist from './views/regist.vue'
import login from './views/login.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isLogin: false//不需要登录就可以查看的页面
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail,
      meta: {
        isLogin: false
      }
    },
    
    {
      path: '/regist',
      name: 'regist',
      component: regist,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        isLogin: false
      }
    },
    {
      path: '/mycar',
      name: 'mycar',
      meta:{
      title:'mycar',
      roles:['normal'],
      isLogin: true
      },
      component: mycar
    },
    {
      path: '/myorder',
      name: 'myorder',
      meta:{
        title:'myorder',
        roles:['normal'],
        isLogin: true
        },
      component: myorder
    },
    {
      path: '/echarts',
      name: 'echarts',
      meta:{
        title:'echarts',
        roles:['admin'],
        isLogin: true
        },
      component: echarts
    },
    {
      path: '/release',
      name: 'release',
      meta:{
        title:'release',
        roles:['admin'],
        isLogin: true
        },
      component: release
    },
    { path: '*', redirect: '/404', hidden: true }
   
  ]
})

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap=[
  
  
]
