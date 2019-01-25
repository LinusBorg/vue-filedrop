import Vue from 'vue'

import FileDrop from './components/FileDrop'
import FileUploader from './components/FileUploader'

import FileBox from './components/FileBox'

const notFalse = v => v !== false
/* eslint-disable-next-line no-unused-vars */
function install(_Vue, options = {}) {
  notFalse(options.FileDrop) &&
    Vue.component(options.FileDrop || FileDrop.name, FileDrop)
  notFalse(options.FileUploader) &&
    Vue.component(options.FileDropUploader || FileUploader.name, FileUploader)
  notFalse(options.FileBox) &&
    Vue.component(options.FileBox || FileBox.name, FileBox)
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

export { FileBox, FileDrop, FileUploader }
