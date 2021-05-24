const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json");
const commonConfig = require("./webpack.common");

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: `${<%= name %>_domain}/<%= name %>/latest/`,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "<%= camelize(name) %>",
      filename: "remoteEntry.js",
      exposes: {
        "./<%= classify(name) %>App": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
