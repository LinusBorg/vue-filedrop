<template>
  <div class="dropzone">
    <FileDrop multiple processFiles readAs="DataURL">
      <FileBox slot-scope="{ files }">
        <p v-if="!files.length">
          No images yet. Drop or click here to add some.
        </p>
        <div v-else><ImagePreview /></div>
      </FileBox>
    </FileDrop>
  </div>
</template>

<script>
export default {
  name: 'TypicalDropZone',
}
</script>

<style scoped>
.dropzone {
  max-width: 550px;
  height: 200px;
  margin: 0 auto;
}
</style>
