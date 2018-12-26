<template>
  <div class="vue-filedrop-box" :class="hoverClass"><slot /></div>
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
.vue-filedrop-wrapper {
  .vue-filedrop-box {
    margin: 1rem;
    width: 100%;

    display: flex;
    justify-content: center;

    &:hover {
      cursor: pointer;
    }

    .vue-filedrop-hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }
}
</style>
