<template>
  <div
    :is="tag"
    ref="wrapper"
    class="vue-filedrop-wrapper"
    :class="hoverClass"
    @dragover.prevent
    @drop.prevent="onFileDrop"
    @dragenter.prevent="dragenter"
    @dragleave.prevent="dragleave"
    @click="open"
  >
    <input
      v-if="internalInput"
      class="vue-filedrop-input"
      type="file"
      ref="input"
      :accept="accept"
      :multiple="multiple"
      :max="max"
      :key="'vueFiledropInput_' + inputKey"
      @change.prevent="onFileInputChange"
    />

    <slot v-bind="filedropProps" />
  </div>
</template>

<script>
import Vue from 'vue'
import { ReactiveProvideMixin } from 'vue-reactive-provde'
import { processFiles, validateReadAs, PROVIDE_KEY } from '../utils'

const propsToProvide = ['files', 'hover', 'clear', 'open']

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
      this.inputKey++
      this.files = []
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
        processFiles(files)
          .then(processedFiles => {
            this.files = processedFiles
          })
          .catch(error => {
            console.error(
              '[vue-component-filedrop] An error occured while processing the file(s)',
              error
            )
          })
      }
    },
  },
})
</script>
<style lang="scss">
.vue-filedrop-wrapper {
  &:hover {
    cursor: pointer;
  }
}

.vue-filedrop-input {
  display: none;
}
</style>
