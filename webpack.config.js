const currenTask = process.env.npm_lifecycle_event
const postCSSPlugins = [require("postcss-mixins"), require("postcss-pxtorem")({ propWhiteList: [] }), require("postcss-import"), require("postcss-simple-vars"), require("postcss-nested"), require("autoprefixer")]

class RunAfterComplile {
  apply(compiler) {
    compiler.hooks.done.tap("copy images", function () {
      fse.copySync("./app/assets/images", "./docs/assets/images")
    })
  }
}

const { watch } = require("fs")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCSSExtractPlugin = require("mini-css-extract-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const fse = require("fs-extra")

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
let pages = fse
  .readdirSync("./app")
  .filter(function (file) {
    return file.endsWith(".html")
  })
  .map(function (page) {
    return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
    })
  })

let config = {
  entry: "./app/assets/scripts/App.js",
  plugins: pages,
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
  config.module.rules.push({
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"]
      }
    }
  })
  cssConfig.use.unshift(MiniCSSExtractPlugin.loader)
  config.output = {
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "docs")
  }
  config.mode = "production"
  config.optimization = {
    splitChunks: { chunks: "all" },
    minimize: false,
    minimizer: [`...`, new CssMinimizerPlugin()]
  }
  config.plugins.push(new CleanWebpackPlugin(), new MiniCssExtractPlugin({ filename: "styles.[chunkhash].css" }), new RunAfterComplile())
}

module.exports = config
