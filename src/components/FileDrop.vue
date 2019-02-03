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
import GlobalDragEventBus from '../utils/globalDragEventBus'

const propsToProvide = [
  // State
  'files',
  'hovering',
  'dragging',
  // computed
  'dragEvents',
  'hasFiles',
  // Methods
  'open',
  'emit',
  'remove',
  'clear',
]

const Provide = ReactiveProvideMixin({
  name: PROVIDE_KEY,
  inheritAs: 'fileUploaderProps', // to inherit from FileUploader
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
    manualEmit: {
      type: Boolean,
      default: false,
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
      hovering: false,
      dragging: false,
      files: [],
      inputKey: 0, // hack to reset input element
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

  created() {
    this.$_globalEventHandler = v => {
      this.dragging = v
      if (this.hovering) {
        this.hovering = false
      }
    }
    GlobalDragEventBus.$on('dragging', this.$_globalEventHandler)
  },
  beforeDestroy() {
    GlobalDragEventBus.$off('dragging', this.$_globalEventHandler)
  },

  watch: {
    files: {
      deep: true,
      handler(files) {
        if (!this.manualEmit) {
          this.$emit('change', files)
        }
      },
    },
  },

  methods: {
    /*
     * Drag&Drop handling
     */
    dragover(e) {
      e.preventDefault()
    },
    dragenter(e) {
      if (this.$_first) {
        this.$_second = true
      } else {
        this.$_first = true
        this.hovering = true
        this.$emit('dragenter', e)
      }
    },
    dragleave(e) {
      if (this.$_second) {
        this.$_second = false
      } else if (this.$_first) {
        this.$_first = false
      }

      if (!this.$_first && !this.$_second) {
        this.hovering = false
        this.$emit('dragenter', e)
      }
    },
    drop(e) {
      e.preventDefault()
      this.onFileDrop(e)
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
      this.$nextTick(() => {
        this.files = []
      })
    },

    /*
     * File Events
     */
    onFileInputChange(event) {
      this.handleFiles(event.target.files)
    },

    onFileDrop(event) {
      this.hovering = false
      this.dragging = false
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

    remove(idx) {
      this.$nextTick(() => {
        this.files.splice(idx, 1)
      })
    },
    emit() {
      this.$emit('change', this.files)
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
  // height: 100%;
  display: flex;
  flex: 1 1 auto;
}
</style>
