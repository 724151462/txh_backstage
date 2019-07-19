import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

let state = {
  actId: localStorage.getItem('actId') || ''
}

export default new Vuex.Store({
  state,
  mutations,
  actions: {

  }
})
