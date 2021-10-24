import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home/Home.vue';
const SingIn = () => import('../views/SingIn/SingIn.vue');
const Login  = () => import('../views/SingIn/cpn/Login.vue');
const Register  = () => import('../views/SingIn/cpn/Register.vue');
const Entrance = () => import('../views/Entrance/Entrance.vue');
const Map = () => import('../views/Map/Map.vue');
const User = () => import('../views/User/User.vue')

Vue.use(VueRouter)



/**
 * Home  首页
 * SingIn 登录注册
 *    Login  登录
 *    Register 注册
 * Entrance 功能模块入口
 * Map  查找定位
 * User 个人中心
 */


const routes = [
  {
    path: '/',
    redirect: {
      name: 'Home',
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: "/singIn",
    name: "SingIn",
    component: SingIn,
    children: [
      {
        path: 'login',
        name: "Login",
        component: Login
      },
      {
        path: 'register',
        name: "Register",
        component: Register
      }
    ]
  },
  {
    path: "/entrance",
    name: "Entrance",
    component: Entrance
  },
  {
    path: "/map",
    name: "Map",
    component: Map
  },
  {
    path: "/user",
    name: "User",
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
