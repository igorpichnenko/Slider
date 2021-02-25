const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function getPlugins(config) {
  return [
    new HTMLWebpackPlugin({
      currentEnv: process.env.NODE_ENV,
      filename: 'index.html',
      template: 'preview/index.html',
    }),
    new CleanWebpackPlugin(),
  ].concat(config === 'prod' ? (
    new MiniCssExtractPlugin({
      filename: 'slider/[name].css',
    })
  ) : []);
}

function getRules(config) {
  const scssLoaders = {
    dev: ['style-loader', 'css-loader', 'sass-loader'],
    prod: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  };

  return [
    {
      test: /\.(s?css)$/,
      use: scssLoaders[config],
    },
    {
      test: /\.ts$/,
      use: 'ts-loader',
    },
  ];
};

const commonConfig = {
  target: 'web',
  context: path.resolve(__dirname, '..', 'src'),
  entry: {
      preview: './preview/index.ts',
      slider: ['./slider/slider.ts', './slider/slider.scss'],
  },
  output: {
    filename: 'slider/[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.json', '.scss'],
  },
}




module.exports = { commonConfig, getRules, getPlugins }
