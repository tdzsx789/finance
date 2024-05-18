const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    webpack: {
        plugins: [
            new CopyWebpackPlugin({
              patterns: [{ from: "./package.json" }]
              .concat([{ from: "./main.js" }]),
            }),
          ],
    }
};
