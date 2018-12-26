import Vue from 'vue'

import FileDrop from './components/FileDrop'
import FileUploader from './components/FileUploader'

/* eslint-disable-next-line no-unused-vars */
function install(_Vue, options = {}) {
  Vue.component(FileDrop.name, FileDrop)
  Vue.component(FileUploader.name, FileUploader)
}

// autoinstall for script-tag includes
const w = window
const hasWindow = typeof w !== 'undefined'
if (hasWindow & w.Vue && w.Vue === Vue) {
  Vue.use({ install })
}

export default {
  install,
}

export { FileDrop, FileUploader }
