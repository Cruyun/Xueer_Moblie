// webpack config variables
const path = require("path");
const buildEnv = require("./prod.env");
const devEnv = require("./dev.env");

module.exports = {
  build: {
    env: buildEnv,
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "/static/",
    // assetsPublicPath: 'http://cdn.com/dist/',
    assetsPublicPath: "https://occc3ev3l.qnssl.com/xueer/",
    productionSourceMap: false,
    bundleAnalyzerReport: false
  },
  dev: {
    env: devEnv,
    assetsPublicPath: "/dist/"
  }
};
