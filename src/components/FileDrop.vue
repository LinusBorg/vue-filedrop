<template>
  <div :is="tag" ref="wrapper" class="vue-filedrop-wrapper">
    <input
      class="vue-filedrop-input"
      type="file"
      style="display: none"
      ref="input"
      :multiple="this.max > 1"
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
import { PROVIDE_KEY, pick } from '../utils'
import GlobalDragEventBus from '../utils/globalDragEventBus'

const propsToProvide = [
  // State
  'files',
  'hovering',
  'dragging',
  'processing',
  'maxExceeded',
  // Props
  'disabled',
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
  include: propsToProvide,
})

export default Vue.extend({
  name: 'FileDrop',
  mixins: [Provide],
  props: {
    disabled: {
      type: Boolean,
    },
    filter: {
      type: Function,
      default: files => files,
    },
    max: {
      type: Number,
      default: Infinity,
      validator: max => max && +max >= 1,
    },
    processor: {
      type: Function,
      default: files => Promise.resolve(files),
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
      rawFiles: [],
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
    maxExceeded() {
      const diff = this.rawFiles.length - this.max
      return diff > 0
    },
  },

  created() {
    this.$_globalEventHandler = v => {
      if (this.disabled) return
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
        this.$emit('change', files.slice())
      },
    },
  },

  methods: {
    /*
     * Drag&Drop handling
     */
    dragover(e) {
      if (this.disabled) return
      e.preventDefault()
    },
    dragenter(e) {
      if (this.disabled) return
      if (this.$_first) {
        this.$_second = true
      } else {
        this.$_first = true
        this.hovering = true
        this.$emit('dragenter', e)
      }
    },
    dragleave(e) {
      if (this.disabled) return
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
      if (this.disabled) return
      e.preventDefault()
      this.onFileDrop(e)
    },

    /*
     * Controlling the File Input
     */
    open() {
      if (this.disabled) return
      const { input } = this.$refs
      input && input.click()
    },
    clear() {
      this.inputKey++ // forces re-creation of input to clear it on all browsers
      this.$nextTick(() => {
        this.files = []
        this.rawFiles = []
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
      this.handleFiles(files)
    },

    // File Processing
    handleFiles(filesList) {
      this.rawFiles = [...filesList]
      if (this.maxExceeded) return

      let files = this.filter(this.rawFiles)

      this.processing = true
      this.processor(files)
        .then(files => {
          this.processing = false
          this.addFiles(files)
        })
        .catch(error => {
          console.error(
            '[vue-component-filedrop] An error occured while processing the file(s)',
            error
          )
          return error
        })
    },
    addFiles(files) {
      if (this.stateless) {
        this.emit()
      } else {
        this.files = files
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
