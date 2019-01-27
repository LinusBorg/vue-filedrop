import Vue from 'vue'

const vm = new Vue({
  created() {
    const html = document.querySelector('html')
    html.addEventListener('dragenter', this.dragstartGlobal)
    html.addEventListener('dragleave', this.dragleaveGlobal)
    html.addEventListener('dragend', this.dragendGlobal)
    html.addEventListener('drop', this.dragendGlobal)
  },
  beforeDestroy() {
    const html = document.querySelector('html')
    html.addEventListener('dragenter', this.dragstartGlobal)
    html.removeEventListener('dragleave', this.dragleaveGlobal)
    html.removeEventListener('dragend', this.dragendGlobal)
    html.removeEventListener('drop', this.dragendGlobal)
  },
  methods: {
    dragstartGlobal() {
      if (this.$_firstE) {
        this.$_secondE = true
      } else {
        this.$_firstE = true
        this.$emit('dragging', true)
      }
    },
    dragleaveGlobal() {
      if (this.$_secondE) {
        this.$_secondE = false
      } else if (this.$_firstE) {
        this.$_firstE = false
      }

      if (!this.$_firstE && !this.$_secondE) {
        this.$emit('dragging', false)
      }
    },
    dragendGlobal() {
      this.$emit('dragging', false)
    },
  },
})

export default vm
