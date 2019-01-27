<template>
  <div id="app">
    <h3>Simple File Drop:</h3>
    <SimpleFileDrop />
    <h3>Image Preview</h3>
    <ImagePreview />
  </div>
</template>

<script>
import SimpleFileDrop from './components/SimpleFileDrop'
import ImagePreview from './components/ImagePreview'
export default {
  name: 'app',
  components: {
    SimpleFileDrop,
    ImagePreview,
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
