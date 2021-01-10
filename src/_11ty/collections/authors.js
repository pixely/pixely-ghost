const api = require('../utils/ghost-api')
const { stripDomain } = require('../utils/url')

const authors = async (collection) => {
    collection = await api.authors
        .browse({
            limit: 'all',
        })
        .catch((err) => {
            console.error(err)
        })

    // Get all posts with their authors attached
    const posts = await api.posts
        .browse({
            include: 'authors',
            limit: 'all',
        })
        .catch((err) => {
            console.error(err)
        })

    // Attach posts to their respective authors
    collection.forEach(async (author) => {
        const authorsPosts = posts.filter((post) => {
            post.url = stripDomain(post.url)
            return post.primary_author.id === author.id
        })
        if (authorsPosts.length) {
            author.posts = authorsPosts
        }

        author.url = stripDomain(author.url)
    })

    return collection
}

module.exports = authors
