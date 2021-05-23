const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${domain}/<%= name %>/latest/`,
  },
};

module.exports = merge(commonConfig, prodConfig);
