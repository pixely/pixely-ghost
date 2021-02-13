const stripDomain = url => url.replace(process.env.GHOST_API_URL, '');

exports.stripDomain = stripDomain;