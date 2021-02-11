const { commonConfig, getRules, getPlugins } = require('./common');

module.exports = {
  ...commonConfig,
  mode: 'production',
  module: {
    rules: getRules('prod'),
  },
  plugins: getPlugins('prod'),
};
