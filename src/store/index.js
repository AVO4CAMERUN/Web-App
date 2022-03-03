import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as login from '@/store/module/login.module'

export default createStore({
  modules: { ...login },
  plugins: [new VuexPersistence().plugin],
  state: {},
  mutations: {},
  actions: {}
})
