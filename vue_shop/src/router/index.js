import Vue from 'vue'
import VueRouter from 'vue-router'
//导入登录组件
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  //路由重定向
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path:'/home',component:Home }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫(控制访问权限)
// 如果用户没有登录而是直接通过URL访问特定页面，需要重新导航到登录页面
// 为路由对象，添加 beforeEach 导航守卫
router.beforeEach((to,from,next) =>{
  // to 将要访问的路径
  // from代表从那个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行 next('/login) 强制跳转到login页面
  if(to.path === '/login') return next();
  // 获取token(token已经存到sessionStirage)
  const tokenStr = window.sessionStorage.getItem('token')
  // 没有toen强制跳转到登录页面
  if(!tokenStr) return next('/login')
  next()
})


export default router
