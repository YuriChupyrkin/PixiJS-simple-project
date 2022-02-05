const path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: false,
  optimization: {
    minimize: true,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};