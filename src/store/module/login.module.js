// Login module for store
// import { mapGetters } from 'vuex'
import { loginService as ls } from '@/servises/login.services'

/*
  Do cumentare sul codice
*/
const state = {
  isLogged: false,
  refreshToken: null,
  accessToken: null,
  username: '',
  password: '',
  email: '',
  role: ''
}

const getters = {}

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
  async login ({ state, commit }) {
    return await ls.login(state.username, state.password)
  },
  async refresh ({ state, commit }) {
    return await ls.refresh(state.refreshToken)
  },
  async logout ({ state, commit }) {
    return await ls.logout(state.refreshToken)
  }
  /* async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // wait for `actionA` to finish
    commit('gotOtherData', await getOtherData())
  } */
}

export const login = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
