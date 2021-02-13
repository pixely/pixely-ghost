require('dotenv').config()

const tokens = require('../../.tokens/js/tokens')

const api = require('../_11ty/utils/ghost-api')
const { generateImages } = require('../_11ty/utils/image')

// Get all site information
module.exports = async function () {
    const siteData = await api.settings
        .browse({
            include: 'url',
        })
        .catch((err) => {
            console.error(err)
        })
    
    // const icons = await generateImages(siteData.icon, [192, 512], ['png'])

    const iconSizes = [48, 192, 512, 1024]
    const iconFormats = ['png', 'svg']
    const iconRounded = await generateImages('src/images/favicons/favicon-round.svg', iconSizes, iconFormats)
    const iconSquare = await generateImages('src/images/favicons/favicon-square.svg', iconSizes, iconFormats)
    
    const icons = {
        ico: '/favicon.ico',
        svg: '/favicon.svg',
        maskIcon: '/favicon-transparent.svg',
        apple: iconSquare.png.filter((image) => image.width === 192).pop().url,
    }

    const formatIcons = (icon, purpose = 'any') => {
        return {
            src: icon.url,
            type: icon.sourceType,
            sizes: `${icon.width}x${icon.height}`,
            purpose,
        }
    }

    const manifest = {
        colours: {
            theme: tokens.theme.secondary.normal.value,
            background: tokens.theme.base.value,
        },
        icons: [
            ...iconRounded.svg.map(icon => formatIcons(icon)),
            ...iconSquare.svg.map(icon => formatIcons(icon, 'maskable')),
            ...iconRounded.png.map(icon => formatIcons(icon)),
            ...iconSquare.png.map(icon => formatIcons(icon, 'maskable')),
        ],
    }

    if (process.env.SITE_URL) {
        siteData.url = process.env.SITE_URL
    }
    return {
        ...siteData,
        manifest,
        icons,
    }
}