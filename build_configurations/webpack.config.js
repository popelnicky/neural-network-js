/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, args) => {
  return {
    entry: "./src/js/main.js",
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "../dist")
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ["babel-loader"]
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns:
        [
          {
            from: "src/css",
            to: "css/"
          },
          {
            from: "src/assets",
            to: "assets/"
          },
          {
            from: "src/index.html",
            to: "index.html"
          }
        ]
      })
    ],
    resolve: {
      extensions: [".js"],
      modules: ["src", "node_modules", "src/js", "build_configurations"]
    }
  };
};