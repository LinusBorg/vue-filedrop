import Vue from 'vue'

const vm = new Vue({
  created() {
    const html = document.querySelector('html')
    html.addEventListener('dragenter', this.dragenter)
    html.addEventListener('dragleave', this.dragleave)
    html.addEventListener('dragend', this.dragend)
    html.addEventListener('drop', this.dragend)
  },
  beforeDestroy() {
    const html = document.querySelector('html')
    html.addEventListener('dragenter', this.dragenter)
    html.removeEventListener('dragleave', this.dragleave)
    html.removeEventListener('dragend', this.dragend)
    html.removeEventListener('drop', this.dragend)
  },
  methods: {
    dragenter() {
      if (this.$_firstE) {
        this.$_secondE = true
      } else {
        this.$_firstE = true
        this.$emit('dragging', true)
      }
    },
    dragleave() {
      if (this.$_secondE) {
        this.$_secondE = false
      } else if (this.$_firstE) {
        this.$_firstE = false
      }

      if (!this.$_firstE && !this.$_secondE) {
        this.$emit('dragging', false)
      }
    },
    dragend() {
      this.$emit('dragging', false)
    },
  },
})

export default vm
