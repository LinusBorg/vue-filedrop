<template>
  <div class="filelist--example">
    <FileDrop multiple>
      <FileBox> <FileList /> </FileBox>
    </FileDrop>
  </div>
</template>

<script>
export default {
  name: 'FileListExample',
}
</script>

<style scoped>
.filelist--example {
  max-width: 550px;
  min-height: 200px;
  margin: 0 auto;
  display: flex;
}
</style>
