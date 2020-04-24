const postcssNormalize = require(`postcss-normalize`)
console.log(`postcss`)
module.exports = () => {
    return {
        plugins: [
            postcssNormalize(),
        ],
    }
}
