const path = require("path");
const config = require("../config");
const utils = require("./util");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const webpack = require("webpack");
const px2vw = require("postcss-px-to-vw");
process.noDeprecation = true;

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  entry: {
    index: "./src/main.js"
  },
  output: {
    path: path.join(__dirname, "../"),
    filename: "[name].js",
    // publicPath: config.build.assetsPublicPath,
    publicPath:
      process.env.NODE_ENV === "production"
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: process.env.NODE_ENV === "production",
          postcss: [px2vw({ vwUnit: 375 })]
        }
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [resolve("src")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "img/[name].[hash:7].[ext]"
        }
      }
    ]
  },
  plugins: [
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: function(module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
        );
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest",
      chunks: ["vendor"]
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: "template/base.html",
      inject: false,
      template: path.join(__dirname, "../template/base.ejs"),
      chunks: ["manifest", "vendor"]
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: "template/index.html",
      inject: false,
      template: path.join(__dirname, "../template/index.ejs"),
      chunks: ["index"]
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: "template/pc.html",
      inject: false,
      template: path.join(__dirname, "../template/pc.ejs"),
      chunks: []
    }),
    new HtmlWebpackHarddiskPlugin()
  ]
};
