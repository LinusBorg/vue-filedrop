<template>
  <div class="ipreview">
    <FileDrop multiple processFiles readAs="DataURL">
      <div slot-scope="{ files, open, clear, dragEvents }" v-on="dragEvents">
        <ImagePreview v-if="files.length" />
        <p v-else>No files so far. You can drop them here!</p>
        <br />
        <button @click="open">Open</button>
        <button @click="clear" :disabled="!files.length">Clear</button>
      </div>
    </FileDrop>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewExample',
}
</script>

<style scoped>
.ipreview {
  max-width: 550px;
  min-height: 200px;
  margin: 0 auto;
}
.file-list {
  list-style-type: none;
}
</style>
