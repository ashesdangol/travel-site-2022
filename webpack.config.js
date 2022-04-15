const currenTask = process.env.npm_lifecycle_event
const postCSSPlugins = [require("postcss-mixins"), require("postcss-pxtorem")({ propWhiteList: [] }), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

const { watch } = require("fs")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

let cssConfig = {
  test: /\.css$/i,
  use: [
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

let config = {
  entry: "./app/assets/scripts/App.js",
  module: {
    rules: [cssConfig]
  }
}

if (currenTask == "dev") {
  cssConfig.use.unshift("style-loader")
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
  cssConfig.use.unshift(MiniCSSExtractPlugin.loader)
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist")
  }
  config.mode = "production"
  config.optimization = {
    splitChunks: { chunks: "all" },
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  config.plugins = [new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" })]
}

module.exports = config
