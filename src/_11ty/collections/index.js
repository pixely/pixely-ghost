const authors = require('./authors');
const tags = require('./tags');
const posts = require('./posts');
const docs = require('./docs');

const collections = {
    authors,
    tags,
    posts,
    docs,
};

module.exports = collections;