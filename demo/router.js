import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: require('./views/SimpleFileDrop').default,
      meta: {
        title: 'The simplest FileDrop',
      },
    },
    {
      path: '/file-list',
      component: require('./views/FileListExample').default,
      meta: {
        title: 'A File listing in a FileDrop',
      },
    },
    {
      path: '/image-preview',
      component: require('./views/ImagePreview').default,
      meta: {
        title: 'Previewing Images with thumbnails',
      },
    },
    {
      path: '/dropzone',
      component: require('./views/Dropzone').default,
      meta: {
        title: 'Imitating Dropzone style',
      },
    },
  ],
})
