import { createRouter, createWebHistory } from 'vue-router'
import MyCourses from '@/views/MyCourses.vue'
import Search from '@/views/Search.vue'
import MyClasses from '@/views/teachers/MyClasses'
import MyClass from '@/views/students/MyClass'
import Class from '@/views/Class'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Course from '@/views/Course.vue'
import store from '@/store/index'

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
    path: '/myclass',
    name: 'myclass',
    component: MyClass
  },
  {
    path: '/class',
    name: 'class',
    component: Class,
    props: true
  },
  {
    path: '/course',
    name: 'course',
    props: true,
    component: Course
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
  const authRequired = !['/login', '/register'].includes(to.path)
  const loggedIn = store.state.login.isLogged

  if (loggedIn && !authRequired) return next('/mycourses')
  if (!loggedIn && authRequired) return next('/login')
  next()
})

export default router
