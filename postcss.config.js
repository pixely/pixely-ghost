const postcssNormalize = require('postcss-normalize');
console.log('postcss');
module.exports = () => ({
  plugins: [
    postcssNormalize(),
  ],
})
