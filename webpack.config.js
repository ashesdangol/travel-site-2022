const postCSSPlugins = [require("postcss-pxtorem")({ propWhiteList: [] }), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

const path = require("path")
module.exports = {
  entry: "./app/assets/scripts/App.js",
  output: {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  },
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: postCSSPlugins
              }
            }
          }
        ]
      }
    ]
  }
}
