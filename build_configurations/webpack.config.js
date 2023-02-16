/* eslint-disable no-unused-vars */

import { resolve as _resolve, dirname } from "path";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env, args) => {
  return {
    entry: {
      main: "./src/main.js",
      network: "./src/network.js",
    },
    output: {
      filename: "[name].min.js",
      path: _resolve(__dirname, "../dist"),
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/assets",
            to: "assets/",
          },
          {
            from: "src/css",
            to: "css/",
          },
          {
            from: "src/index.html",
            to: "index.html",
          },
          {
            from: "src/js/svg.html",
            to: "svg.html",
          },
        ],
      }),
    ],
    resolve: {
      extensions: [".js"],
      modules: ["src", "node_modules", "src/js", "build_configurations"],
    },
  };
};
