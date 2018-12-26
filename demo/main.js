import Vue from 'vue'
import App from './App.vue'
import VueFiledrop from 'vue-filedrop'

Vue.use(VueFiledrop)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
