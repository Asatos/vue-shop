import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'
import Login from '../components/login/Login'
import Users from '../components/users/Users.vue'
import Roles from '../components/roles/Roles'
import Permits from '../components/permits/Permits'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/users',
          name: 'users',
          component: Users
        }, {
          path: '/roles',
          name: 'roles',
          component: Roles
        }, {
          path: '/permits',
          name: 'permits',
          component: Permits
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

export default router
