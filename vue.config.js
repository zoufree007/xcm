const WoxWebpackRuntimePlugin = require("@wox/loader");
const webpackproxy = require("./webpack.proxy");
const deployConfigs = require("./.deploy.json");
const webpack = require("webpack");
// const FileManagerPlugin = require('filemanager-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
module.exports = {
  productionSourceMap: false,
  publicPath: "/h5-app",
  pages: {
    app: {
      entry: "./webpack.js",
      template: "public/index.html",
      filename: "index.html",
      title: deployConfigs.title
    }
  },
  configureWebpack: {
    module: {
      rules: [{ test: /\.csv$/, use: "csv-loader" }]
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.SPARK_VERSION": JSON.stringify(
          require("./package.json").version
        ),
        "process.env.SPARK_DEPLOY_CONFIGS": JSON.stringify(deployConfigs)
      }),
      new CompressionPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 8192,
        minRatio: 0.8
      })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: deployConfigs.less
      }
    }
  },
  transpileDependencies: [
    /@component/,
    /@wox/,
    /@html5/,
    /super-vuex/,
    /camelcase/,
    /md5-hex/,
    /compressorjs/,
  ],
  chainWebpack(configs) {
    configs.plugin("wox").use(WoxWebpackRuntimePlugin);
    configs.resolve.alias.set("#", process.cwd());
    return configs;
  },
  devServer: {
    host: "0.0.0.0",
    disableHostCheck: true,
    historyApiFallback: true
  }
};

if (Object.keys(webpackproxy).length) {
  module.exports.devServer.proxy = webpackproxy;
}
