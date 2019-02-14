module.exports = {
  lintOnSave: false,
  css: {
    extract: process.env.NODE_ENV === 'production',
  },
  chainWebpack: config => {
    config.resolve.symlinks = false
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV !== 'production') return
    return {
      externals: {
        'vue-reactive-provide': {
          commonjs: 'vue-reactive-provide',
          commonjs2: 'vue-reactive-provide',
          root: 'VueReactiveProvide',
        },
      },
    }
  },
}
