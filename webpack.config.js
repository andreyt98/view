const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

const styles = {
  apply: {
    test: /\.(css|s[ac]ss)$/,
    exclude: /(style\.css|main\.scss)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },

  createFile: {
    test: /(style\.css|main\.scss)$/,
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
};

const rulesForHTML = {
  test: /\.html$/,
  loader: "html-loader",
  options: {
    sources: false,
    minimize: true,
  },
};

const rulesForImages = {
  test: /\.(png|svg|jpg|gif|webp|eot|woff|woff2|ttf)%/,
  include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
  use: [
    {
      loader: "file-loader",
      options: {
        esModule: false,
      },
    },
  ],
};

const rules = [styles.apply, styles.createFile, rulesForHTML, rulesForImages, ];

module.exports = {
  mode: "production",

  //don't use the sourcemaps for build
  // devtool: "source-map",

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "main.js",
    clean: true,
  },

  module: { rules },

  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),

    new MiniCssExtractPlugin({
      filename: "style.css",
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/assets",
          to: "assets/",
          noErrorOnMissing: true,
        },
      ],
    }),
    new Dotenv(),
  ],

  devServer: {
    watchFiles: ["./src/**/*"],
    open: true,
    hot: true,
  },
};
