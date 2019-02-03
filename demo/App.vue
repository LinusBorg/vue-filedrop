<template>
  <div id="app">
    <h3 class="title">Simple File Drop</h3>
    <SimpleFileDrop />
    <h3 class="title">Image Preview List</h3>
    <ImagePreview />
    <h3 class="title">Simple File List</h3>
    <FileListExample />
    <h3 class="title">Typical Dropzone style component</h3>
    <Dropzone />
  </div>
</template>

<script>
import SimpleFileDrop from './components/SimpleFileDrop'
import ImagePreview from './components/ImagePreview'
import Dropzone from './components/Dropzone'
import FileListExample from './components/FileListExample'

export default {
  name: 'app',
  components: {
    Dropzone,
    FileListExample,
    ImagePreview,
    SimpleFileDrop,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  text-align: center;
}
</style>
