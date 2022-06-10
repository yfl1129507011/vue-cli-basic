// 整个项目的入口文件

// 引入Vue
import Vue from 'vue'

// 引入App组件，它是所有组件的父组件
import App from './App.vue'

// 引入ElementUI组件库
// import ElementUI from 'element-ui'
// 引入ElementUI全部样式
// import 'element-ui/lib/theme-chalk/index.css'

// Element按需引入
import {Button, Row, DatePicker} from 'element-ui'

// 关闭vue的生产提示
Vue.config.productionTip = false

// 应用ElementUI
// Vue.use(ElementUI)
Vue.component(Button.name, Button)
Vue.component('el-row', Row)
Vue.component(DatePicker.name, DatePicker)
/* 或写为
 * Vue.use(Button)
 */

new Vue({
  // 将App组件放入容器中
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this   // 安装全局事件总线
  }
}).$mount('#app')
