const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "./package.json" },
          { from: "public/images", to: "images" },
          { from: "./preload.js", to: "preload.js" },
        ].concat([{ from: "./main.js" }]),
      }),
    ],
  },
};
