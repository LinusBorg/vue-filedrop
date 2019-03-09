import Vue from 'vue'
import FileDrop from './components/FileDrop'

/* eslint-disable-next-line no-unused-vars */
function install(_Vue, { filedropName } = {}) {
  if (filedropName !== false) {
    Vue.component(filedropName || FileDrop.name, FileDrop)
  }
}

// autoinstall for script-tag includes
const hasWindow = typeof window !== 'undefined'
if (hasWindow & window.Vue && window.Vue === Vue) {
  Vue.use({ install })
}

export default {
  install,
}

export { FileDrop }
