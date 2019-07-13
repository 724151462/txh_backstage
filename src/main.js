import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './plugins/element.js'

import './assets/css/public.styl'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
