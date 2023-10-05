const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: [
    './scripts.js'
  ],
  output: {
    chunkFilename: 'js/[name].js',
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'static')
  },
  context: path.resolve(__dirname, 'src'),
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 9000,
  },
  optimization: {
    minimizer: [new TerserPlugin()],

    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader',
          'postcss-loader'],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      // images & files
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'assets',
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html',
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [
        'css/**/*',
        '!img/**/*',
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // inline js
    new ScriptExtHtmlWebpackPlugin({
      inline: ["scripts.js"]
    })
  ],
};
