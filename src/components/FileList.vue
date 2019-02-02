<template>
  <div class="filedrop--filelist">
    <ul v-if="filedrop.hasFiles" class="filedrop--list">
      <li
        v-for="(file, idx) in filedrop.files"
        :key="`${file.name}_${file.size}`"
        class="filedrop--item"
      >
        <div class="filedrop--name" :title="file.name">
          {{ file.name | shorten }} ({{ file.size | size }})
        </div>
        <div class="filedrop--action">
          <button class="filedrop--button" @click="remove(idx)">X</button>
        </div>
      </li>
    </ul>
    <p v-else>No files yet drop them here or click here to select</p>
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
.filedrop {
  &--list {
    list-style-type: none;
    padding-left: 0;
    //display: block;
    width: 100%;
  }
  &--item {
    display: flex;
    width: 100%;
  }

  &--name {
    flex: 1;
    padding: 3px 10px;
  }

  &--action {
    flex: 0 0 20px;
    margin: auto;
  }

  &--button {
    display: block;
    color: #444;
    cursor: pointer;
    border-radius: 50%;
    border: $bw solid #ccc;
    padding: 0;
    height: $height;
    width: $height;
    line-height: calc($height - (2 * #{$bw}));
  }

  &--button:hover {
    background-color: #eee;
  }
}
</style>
