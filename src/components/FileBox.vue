<template>
  <div
    class="vue-filedrop-box"
    v-on="filedrop.dragEvents"
    @click="open"
    :class="classes"
  >
    <slot />
  </div>
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
    classes() {
      return [this.hoverClass, this.draggingClass]
    },
    hoverClass() {
      return this.filedrop.hovering ? 'vue-filedrop-hover' : ''
    },
    draggingClass() {
      return this.filedrop.dragging ? 'vue-filedrop-dragging' : ''
    },
  },
  methods: {
    open() {
      this.$nextTick().then(() => {
        const { hasFiles, open } = this.filedrop
        !hasFiles && open()
      })
    },
  },
}
</script>

<style lang="scss">
.vue-filedrop-box {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  border: 1px solid #ccc;
  border-radius: 3px;

  padding: 15px;

  &:hover {
    cursor: pointer;
  }

  &.vue-filedrop-dragging {
    border-style: dashed;
    border-width: 3px;
  }

  &.vue-filedrop-hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>
