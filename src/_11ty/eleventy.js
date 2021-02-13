require('dotenv').config();

const { readFileSync } = require('fs');
const pluginRSS = require('@11ty/eleventy-plugin-rss');
const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');
const sitemap = require('@quasibit/eleventy-plugin-sitemap');
const schema = require('@quasibit/eleventy-plugin-schema');

const htmlMinTransform = require('./transforms/html');
const { getFormattedTime, getRFC822Date } = require('./filters/getFormattedTime');
const { getReadingTime } = require('./filters/getReadingTime');
const { getTags } = require('./filters/getTags');
const { htmlDateString } = require('./filters/htmlDateString');
const { stripDomain } = require('./filters/stripDomain');
const { getResizedImage } = require('./filters/getResizedImage');
const responsiveImage = require('./shortcodes/responsiveImage');
const collections = require('./collections');

module.exports = function (config) {
    // Don't ignore the same files ignored in the git repo
    config.setUseGitIgnore(false);

    config.addTransform('htmlmin', htmlMinTransform);

    config.addPlugin(eleventyHelmetPlugin);
    config.addPlugin(cacheBuster({ outputDirectory: './dist' }));
    config.addPlugin(pluginRSS);
    config.addPlugin(sitemap, {
        sitemap: {
            hostname: process.env.SITE_URL,
        },
    });
    config.addPlugin(schema);

    config.addFilter('stripDomain', stripDomain);
    config.addFilter('getReadingTime', getReadingTime);
    config.addFilter('getTags', getTags);
    config.addFilter('getFormattedTime', getFormattedTime);
    config.addFilter('getRFC822Date', getRFC822Date);
    config.addFilter('htmlDateString', htmlDateString);
    config.addLiquidFilter('getResizedImage', getResizedImage);

    config.addShortcode('responsiveimage', responsiveImage);

    config.addCollection('docs', collections.docs);
    config.addCollection('posts', collections.posts);
    config.addCollection('authors', collections.authors);
    config.addCollection('tags', collections.tags);

    // Display 404 page in BrowserSnyc
    config.setBrowserSyncConfig({
        callbacks: {
            ready: (err, bs) => {
                const content404 = readFileSync('dist/404.html');

                bs.addMiddleware('*', (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content404);
                    res.end();
                });
            },
        },
    });

    config.setLiquidOptions({
        dynamicPartials: true,
        strict_filters: true,
    });
    
    config.addPassthroughCopy('src/images');

    // Eleventy configuration
    return {
        dir: {
            input: 'src',
            output: 'dist',
        },

        // Files read by Eleventy, add as needed
        templateFormats: ['css', 'njk', 'liquid', 'md', 'html', 'txt', 'ico', 'png'],
        htmlTemplateEngine: 'liquid',
        markdownTemplateEngine: 'liquid',
        passthroughFileCopy: true,
    };
};