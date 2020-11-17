// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// element-ui
import ElementUI, { Message, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 自定义公共样式
import './assets/common.css'
// axios 基准请求路径
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 全局引入axios
Vue.prototype.$axios = axios
// 全局引入MessageBox
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
// axios 请求拦截器
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  if (response.data.meta.status === 401) {
    MessageBox.confirm('登录信息超时,请重新登录!', '登录超时', {
      confirmButtonText: '跳转登录页面',
      callback: action => {
        window.location.href = '/login'
      }
    })
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
