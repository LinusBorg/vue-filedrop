import Vue from 'vue'

import FileDrop from './components/FileDrop'
import FileUploader from './components/FileUploader'

import FileBox from './components/FileBox'
import ImagePreview from './components/ImagePreview'

const notFalse = v => v !== false
/* eslint-disable-next-line no-unused-vars */
function install(_Vue, options = {}) {
  notFalse(options.FileDrop) &&
    Vue.component(options.FileDrop || 'FileDrop', FileDrop)
  notFalse(options.FileUploader) &&
    Vue.component(options.FileDropUploader || 'FileUploader', FileUploader)
  notFalse(options.FileBox) &&
    Vue.component(options.FileBox || 'FileBox', FileBox)
  notFalse(options.ImagePreview) &&
    Vue.component(options.ImagePreview || 'ImagePreview', ImagePreview)
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
