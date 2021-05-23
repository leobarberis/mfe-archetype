const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("./package.json");

module.exports = {
  output: {
    uniqueName: "<%= name %>",
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false,
  },
  plugins: [
    new ModuleFederationPlugin({
      // For remotes (please adjust)
      name: "<%= camelize(name) %>",
      filename: "remoteEntry.js",
      exposes: {
        "./<%= classify(name) %>App": "./src/bootstrap.ts",
      },

      shared: {
        ...packageJson.dependencies,
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
      },
    }),
  ],
};
