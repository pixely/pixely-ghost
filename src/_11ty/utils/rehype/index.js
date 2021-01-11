const rehype = require('rehype')
const format = require('rehype-format')

const { partials, partialsHandler } = require('./partials')
const { picture } = require('./picture')

const formatHtml = html => rehype()
    .use(picture)
    .use(partials, { cwd: './src/_includes/', handle: partialsHandler })
    .use(format)
    .process(html)

exports.formatHtml = formatHtml