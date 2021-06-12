const merge = require("webpack-merge").merge;
const baseConfig = require("./webpack.config.base");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    port: 4050,
  },
  devtool: "inline-source-map",
});
