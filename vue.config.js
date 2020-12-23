module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: 'https://maps.googleapis.com'
  }
}