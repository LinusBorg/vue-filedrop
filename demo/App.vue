<template>
  <div id="app">
    <nav>
      <ul class="main-navigation">
        <li><router-link to="/">Simple</router-link></li>
        <li><router-link to="/file-list">File List</router-link></li>
        <li><router-link to="/image-preview">Image preview</router-link></li>
        <li><router-link to="/dropzone">Dropzone</router-link></li>
      </ul>
    </nav>
    <h2 class="title">{{ $route.meta.title || 'Placeholder Title!' }}</h2>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
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

.main-navigation {
  list-style-type: none;
  display: flex;
  justify-content: center;

  li {
    display: inline-block;
    margin-right: 10px;
    padding: 5px;
  }

  a,
  a:hover a:visited a:active {
    padding: 5px 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-decoration: none;
    color: green;
  }
}
</style>
