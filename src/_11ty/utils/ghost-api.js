require('dotenv').config();

const ghostContentAPI = require('@tryghost/content-api');

// Init Ghost API
const api = new ghostContentAPI({
    url: process.env.GHOST_API_URL,
    key: process.env.GHOST_CONTENT_API_KEY,
    version: 'v4.0',
});

module.exports = api;