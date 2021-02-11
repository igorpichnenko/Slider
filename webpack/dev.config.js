const { commonConfig, getRules, getPlugins } = require('./common');

module.exports = {
  ...commonConfig,
  mode: 'development',
  module: {
    rules: getRules('dev'),
  },
  plugins: getPlugins('dev'),
};
