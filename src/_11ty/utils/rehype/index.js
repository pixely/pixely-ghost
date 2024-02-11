const { partials, partialsHandler } = require('./partials');
const { picture } = require('./picture');

const formatHtml = async (html) => {
    const { rehype } = await import ('rehype');
    const { format } = await import ('rehype-format');
    
    return rehype()
    .use(picture)
    .use(partials, { cwd: './src/_includes/', handle: partialsHandler })
    .use(format)
    .process(html);
}

const formatBasicHtml = async (html) => {
    const { rehype } = await import ('rehype');
    const { format } = await import ('rehype-format');

    return rehype()
    .use(picture, { basic: true })
    .use(format)
    .process(html);
}

exports.formatHtml = formatHtml;
exports.formatBasicHtml = formatBasicHtml;
