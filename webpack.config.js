const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ghpages = require('gh-pages');


module.exports = {
  entry: {
    'index': './src/preview/index.ts',
    'slider': './src/slider/slider.ts'
  },
  resolve: {
    extensions: ['.js',
      '.ts',
      '.json', '.scss', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    },
      {
        test: /\.s?css$/,
        use: ['style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => autoprefixer({
                overrideBrowserslist: ['last 4 versions', '> 1%']
              }),

            }
          },
          'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]?[hash]'
        }
      }]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/preview/index.pug',
      favicon: "./src/images/favicon.png",
      filename: 'index.html'
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    stats: 'errors-only',
    index: 'index.html',
    open: true,
  }
};

ghpages.publish('dist', function (err) {});