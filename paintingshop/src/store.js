
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
const actions = {}
const state = {
  user_account: localStorage.getItem('user_account'),
  // isLogin : localStorage.getItem('isLogin'),
  flag:localStorage.getItem('usertype')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
  userAccount: (state) => state.user_account,
  // isLogin :(state) => state.isLogin,
  userType:(state)=>state.flag
}
const mutations = {
  handleUserAccount: (state, user_account) => {
      state.user_account = user_account
      localStorage.setItem('user_account', user_account)  
  },
  // isLogin(state,status){
  //   state.isLogin = status;
  //   localStorage.setItem('isLogin', status);
  // },
  handleFlag: (state, flag) => {
    state.flag = flag;
    localStorage.setItem('usertype', flag) ;
},
  LoginOut (state){
    localStorage.clear();
    state.user_account = '';
    // state.isLogin = false;
    state.flag=""
  },
 
}
 
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store;

