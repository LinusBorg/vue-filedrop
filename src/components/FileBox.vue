<template>
  <div
    class="vue-filedrop-box"
    v-on="filedrop.dragEvents"
    @click="filedrop.open"
    :class="hoverClass"
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
    hoverClass() {
      return this.filedrop.hover ? 'vue-filedrop-hover' : ''
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

  .vue-filedrop-hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
}
</style>
