<template>
  <div>
    <FileDrop @change="handleFiles">
      <div slot-scope="{ files, open, clear }">
        <ul v-if="files.length">
          <li v-for="file in files" :key="file.name">{{ file.name }}</li>
        </ul>
        <p v-else>No files so far. You can drop them here!</p>
        <br />
        <button @click="open">Open</button>
        <button @click="clear" :disabled="!!files.length">Clear</button>
      </div>
    </FileDrop>
  </div>
</template>

<script>
export default {
  name: 'SimpleFileDropExample',
  methods: {
    handleFiles(files) {
      window.alert(`We got ${files.length} files!`)
    },
  },
}
</script>

<style scoped></style>
