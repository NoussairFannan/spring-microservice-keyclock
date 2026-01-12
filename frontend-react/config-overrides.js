const { override, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  (config) => {
    // Configure fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url/"),
      "assert": require.resolve("assert/"),
      "http2": false,
      "util": require.resolve("util/"),
      "buffer": require.resolve("buffer/"),
    };
    
    // Add plugins to provide global variables
    config.plugins.push(
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser.js',
      })
    );
    
    // Ignore Node.js specific modules that axios might try to use
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    return config;
  }
);

