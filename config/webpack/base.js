const webpack = require('webpack');
const { webpackConfig, merge } = require('@rails/webpacker');
const Dotenv = require('dotenv-webpack');

const customConfig = {
  plugins: [
    new Dotenv(),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
};

module.exports = merge(webpackConfig, customConfig);
