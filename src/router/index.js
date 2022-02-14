import { createRouter, createWebHistory } from 'vue-router'
import MyCourses from '../views/MyCourses.vue'
import Search from '../views/Search.vue'
import MyClasses from '../views/prof/MyClasses.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    component: MyCourses
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/mycourses',
    name: 'mycourses',
    component: MyCourses
  },
  {
    path: '/myclasses',
    name: 'myclasses',
    component: MyClasses
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Methods to redirect to login page if not logged in and trying to access a restricted page
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('refreshToken') // non vuex per f5

  if (!authRequired && store.state.isLogged && loggedIn) return next('/mycourses')
  if (authRequired && !loggedIn) return next('/login')
  next()
})

export default router
