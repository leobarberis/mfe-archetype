const {merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  output: {
   publicPath: 'http://localhost:<%= port %>/',
  }, 
  devServer: {
    port: <%= port %>,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "<%= camelize(name) %>",
      filename: 'remoteEntry.js',
      exposes: {
        "./<%= classify(name) %>App": './src/bootstrap',
      },
      shared: packageJson.dependencies, 
     }),
    new HtmlWebpackPlugin ({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
