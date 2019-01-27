<template>
  <div class="filedrop--imagepreview">
    <ul class="imagelist">
      <li
        v-for="(file, idx) in filedrop.files"
        :key="`${file.name}_${file.size}`"
      >
        <img :src="file.data" :alt="file.name" class="image" /> <br />
        {{ file.name }} <a href="#" @click="filedrop.remove(idx)">remove</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { PROVIDE_KEY } from '../utils'

export default {
  inject: {
    filedrop: PROVIDE_KEY,
  },
}
</script>

<style scoped lang="scss">
.filedrop--imagepreview {
  & .imagelist {
    list-style-type: none;
  }

  & .image {
    max-width: 300px;
  }
}
</style>
