const { DateTime } = require('luxon');

exports.getFormattedTime = (dateObj) => {
    const date = DateTime.fromISO(new Date(dateObj).toISOString());
    return date.toFormat('DDD');
};

exports.getRFC822Date = (dateObj) => {
    const date = DateTime.fromISO(new Date(dateObj).toISOString());
    return date.toRFC2822();
};