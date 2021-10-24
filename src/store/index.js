import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 是否加载中
    loading: false,
    // 账户名称
    username: null,
    // 登录状态
    isLogin: false,
    // 设备
    deviceId: []
  },
  mutations: {
    // 改变登录转态
    chageLogin(state) {
      state.isLogin =  !state.isLogin;
    },
    // 改变加载状态
    chageLoad(state) {
      state.loading =  !state.loading;
    },
    // 记录用户账户
    chageUserName(state,payload = {username: null}) {
      state.username = payload.username;
    },
    // 添加设备信息
    addDeviceId(state,payload) {
      state.deviceId = payload;
    }
  },
  actions: {

  },
})
