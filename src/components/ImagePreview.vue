<template>
  <div class="filedrop--imagepreview">
    <div
      v-for="(file, idx) in filedrop.files"
      :key="`${file.name}_${file.size}`"
      class="filedrop--image-container"
      :style="widthStyle"
      :title="file.name"
    >
      <img :src="file.data" :alt="file.name" style="width: 100%" /> <br />
      <div class="filedrop--text" :class="textMaxWidth">{{ file.name }}</div>
      <a href="#" class="filedrop--remove-link" @click="filedrop.remove(idx)"
        >x</a
      >
    </div>
  </div>
</template>

<script>
import { PROVIDE_KEY } from '../utils'

export default {
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
  computed: {
    widthStyle() {
      return `width: ${this.width}px`
    },
    textMaxWidth() {
      return `max-width: calc(${this.width}px + 20px)`
    },
  },
}
</script>

<style scoped lang="scss">
.filedrop--imagepreview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-between;

  & .filedrop--image-container {
    position: relative;
    margin-top: 10px;
    margin-right: 10px;
    padding: 3px;
    border: 1px solid #ddd;
  }

  & .filedrop--text {
    font-size: 0.7rem;
    height: 0.8rem;
    line-height: 0.8rem;
    word-wrap: none;
    overflow: hidden;
  }

  & .filedrop--remove-link,
  .remove-link:hover,
  .remove-link:active {
    position: absolute;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20x;
    line-height: 20px;
    color: red;
    background-color: white;
    border-radius: 50%;
    border: 1px solid #ddd;
    text-decoration: none;
  }
}
</style>
