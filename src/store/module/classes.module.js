// Class module for store

// import { mapGetters } from 'vuex'
import { classesService as cs } from '@/servises/classes.services'

// Restore code on to login module in del localStorage
let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).classes
}

// State of login module
const state = {
  id: 0,
  name: '',
  img: '',
  students: [],
  teachers: [],
  ...restore
}

//
const mutations = {
  setId: (state, payload) => { state.id = payload?.id },
  setName: (state, payload) => { state.name = payload?.name },
  setImg: (state, payload) => { state.img = payload?.img_cover },
  setStudents: (state, payload) => { state.students = payload?.students },
  setTeachers: (state, payload) => { state.teachers = payload?.teachers }
}

//
const actions = {
  async setCurrentClass ({ commit, dispatch }, filter) {
    const response = await dispatch('fetchClasses', filter)
    commit('setId', response[0])
    commit('setName', response[0])
    commit('setImg', response[0])
  },
  async fetchClasses ({ state, rootState }, filter) {
    return await cs.getClassesByFilter(filter, rootState.login.accessToken)
      .then((response) => {
        if (response.status === 200) return response.json()
      })
  }
}

const getters = {}
export const classes = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
