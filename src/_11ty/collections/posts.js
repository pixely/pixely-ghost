const api = require('../utils/ghost-api')
const { formatPostObject } = require('../utils/post')

const posts = async (collection) => {
    collection = await api.posts
        .browse({
            include: 'tags,authors',
            limit: 'all',
        })
        .catch((err) => {
            console.error(err)
        })

    collection = await Promise.all(collection.map(formatPostObject))

    // Bring featured post to the top of the list
    collection.sort((post, nextPost) => nextPost.featured - post.featured)
    
    return collection
}

module.exports = posts