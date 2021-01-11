const { generateImages } = require('../utils/image')

const image = async (url, width) => {
    if (url.length) {
        const resizedImage = await generateImages(url, [width], ['jpeg'])
        return process.env.SITE_URL + resizedImage.jpeg[0].url
    } else {
        return url
    }
}

exports.getResizedImage = image