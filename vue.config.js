module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const path = require('path')
    config.resolve.alias.set('vue-filedrop', path.join(__dirname, './src'))
  },
}
