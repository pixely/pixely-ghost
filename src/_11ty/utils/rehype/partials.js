const partials = require('rehype-partials')
const { Liquid } = require('liquidjs')

const partialsHandler = (includePath, callback) => {
    try {
        const liquidEngine = new Liquid({
            cache: process.env.NODE_ENV === 'production',
            root: ['./src/_includes', '_includes'],
            extname: '.liquid',
            dynamicPartials: true,
            strict_filters: true,
        })
        const renderedMarkup = liquidEngine.renderFileSync(includePath)
        callback(null, renderedMarkup)
    } catch (e) {
        callback(e)
    }
}

exports.partials = partials
exports.partialsHandler = partialsHandler