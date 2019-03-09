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
  'processing',
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
    stateless: {
      type: Boolean,
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
      processing: false,
      files: [],
      inputKey: 0, // hack to reset input element
    }
  },

  computed: {
    hasFiles() {
      return !!this.files.length
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
        if (!this.manualEmit && !this.stateless) {
          this.$emit('change', files.slice())
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
        this.$emit('dragleave', e)
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

      if (!this.multiple && files.length > 1) {
        console.error(
          `[vue-filedrop]: Dropping more than one file is not allowed. 
                 Set the 'multiple' prop to allow it.
        `
        )
        return
      }
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

    // File Processing
    handleFiles(filesList) {
      const files = [...filesList]
      if (!this.processFiles) {
        this.addFiles(files)
      } else {
        this.processing = true
        processFiles(files, this.readAs)
          .then(processedFiles => {
            this.addFiles(processedFiles)
            this.processing = false
          })
          .catch(error => {
            console.error(
              '[vue-component-filedrop] An error occured while processing the file(s)',
              error
            )
            this.processing = false
          })
      }
    },
    addFiles(files) {
      if (this.stateless) {
        this.emit()
      } else {
        if (this.append) {
          this.files.push(...files)
        } else {
          this.files = files
        }
      }
    },
    emit(files = this.files) {
      this.$emit('change', files.splice())
    },
    remove(idx) {
      this.$nextTick(() => {
        this.files.splice(idx, 1)
      })
    },
  },
})
</script>

<style lang="scss">
.vue-filedrop-wrapper {
  display: flex;
  flex: 1 1 auto;
}
</style>
