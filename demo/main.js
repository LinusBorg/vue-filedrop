import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueFiledrop from '../src/full'

Vue.use(VueFiledrop)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
