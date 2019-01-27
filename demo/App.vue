<template>
  <div id="app">
    <h3>Simple File Drop</h3>
    <SimpleFileDrop />
    <h3>Image Preview</h3>
    <ImagePreview />
    <h3>Typical Dropzone style component</h3>
    <Dropzone />
  </div>
</template>

<script>
import SimpleFileDrop from './components/SimpleFileDrop'
import ImagePreview from './components/ImagePreview'
import Dropzone from './components/Dropzone'
export default {
  name: 'app',
  components: {
    SimpleFileDrop,
    ImagePreview,
    Dropzone,
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
