
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const actions = {}
const state = {
  user_account: localStorage.getItem('user_account'),
  flag:localStorage.getItem('usertype'),
  onlogin:localStorage.getItem('OnLogin')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userAccount: (state) => state.user_account,
  isLogin :(state) => state.isLogin,
  userType:(state)=>state.flag,
  loginstatus:(state)=>state.onlogin
}
const mutations = {
  handleUserAccount: (state, user_account) => {
      state.user_account = user_account
      localStorage.setItem('user_account', user_account)  
  },
  handleFlag: (state, flag) => {
    state.flag = flag;
    localStorage.setItem('usertype', flag) ;
},
OnLogin:(state,status)=>{
  state.onlogin = status;
  localStorage.setItem('OnLogin', status)

},
  LoginOut (state){
    localStorage.clear();
    state.user_account = '';
    state.flag=null,
    state.onlogin=false
  }
 
}
 
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store;

