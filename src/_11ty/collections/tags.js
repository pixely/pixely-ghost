const api = require('../utils/ghost-api');
const { stripDomain } = require('../utils/url');

const tags = async (collection) => {
    collection = await api.tags
        .browse({
            include: 'count.posts',
            limit: 'all',
        })
        .catch((err) => {
            console.error(err);
        });

    // Get all posts with their tags attached
    const posts = await api.posts
        .browse({
            include: 'tags,authors',
            limit: 'all',
        })
        .catch((err) => {
            console.error(err);
        });

    // Attach posts to their respective tags
    collection.forEach(async (tag) => {
        const taggedPosts = posts.filter((post) => {
            post.url = stripDomain(post.url);
            return post.primary_tag && post.primary_tag.slug === tag.slug;
        });
        if (taggedPosts.length) {
            tag.posts = taggedPosts;
        }

        tag.url = stripDomain(tag.url);
    });

    return collection;
};

module.exports = tags;