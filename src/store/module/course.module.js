// Login module for store
// Modulo login dello store conserva le informazione inerenti al utente utilizzatore dell app

// import { mapGetters } from 'vuex'
import { coursesService as cs } from '../servises/course.services'

// Restore code on to login module in del localStorage
let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).course
}

// State of login module
const state = {
  ...restore
}

//
const mutations = {
  setLogin: (state, payload) => { state.isLogged = payload.value },
  setRefreshToken: (state, payload) => { state.refreshToken = payload.refreshToken },
  setAccessToken: (state, payload) => { state.accessToken = payload.accessToken },
  setEmail: (state, payload) => { state.email = payload.email },
  setRole: (state, payload) => { state.role = payload.role },
  setUsername: (state, payload) => { state.username = payload.username },
  setPassword: (state, payload) => { state.password = payload.password }
}

//
const actions = {
  async login ({ state }) {
    return await ls.login(state.username, state.password)
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
