const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;
const isDev = ENV === 'dev';
const isProd = ENV === 'build';

function setDevTool() {
  if (isDev) {
    return 'cheap-module-eval-source-map';
  } else {
    return 'none';
  }
}

function setDMode() {
  if (isProd) {
    return 'production';
  } else {
    return 'development';
  }
}

const config = {
  target: "web",
  entry: {index: './english-for-kids/src/js/index.js'},
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: setDMode(),
  devtool: setDevTool(),
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'/* , 'eslint-loader' */],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
            }},
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug : true,
              mozjpeg: {
                progressive: true,
                quality: 75
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
                optimizationLevel: 1
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: 'fonts'
          }
        }]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebPackPlugin({
      template: './english-for-kids/src/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'english-for-kids/src/assets'), to: path.resolve(__dirname, 'dist/assets') }
    ]),
  ],

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    overlay: true,
    stats: 'errors-only',
    clientLogLevel: 'none'
  }
}

if (isProd) {
  config.plugins.push(
    new UglifyJSPlugin(),
  );
};

module.exports = config;
