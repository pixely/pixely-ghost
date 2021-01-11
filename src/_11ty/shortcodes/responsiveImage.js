const { generateSrcsetWidths, generateImages } = require('../utils/image')

const responsiveImageShortcode = async (src, alt, srcset = null, sizes, loading = 'lazy', className = '') => {
    if (!src) {
        return null
    }
  
    const fullSrcset = generateSrcsetWidths(srcset)
    const resized = await generateImages(src, fullSrcset)

    const lowsrc = resized.jpeg[0]
  
    return `<picture>
      ${Object.values(resized).map(imageFormat => `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(', ')}" sizes="${sizes}" />`).join('')}
      <img src="${lowsrc.url}" width="${lowsrc.width}" height="${lowsrc.height}" loading="${loading}" alt="${alt}" class="image ${className}" decoding="async" />
    </picture>`
}

module.exports = responsiveImageShortcode