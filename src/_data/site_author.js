require('dotenv').config()

const api = require('../_11ty/utils/ghost-api')
const { stripDomain } = require('../_11ty/utils/url')

// Get all site information
module.exports = async function () {
    const siteAuthor = await api.authors
        .read({
            slug: 'graham',
        })
        .catch((err) => {
            console.error(err)
        })

    siteAuthor.url = stripDomain(siteAuthor.url)

    return siteAuthor
}
