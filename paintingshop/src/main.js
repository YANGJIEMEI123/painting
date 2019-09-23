import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import axios from 'axios'

import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'
import aside from '@/components/aside.vue'

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



// 向原型上追加通用方法
Vue.prototype.axios = axios;
Vue.component('bottoms',bottom)
Vue.component("tops", top)
Vue.component("asides", aside)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



router.beforeEach((to, from, next) => {

  let getFlag =store.getters.userType /* 这里是判断用户是否登录过，因为在用户登录后会在localStroage内存储Flag=isLogin */
 console.log("aaaaaa")
  console.log(to);
  // console.log(to.meta.roles[0]);

  if(to.meta.isLogin==false){
    next();
  }else if(to.meta.isLogin==true){
    if(to.meta.roles[0]=="normal"&&getFlag==1){
      // console.log(getFlag);
      next();
    }
    else if(to.meta.roles[0]=="admin"&&getFlag==2){
        next()
      }
      else{
        console.log("没有权限")
        return
      }
  }
 

})

router.afterEach(route => {
  window.scroll(0, 0)
})