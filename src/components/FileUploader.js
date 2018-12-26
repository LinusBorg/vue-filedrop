import Vue from 'vue'
import FileDrop from './FileDrop'
import { ReactiveProvideMixin } from 'vue-reactive-provde'
import { PROVIDE_KEY } from '../utils'

const Provide = ReactiveProvideMixin({
  name: PROVIDE_KEY,
  include: ['pending', 'progress', 'uploadError'],
})

export default Vue.extend({
  name: 'FileUploader',
  mixins: [Provide],
  props: {
    immediate: Boolean,
    headers: {
      type: Object,
      default: () => ({}),
    },
    path: {
      type: String,
    },
    request: {
      type: Object,
    },
  },
  data: () => ({
    files: [],
    pending: false,
    uploadEerror: null,
    progress: 0,
  }),
  render(h) {
    const scopedSlots = this.$scopedSlots
    return h(FileDrop, {
      attrs: this.$attrs,
      scopedSlots,
      on: {
        change: this.handleFiles,
      },
    })
  },
  methods: {
    handleFiles(files) {
      this.files = files
      if (this.immediate) {
        this.upload()
      }
    },
    updload() {
      // TODO:  Actual upload.
      // use isomorphic fetch? axios?
      // or make user pass in a function handling it?
      // NO. IDEA.
    },
  },
})
