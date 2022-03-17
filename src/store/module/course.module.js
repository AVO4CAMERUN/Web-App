// Courses module for store

// import { mapGetters } from 'vuex'
import { coursesService as cs } from '@/servises/course.services'

// Restore code on to login module in del localStorage
let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).course
}

// State of login module
const state = {
  id: 0,
  name: '',
  img: '',
  ...restore
}

//
const mutations = {
  setId: (state, payload) => { state.id = payload?.id_course },
  setName: (state, payload) => { state.name = payload?.name },
  setImg: (state, payload) => { state.img = payload?.img_cover }
}

//
const actions = {
  async setCurrentCourse ({ commit, dispatch }, filter) {
    const response = await dispatch('fetchCourses', `?id_course=[${filter}]`)
    commit('setId', response[0])
    commit('setName', response[0])
    commit('setImg', response[0])
  },
  async fetchCourses ({ state }, filter) {
    return await cs.getCoursesByFilter(filter)
      .then((response) => {
        if (response.status === 200) return response.json()
      })
  }
}

const getters = {}
export const course = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
