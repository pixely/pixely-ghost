const image = require('@11ty/eleventy-img')

const generateSrcsetWidths = (srcset) => {
    // Standard config options
    const dpiSizes = [1, 2, 3]
    const newSizes = []

    if (typeof srcset === 'string') {
        srcset = srcset.split(',')
    }

    // From the srcset sizes generate extra for different retina screens
    srcset.forEach((size) => {
        dpiSizes.forEach((dpi) => {
            newSizes.push(size * dpi)
        })
    })

    const dedupedSizes = [...new Set(newSizes)]
    const sortedSizes = dedupedSizes.sort((a, b) => a - b)
  
    return sortedSizes
}

// const formats = ["webp", "jpeg", "avif", "svg"];
const generateImages = (src, srcset, formats = ['avif','webp','jpeg']) => image(src, {
    widths: srcset,
    formats,
    outputDir: './dist/images/',
    urlPath: '/images/',
    cacheOptions: {
        duration: '1w',
    },
})

const generateImage = async (src, width = 800) => {
    const resizedImage = await generateImages(src, [width], ['jpeg'])
    return process.env.SITE_URL + resizedImage?.jpeg[0].url
}

exports.generateSrcsetWidths = generateSrcsetWidths
exports.generateImages = generateImages
exports.generateImage = generateImage