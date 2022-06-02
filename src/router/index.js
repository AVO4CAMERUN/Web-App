import { createRouter, createWebHistory } from 'vue-router'
import Inscriptions from '@/views/Inscriptions.vue'
import Search from '@/views/Search.vue'
import MyClasses from '@/views/teachers/MyClasses'
import CreatedClasses from '@/views/CreatedClasses'
import CreatedCourses from '@/views/CreatedCourses'
import Class from '@/views/Class'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Course from '@/views/Course.vue'
import store from '@/store/index'

const routes = [
  {
    path: '/',
    component: Inscriptions
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
    path: '/inscriptions',
    name: 'inscriptions',
    component: Inscriptions
  },
  {
    path: '/myclasses',
    name: 'myclasses',
    component: MyClasses
  },
  {
    path: '/createdcourses',
    name: 'createdcourses',
    component: CreatedCourses
  },
  {
    path: '/createdclasses',
    name: 'createdclasses',
    component: CreatedClasses
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
  const role = store.state.login.role

  if ((to.name === 'createdcourses' || to.name === 'createdclasses') && role === 'STUDENT') return next('/settings') // da cambiare in pagina di errore
  if (to.name === 'myclasses' && role === 'STUDENT') return next('/settings') // da cambiare in pagina di errore

  if (loggedIn && !authRequired) return next('/inscriptions')
  if (!loggedIn && authRequired) return next('/login')
  next()
})

export default router
