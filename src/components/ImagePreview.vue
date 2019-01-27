<template>
  <div class="filedrop--imagepreview">
    <div
      v-for="(file, idx) in filedrop.files"
      :key="`${file.name}_${file.size}`"
    >
      <img :src="file.data" :alt="file.name" class="image" /> <br />
      {{ file.name }} <a href="#" @click="filedrop.remove(idx)">remove</a>
    </div>
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
  & .image {
    max-width: 300px;
  }
}
</style>
