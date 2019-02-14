<template>
  <div class="vue-filedrop--filelist-container">
    <div v-if="filedrop.hasFiles" class="filedrop--filelist">
      <h3 class="vue-filedrop--filelist-header">
        {{ filedrop.files.length }} files added
      </h3>
      <div
        v-for="(file, idx) in filedrop.files"
        :key="`${file.name}_${file.size}`"
        class="vue-filedrop--list-item"
      >
        <div class="vue-filedrop--name" :title="file.name">
          {{ file.name | shorten }} ({{ file.size | size }})
        </div>
        <div class="vue-filedrop--action">
          <button class="filedrop--button" @click="remove(idx)">X</button>
        </div>
      </div>
    </div>
    <div v-else class="vue-filedrop--list-hint-container">
      <p class="vue-filedrop--list-hint">
        No files yet drop them here or click here to select
      </p>
    </div>
  </div>
</template>

<script>
import { PROVIDE_KEY } from '../utils'
import { size, shorten } from '@/utils/filters'
export default {
  name: 'FileList',
  inject: {
    filedrop: PROVIDE_KEY,
  },
  filters: {
    size,
    shorten,
  },
  methods: {
    remove(idx) {
      this.filedrop.remove(idx)
    },
  },
}
</script>

<style scoped lang="scss">
$bw: 1px;
$height: 20px;
.vue-filedrop {
  &--filelist-container {
    width: 100%;
  }
  &--filelist {
    font-size: 0.9em;
  }
  &--filelist-header {
    text-align: center;
  }
  &--list-item {
    position: relative;
    display: flex;
    padding: 8px 0;
  }

  &--list-item:not(:last-child):after {
    position: absolute;
    content: '';
    background-color: #ccc;
    height: 1px;
    left: 0;
    right: 0;
    bottom: 1px;
  }

  &--name {
    flex: 1 0 auto;
    padding: 3px 10px;
  }

  &--action {
    flex: 0 0 20px;
    margin: auto;
  }

  &--button {
    cursor: pointer;
    display: block;
    color: #444;
    border-radius: 50%;
    border: $bw solid #ccc;
    padding: 0;
    height: $height;
    width: $height;
    line-height: calc(#{$height} - (2 * #{$bw}));
  }

  &--button:hover {
    background-color: #eee;
  }

  &--list-hint-container {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
  &--list-hint {
    text-align: center;
  }
}
</style>
