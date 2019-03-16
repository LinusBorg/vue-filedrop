<template>
  <div class="vue-filedrop--imagepreview">
    <div
      v-for="(file, idx) in images"
      :key="`${file.name}_${file.size}`"
      class="vue-filedrop--image-container"
      :style="widthStyle"
      :title="file.name"
    >
      <img
        :src="file.data"
        :alt="file.name"
        style="width: 100%"
        @click="handleClick(idx)"
      />
      <br />
      <div class="vue-filedrop--text" :class="textMaxWidth">
        {{ file.name }}
      </div>
      <a
        href="#"
        class="vue-filedrop--remove-link"
        @click="filedrop.remove(idx)"
        >x</a
      >
    </div>
  </div>
</template>

<script>
import { PROVIDE_KEY, processFiles } from '../utils'

export default {
  name: 'ImageList',
  inject: {
    filedrop: PROVIDE_KEY,
  },
  props: {
    width: {
      type: [String, Number],
      default: 80,
    },
    rowCount: {
      type: Number,
      default: 1,
    },
  },
  data: () => ({
    images: [],
  }),
  watch: {
    'filedrop.files': {
      immediate: true,
      handler: 'handleFiles',
    },
  },
  computed: {
    widthStyle() {
      return `width: ${this.width}px`
    },
    textMaxWidth() {
      return `max-width: calc(${this.width}px + 20px)`
    },
  },
  methods: {
    handleClick(idx) {
      this.$emit('image-click', idx, this.filedrop.files[idx])
    },
    handleFiles(files) {
      if (!files.length) return
      processFiles(files, 'DataURL').then(images => {
        this.images = images
      })
    },
  },
}
</script>

<style scoped lang="scss">
.vue-filedrop--imagepreview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;

  & .vue-filedrop--image-container {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    padding: 3px;
    border: 1px solid #ddd;
  }

  & .vue-filedrop--text {
    font-size: 0.7rem;
    height: 0.8rem;
    line-height: 0.8rem;
    word-wrap: none;
    overflow: hidden;
  }

  & .vue-filedrop--remove-link,
  .vue-filedrop--remove-link:hover,
  .vue-filedrop--remove-link:active {
    position: absolute;
    display: block;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #ddd;
    color: red;

    top: -10px;
    right: -10px;
    height: 20x;
    line-height: 20px;
    width: 20px;

    text-align: center;
    text-decoration: none;
  }
}
</style>
