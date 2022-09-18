const { merge } = require('webpack-merge');

module.exports = (config, context) => {
  return merge(config, {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          type: 'asset',
        },
      ],
    },
  });
};
