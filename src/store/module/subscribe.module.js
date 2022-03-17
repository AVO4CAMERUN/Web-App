// Subscription module for store

// import { mapGetters } from 'vuex'
import { subscribeService as ss } from '@/servises/subscribe.service'

// Restore code on to login module in del localStorage
let restore = {}
if (localStorage.getItem('avo4cam')) {
  restore = JSON.parse(localStorage.getItem('avo4cam')).subscribe
}

// State of login module
const state = {
  ...restore
}

//
const mutations = {
}

//
const actions = {
}

const getters = {}
export const course = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
