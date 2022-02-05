const path = require('path');

module.exports = {
  entry: './src/index.js',
  watch: true,
  optimization: {
    minimize: false
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};