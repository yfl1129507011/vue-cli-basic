// 整个项目的入口文件

// 引入Vue
import Vue from 'vue'

// 引入App组件，它是所有组件的父组件
import App from './App.vue'
import { mixin } from './mixin'
import plugins from './plugins'

// 关闭vue的生产提示
Vue.config.productionTip = false


// 全局混入
Vue.mixin(mixin)

// 使用插件
Vue.use(plugins)

new Vue({
  // 将App组件放入容器中
  render: h => h(App),
}).$mount('#app')
