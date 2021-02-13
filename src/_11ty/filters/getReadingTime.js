exports.getReadingTime = (text = '') => {
    const wordsPerMinute = 200;
    const numberOfWords = text.toString().split(/\s/g).length;
    return `${Math.ceil(numberOfWords / wordsPerMinute)} min read`;
};