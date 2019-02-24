import Vue from 'vue'

/**
 * This is not yet part of the lib. 
 * 
 * The goal ist to first release the core version and then add 
 * additional components as we identify the use cases.
 */

import FileDrop from './components/FileDrop'
import FileUploader from './components/FileUploader'

import FileBox from './components/FileBox'
import ImageList from './components/ImageList'
import FileList from './components/FileList'

import * as filters from './utils'

const notFalse = v => v !== false
/* eslint-disable-next-line no-unused-vars */
function install(_Vue, options = {}) {
  notFalse(options.FileDrop) &&
    Vue.component(options.FileDrop || 'FileDrop', FileDrop)
  notFalse(options.FileUploader) &&
    Vue.component(options.FileDropUploader || 'FileUploader', FileUploader)
  notFalse(options.FileBox) &&
    Vue.component(options.FileBox || 'FileBox', FileBox)
  notFalse(options.ImageList) &&
    Vue.component(options.ImageList || 'ImageList', ImageList)
  notFalse(options.FileList) &&
    Vue.component(options.FileList || 'FileList', FileList)

  if (options.filters !== false) {
    Object.keys(filters).forEach(filterName => {
      Vue.filter(`filedrop:${filterName}`, filters[filterName])
    })
  }
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
export * from './utils/filters'
