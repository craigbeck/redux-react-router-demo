var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var config = {
  entry: {
    app: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      "./src/main.jsx"
    ]
  },
  output: {
    path: "./build",
    filename: "app.js"
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loaders: ["react-hot", "babel"] },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loader: "style!css!sass" },
      { test: require.resolve("react"), loader: "expose?React" }
    ]
  },
  devServer: {
    contentBase: "./public",
    devtool: "eval",
    progress: true,
    colors: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ title: "Webpack Starter" }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};

module.exports = config;
