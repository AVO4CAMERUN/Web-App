// Login module for store
// Modulo login dello store conserva le informazione inerenti al utente utilizzatore dell app

// import { mapGetters } from 'vuex'
import { loginService as ls } from '@/servises/login.services'

// Restore code on to login module in del localStorage
let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).login
}

// State of login module
const state = {
  isLogged: false,
  refreshToken: null,
  accessToken: null,
  username: '',
  password: '',
  email: '',
  role: '',
  imgProfile: null,
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
  },
  async refresh ({ state }) {
    return await ls.refresh(state.refreshToken)
  },
  async logout ({ state }) {
    return await ls.logout(state.refreshToken)
  }
  /*
  (piu avanti sposare le implementazioni qua meglio per il componeti e per refresh)
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // wait for `actionA` to finish
    commit('gotOtherData', await getOtherData())
  } */
}

const getters = {}
export const login = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
