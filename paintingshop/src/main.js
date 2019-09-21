import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
<<<<<<< HEAD
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
=======
import axios from 'axios'
<<<<<<< HEAD

=======
>>>>>>> cc767a9d474c24123a143884ac646cc51698c956
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

>>>>>>> 1acbcba14e35dbb5225a79544818b4295d0a9a3b
import bottom from '@/components/bottom.vue'
import top from '@/components/top.vue'

import "./assets/iconfont/bottom/iconfont"
import echarts from 'echarts'
<<<<<<< HEAD
import axios from 'axios';
Vue.prototype.$echarts = echarts
=======
>>>>>>> 1acbcba14e35dbb5225a79544818b4295d0a9a3b

Vue.prototype.$echarts = echarts
Vue.prototype.axios=axios;

Vue.use(ElementUI);//启用
Vue.config.productionTip = false
<<<<<<< HEAD
//定义全局axios 的公用服务端口
axios.defaults.baseURL = "http://localhost:8081";
//向原型上追加通用方法
=======
// 定义全局axios 的公用服务端口
axios.defaults.baseURL = "http://localhost:8081";
// 向原型上追加通用方法
>>>>>>> 1acbcba14e35dbb5225a79544818b4295d0a9a3b
Vue.prototype.axios = axios;

Vue.component('bottoms',bottom)
Vue.component("tops", top)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
