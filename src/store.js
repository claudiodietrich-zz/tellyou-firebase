import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import story from './app/story/story.store'
import user from './app/user/user.store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {

  },
  modules: {
    story,
    user
  }
})
