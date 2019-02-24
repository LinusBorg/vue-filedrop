import Vue from 'vue'

import FileDrop from './components/FileDrop'

/* eslint-disable-next-line no-unused-vars */
function install(_Vue, { FileDropName, FileUploaderName } = {}) {
  Vue.component(FileDropName || 'FileDrop', FileDrop)
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
