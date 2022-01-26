import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogged: false
  },
  mutations: {
    changeLogin (state) {
      state.isLogged = !state.isLogged
    }
  },
  actions: {
  },
  modules: {
  }
})
