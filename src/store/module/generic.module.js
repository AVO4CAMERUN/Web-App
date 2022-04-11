// Generic module for store

let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).course
}

const state = {
  darkTheme: false,
  ...restore
}

const mutations = {
  setDarkTheme: (state, payload) => { state.darkTheme = payload?.darkTheme }
}

const actions = {}

export const generic = {
  namespaced: true,
  state,
  actions,
  mutations
}
