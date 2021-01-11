require('dotenv').config()

const api = require('../_11ty/utils/ghost-api')
const { generateImage } = require('../_11ty/utils/image')

// Get site meta information
module.exports = async function () {
    const siteData = await api.settings
        .browse({
            include: 'icon,url',
        })
        .catch((err) => {
            console.error(err)
        })
    
    if (process.env.SITE_URL) {
        siteData.url = process.env.SITE_URL
    }

    const meta = {
        site: {
            name: siteData.title,
            description: siteData.description,
            url: siteData.url,
            language: siteData.default_locale,
            logo: {
                src: await generateImage(siteData.icon, 300),
            },
        },
    }

    return meta
}
