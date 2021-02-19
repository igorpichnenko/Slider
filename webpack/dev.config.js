const { commonConfig, getRules, getPlugins } = require('./common');

module.exports = {
  ...commonConfig,
  mode: 'development',
  devtool: "eval-cheap-source-map",
  module: {
    rules: getRules('dev'),
  },
  plugins: getPlugins('dev'),
};
