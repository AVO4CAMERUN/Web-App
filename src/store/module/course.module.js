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
const mutations = {}

//
const actions = {}

const getters = {}
export const course = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
