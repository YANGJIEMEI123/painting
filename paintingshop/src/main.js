import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'

import "./assets/iconfont/bottom/iconfont.css"
import "./assets/iconfont/logo/iconfont.css"
import echarts from 'echarts'

import  'echarts/theme/dark.js'
import  'echarts/theme/macarons.js'
import  'echarts/theme/infographic'
import  'echarts/theme/roma'
import  'echarts/theme/shine'
import  'echarts/theme/vintage'



Vue.prototype.$echarts = echarts

Vue.prototype.axios=axios;

Vue.use(ElementUI);//启用
Vue.config.productionTip = false

//定义全局axios 的公用服务端口
axios.defaults.baseURL = "http://localhost:8081";
//向原型上追加通用方法
// 定义全局axios 的公用服务端口
axios.defaults.baseURL = "http://localhost:8081";
// 向原型上追加通用方法
Vue.prototype.axios = axios;
Vue.component('bottoms',bottom)
Vue.component("tops", top)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {
  let getFlag = localStorage.getItem('Flag') /* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin */
  if (getFlag === 'isLogin') { /* 如果存在Flag并且为isLogin意味着用户登录，这时修改vux内state下isLogin的状态 */
    store.state.isLogin = true
    next()
    if (!to.meta.isLogin) { /* 如果在有登录状态的情况下前往不需要权限的路由路径，则判定为退出登录，进行提示并跳转登录页 */
      Toast.info('退出成功')
      next({
        path: '/Login'
      })
    }
  } else {
    if (to.meta.isLogin) { /* 如果没有登录状态且要去往需要权限的路径时跳转登录页并进行提示 */
      next({
        path: '/Login'
      })
      Toast.info('请先登录')
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  window.scroll(0, 0)
})