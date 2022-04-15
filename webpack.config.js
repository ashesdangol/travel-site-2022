const currenTask = process.env.npm_lifecycle_event
const postCSSPlugins = [require("postcss-mixins"), require("postcss-pxtorem")({ propWhiteList: [] }), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

const { watch } = require("fs")
const path = require("path")

let config = {
  entry: "./app/assets/scripts/App.js",
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

if (currenTask == "dev") {
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "app")
  }
  config.devServer = {
    watchFiles: ["./app/**/*.html"],
    static: {
      directory: path.join(__dirname, "app"),
      watch: false
    },
    hot: true,
    port: 3000,
    host: "0.0.0.0",
    allowedHosts: "auto"
  }
  config.mode = "development"
}
if (currenTask == "build") {
  config.output = {
    filename: "bundled.js",
    path: path.resolve(__dirname, "dist")
  }
  config.mode = "production"
}

module.exports = config
