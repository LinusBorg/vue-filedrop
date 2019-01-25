import Vue from 'vue'

import FileDrop from './components/FileDrop'
import FileUploader from './components/FileUploader'

/* eslint-disable-next-line no-unused-vars */
function install(_Vue, { FileDropName, FileUploaderName } = {}) {
  Vue.component(FileDropName || FileDrop.name, FileDrop)
  Vue.component(FileUploaderName || FileUploader.name, FileUploader)
}

// autoinstall for script-tag includes
const hasWindow = typeof window !== 'undefined'
if (hasWindow & window.Vue && window.Vue === Vue) {
  Vue.use({ install })
}

export default {
  install,
}

export { FileDrop, FileUploader }
