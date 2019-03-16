<template>
  <div class="vue-filedrop-box" v-on="events" :class="classes"><slot /></div>
</template>

<script>
import { PROVIDE_KEY } from '@/utils'
export default {
  name: 'FileBox',
  inject: {
    filedrop: {
      from: PROVIDE_KEY,
      default: {},
    },
  },
  computed: {
    events() {
      const click = !this.filedrop.hasFiles
        ? {
            click: this.open,
          }
        : {}
      return {
        ...click,
        ...this.filedrop.dragEvents,
      }
    },
    classes() {
      return [this.hoverClass, this.draggingClass, this.hasFilesClass]
    },
    hasFilesClass() {
      return !this.filedrop.hasFiles ? 'vue-filedrop-no-files' : ''
    },
    hoverClass() {
      return this.filedrop.hovering ? 'vue-filedrop-hovering' : ''
    },
    draggingClass() {
      return this.filedrop.dragging ? 'vue-filedrop-dragging' : ''
    },
  },
  methods: {
    open() {
      const { files, open } = this.filedrop
      !files.length && open()
    },
  },
}
</script>

<style lang="scss">
$padding: 15px;

.vue-filedrop-box {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  border: 1px solid #ccc;
  border-radius: 3px;

  padding: $padding;

  &:hover {
    cursor: inherit;

    &.vue-filedrop-no-files {
      cursor: pointer;
    }
  }

  &.vue-filedrop-dragging {
    border-style: dashed;
    border-width: 2px;
  }

  &.vue-filedrop-hovering {
    border-color: #aaa;
    // background-color: #fdfdfd;
    box-shadow: 0px 0px 7px 2px rgba(0, 0, 0, 0.22);
  }
}
</style>
