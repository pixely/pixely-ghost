const { stripDomain } = require('../utils/url')
const { getRelatedPosts } = require('../utils/relatedPosts')
const { formatHtml } = require('../utils/html')
const { generateImage } = require('../utils/image')

const stripDomainsFromTag = (tag) => {
    return {
        ...tag,
        url: stripDomain(tag.url),
    }
}

const formatPostObject = async (post) => {
    post.url = stripDomain(post.url)
    post.primary_author.url = stripDomain(post.primary_author.url)
  
    post.tags = post.tags?.map(stripDomainsFromTag)
    
    if (post.primary_tag) {
        post.primary_tag = stripDomainsFromTag(post.primary_tag)
    }
    
    post.keywords = post.tags?.map(tag => tag.name)

    // Add in related content based on the primary tag
    post.related = await getRelatedPosts(post.id, `tag:${post.primary_tag?.slug}`)

    // Get latest posts, excluding the current post and any other related posts
    const postsToExclude = post.related.reduce((acc, cur) => `${acc}, ${cur.id}`, post.id)
    post.latest = await getRelatedPosts(postsToExclude)
  
    // Convert publish date into a Date object
    post.published_at = new Date(post.published_at)
  
    // Resize featured image
    if (post.feature_image) {
        post.feature_image_resized = await generateImage(post.feature_image, 800)
    }

    // Format HTML content
    post.html = await formatHtml(post.html)

    return post
}

exports.formatPostObject = formatPostObject
