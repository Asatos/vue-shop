import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import Login from '../components/login/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
