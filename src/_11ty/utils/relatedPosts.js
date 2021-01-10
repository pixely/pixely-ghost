const { stripDomain } = require('../utils/url')

const getRelatedPosts = async (idsToExclude = null, filter = null) => {
    const relatedPerGroup = 6
    const posts = await api.posts
        .browse({
            filter: `${filter ? `${filter}+` : ''}id:-[${idsToExclude}]`,
            fields: ['id', 'title', 'url'],
            limit: relatedPerGroup,
        })
        .catch((err) => {
            console.error(err)
        })

    const filteredPosts = posts.map((post) => {
        return {
            ...post,
            url: stripDomain(post.url),
        }
    })
  
    return filteredPosts
}

exports.getRelatedPosts = getRelatedPosts