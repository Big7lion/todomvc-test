import Vue from 'vue'
import App from './App.vue'
import 'todomvc-app-css/index.css'
import 'todomvc-common/base.css'
import 'todomvc-common/base.js'
import VModal from 'vue-js-modal'

Vue.use(VModal, { dialog: true })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
