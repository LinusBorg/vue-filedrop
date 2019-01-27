<template>
  <div :is="tag" ref="wrapper" class="vue-filedrop-wrapper">
    <input
      class="vue-filedrop-input"
      type="file"
      style="display: none"
      ref="input"
      :accept="accept"
      :multiple="multiple"
      :max="max"
      :key="`vueFiledropInput_${inputKey}`"
      @change="onFileInputChange"
    />

    <slot v-bind="fileDropProps" />
  </div>
</template>

<script>
import Vue from 'vue'
import { ReactiveProvideMixin } from 'vue-reactive-provide'
import { processFiles, validateReadAs, PROVIDE_KEY, pick } from '../utils'

const propsToProvide = [
  'files',
  'hover',
  'clear',
  'open',
  'remove',
  'dragEvents',
]

const Provide = ReactiveProvideMixin({
  name: PROVIDE_KEY,
  inheritAs: 'fileUploaderProps', // funktioniert noch nicht wenn der inject fehlt!
  nameForComputed: 'fileDropProps',
  props: true,
  include: propsToProvide,
})

export default Vue.extend({
  name: 'FileDrop',
  mixins: [Provide],
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    max: {
      // TODO: implement error if exceeded
      type: Number,
      default: Infinity,
    },
    append: {
      type: Boolean,
    },
    accept: {
      type: String,
      default: null,
    },
    processFiles: {
      type: Boolean,
      default: false,
    },
    readAs: {
      type: String,
      default: 'Text', // 'ArrayBuffer', 'Blob', 'DataURL', 'Text'
      validator: validateReadAs,
    },
    tag: {
      type: String,
      default: 'DIV',
    },
  },

  data() {
    return {
      hover: false,
      files: [],
      inputKey: 0,
    }
  },

  computed: {
    hasFiles() {
      return this.files.length
    },
    dragEvents() {
      return pick(this, ['dragover', 'dragenter', 'dragleave', 'drop'])
    },
  },

  watch: {
    files: {
      deep: true,
      handler(files) {
        this.$emit('change', files)
      },
    },
  },
  methods: {
    /*
     * Setting `hover` reliably
     */
    drop(e) {
      this.onFileDrop(e)
    },
    dragover(e) {
      e.preventDefault()
    },
    dragenter(e) {
      if (e.target === this.$refs.wrapper) {
        this.hover = true
        this.$emit('dragenter', e)
      }
    },
    dragleave(e) {
      if (e.target === this.$refs.wrapper) {
        this.hover = false
        this.$emit('dragleave', e)
      }
    },
    /*
     * Controlling the File Input
     */
    open() {
      const { input } = this.$refs
      input && input.click()
    },
    clear() {
      console.log('clear')
      this.inputKey++ // forces re-creation of input to clear it on all browsers
      this.files = []
    },
    remove(idx) {
      this.files.splice(idx, 1)
    },
    /*
     * File Events Handling
     */
    onFileInputChange(event) {
      this.handleFiles(event.target.files)
    },

    onFileDrop(event) {
      this.hover = false
      const files = event.dataTransfer.files
      const numDropped = files.length
      const numCached = this.files.length
      if (numCached + numDropped > this.max) {
        console.error(
          `[vue-filedrop]: Dropping ${numDropped} files exceeds limit of ${
            this.max
          } files`
        )
        return
      }
      this.handleFiles(files)
    },

    handleFiles(filesList) {
      const files = [...filesList]
      if (!this.processFiles) {
        this.files = files
      } else {
        this.processingFiles = true
        processFiles(files, this.readAs)
          .then(processedFiles => {
            this.files = processedFiles
            this.processingFiles = false
          })
          .catch(error => {
            console.error(
              '[vue-component-filedrop] An error occured while processing the file(s)',
              error
            )
            this.processingFiles = false
          })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.vue-filedrop-wrapper {
  height: 100%;
}
</style>
