const { merge } = require('webpack-merge');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = (config, context) => {
  return merge(config, {
    plugins: [
      new GenerateSW({
        swDest: 'sw.js',
      }),
    ],
  });
};
