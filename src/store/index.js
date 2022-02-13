import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false,
    email: '',
    username: '',
    role: ''
  },
  mutations: {
    changeLogin (state) {
      state.isLogged = !state.isLogged
    },
    changeLoginParameter (state, value) {
      state.isLogged = value
    }
  },
  actions: {},
  modules: {}
})
