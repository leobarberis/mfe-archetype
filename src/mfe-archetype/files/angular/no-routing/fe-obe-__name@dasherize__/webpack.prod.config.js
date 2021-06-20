const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].js",
    publicPath: "auto",
  },
};

module.exports = merge(commonConfig, prodConfig);
