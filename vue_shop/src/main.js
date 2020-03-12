//入口文件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import './plugins/element.js'
//vue.runtime.esm.js?2b0e:5106 Uncaught TypeError: Cannot read property 'install' of undefined
// 虽然全局导入比较emmm 但是容错率高hhh
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'

//
import axios from 'axios'
// 把包挂载到vue原型对象上，这样vue的每一个组件都可以通过this直接访问到http从而发起axios请求
Vue.prototype.$http= axios
//设置请求的根路径
axios.defaults.baseURL = 'http://106.12.11.162:8888/api/private/v1/login'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // 将路由挂载在 vue 实例上
  router,
  // 通过 render 函数将App根组件渲染到页面上
  render: h => h(App)
}).$mount('#app')
