<template>
  <div class="ipreview">
    <FileDrop multiple processFiles readAs="DataURL">
      <div
        slot-scope="{ files, open, clear, dragEvents }"
        v-on="dragEvents"
        class="imagelist-wrapper"
      >
        <ImageList v-if="files.length" :width="120" />
        <p v-else>No files so far. You can drop them here!</p>
        <br />
        <div class="example--btngroup">
          <button class="example--btn" @click="open">Open</button>
          <button class="example--btn" @click="clear" :disabled="!files.length">
            Clear
          </button>
        </div>
      </div>
    </FileDrop>
  </div>
</template>

<script>
export default {
  name: 'ImagePreviewExample',
}
</script>

<style scoped lang="scss">
.ipreview {
  max-width: 550px;
  min-height: 200px;
  display: flex;
  margin: 0 auto;

  .example--btngroup {
    display: flex;
    justify-content: center;

    button + button {
      margin-left: 10px;
    }
  }
  .example--btn {
    color: navy;
    background: white;
    padding: 5px 10px;
    border: 1px solid navy;
    border-radius: 3px;

    &:hover {
      background-color: rgba(10, 10, 255, 0.2);
    }

    &:disabled {
      border-color: #ccc;
      color: #ccc;
      pointer-events: none;
    }
  }
}
.imagelist-wrapper {
  margin: auto;
}
.file-list {
  list-style-type: none;
}
</style>
