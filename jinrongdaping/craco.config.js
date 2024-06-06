const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: {
    configure: {
      entry: './src/render/index.js',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "./package.json" }].concat([
          // { from: "./main.js" },
          // { from: "./websocketServer.js" },
          // { from: "./ws" },
        ]),
      }),
    ],
  },
};
