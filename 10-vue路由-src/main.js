// 整个项目的入口文件

// 引入Vue
import Vue from 'vue'

// 引入App组件，它是所有组件的父组件
import App from './App.vue'

// 引入路由插件
import VueRouter from 'vue-router'
import router from './router'

// 关闭vue的生产提示
Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  // 将App组件放入容器中
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this   // 安装全局事件总线
  },
  router: router
}).$mount('#app')
