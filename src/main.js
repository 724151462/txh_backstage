import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import './plugins/element.js'

import './assets/css/public.styl'

Vue.config.productionTip = false

const Global_VM = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Global_VM
