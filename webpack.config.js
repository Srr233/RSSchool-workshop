const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  mode: 'development',

  entry: './covid-dashboard/src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    port: 5000,
    overlay: {
      warnings: true,
      errors: true
    },
    open: true
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'covid-dashboard/src/index.html'),
      favicon: path.resolve(__dirname, 'covid-dashboard/src/assets/favicon.ico')
    })
  ],

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(css)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: file => {
              let dirNameInsideAssets = path.relative(path.join(__dirname, 'covid-dashboard/src'), path.dirname(file));
              return `${dirNameInsideAssets}/[name].[ext]`;
            }
          }
        }
      }
    ]
  }

};
