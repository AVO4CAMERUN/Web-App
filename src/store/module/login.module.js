// Login module for store --> (modulo login dello store conserva le informazione inerenti al utente utilizzatore dell app)

import { loginService as ls } from '@/servises/login.services'
import { accountService as as } from '@/servises/account.services'

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
  role: null,
  firstname: null,
  lastname: null,
  id_class: null,
  imgProfile: null,
  ...restore
}

//
const mutations = {
  setLogin: (state, payload) => { state.isLogged = payload.value },
  setRefreshToken: (state, payload) => { state.refreshToken = payload?.refreshToken },
  setAccessToken: (state, payload) => { state.accessToken = payload?.accessToken },
  setEmail: (state, payload) => { state.email = payload?.email },
  setRole: (state, payload) => { state.role = payload?.role },
  setUsername: (state, payload) => { state.username = payload?.username },
  setPassword: (state, payload) => { state.password = payload?.password },
  setImgProfile: (state, payload) => { state.imgProfile = payload?.img_profile },
  setFirstname: (state, payload) => { state.firstname = payload?.firstname },
  setLastname: (state, payload) => { state.lastname = payload?.lastname }
}

//
const actions = {
  async login ({ state, dispatch, commit }) {
    // Save data user
    const user = (await dispatch('fetchUser'))[0]
    commit('setEmail', user)
    commit('setRole', user)
    commit('setUsername', user)
    commit('setFirstname', user)
    commit('setLastname', user)
    commit('setImgProfile', user)

    // Extract data on body and delete password
    const login = await dispatch('fetchLogin')
    commit('setPassword', { password: null })
    commit('setRefreshToken', login)
    commit('setAccessToken', login)

    // Change layout
    if (login?.accessToken) commit('setLogin', { value: true })
    else return new Error('!200')
  },
  async refresh ({ state }) {
    return await ls.refresh(state.refreshToken)
  },
  async logout ({ state, commit }) {
    const response = await ls.logout(state.refreshToken)

    // Remove saved refreshToken and accessToken
    commit('setRefreshToken', { refreshToken: null })
    commit('setAccessToken', { accessToken: null })
    commit('setEmail', { email: null })
    commit('setRole', { role: null })
    commit('setUsername', { username: null })
    commit('setFirstname', { firstname: null })
    commit('setLastname', { lastname: null })
    commit('setImgProfile', { img_profile: null })
    commit('setLogin', { value: false })

    if (response.status !== 200) return new Error('!200')
  },
  async fetchUser ({ state }) {
    return await as.getFilterdAccount(`username=[${state.username}]`)
      .then((response) => {
        if (response.status === 200) return response.json()
      })
  },
  async fetchLogin ({ state }) {
    return await ls.login(state.username, state.password)
      .then((response) => {
        if (response.status === 200) return response.json()
      })
  }
}

const getters = {}
export const login = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
