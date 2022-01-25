import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MyCourses from '../views/MyCourses.vue'
import Search from '../views/Search.vue'
import MyClasses from '../views/prof/MyClasses.vue'
import Settings from '../views/Settings.vue'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home
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
  const loggedIn = localStorage.getItem('user')// no vuex

  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
export default router
