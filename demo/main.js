import Vue from 'vue'
import App from './App.vue'
import VueFiledrop from '../src/full'

Vue.use(VueFiledrop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
