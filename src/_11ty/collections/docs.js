const api = require('../utils/ghost-api');
const { formatPostObject } = require('../utils/post');

const docs = async (collection) => {
    collection = await api.pages
        .browse({
            include: 'authors',
            limit: 'all',
        })
        .catch((err) => {
            console.error(err);
        });

    collection = await Promise.all(collection.map(formatPostObject));

    return collection;
};

module.exports = docs;