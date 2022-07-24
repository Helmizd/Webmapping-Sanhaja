const path = require('path');

module.exports = {
    mode:'development',
  entry: './public/src/index.jsx',
  output: {
    path: path.resolve(__dirname,"public", 'www'),
    publicPath: '/public/www',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ]
  },devServer: {
    contentBase: path.join(__dirname, "public", 'www'),
    compress: true,
    historyApiFallback: true,
    port: 9001,
  }
};