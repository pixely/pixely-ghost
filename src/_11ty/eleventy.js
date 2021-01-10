require("dotenv").config();

const fs = require("fs");

const pluginRSS = require("@11ty/eleventy-plugin-rss");
const image = require("@11ty/eleventy-img");
const ghostContentAPI = require("@tryghost/content-api");
const ghostHelpers = require("@tryghost/helpers");
const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const cacheBuster = require('@mightyplow/eleventy-plugin-cache-buster');

// Rehype related dependencies
const rehype = require('rehype');
const format = require('rehype-format');
const partials = require('rehype-partials');
const { Liquid } = require('liquidjs');
const visit = require('unist-util-visit');
const is = require('hast-util-is-element');


const htmlMinTransform = require("../transforms/html-min-transform.js");
const { resolve, extname } = require("path");

// Init Ghost API
const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

// Strip Ghost domain from urls
const stripDomain = url => {
  return url.replace(process.env.GHOST_API_URL, "");
};

const generateSrcsetWidths = (srcset) => {
  // Standard config options
  const dpiSizes = [1, 2, 3];
  const newSizes = [];

  if (typeof srcset === 'string') {
    srcset = srcset.split(',');
  }

  // From the srcset sizes generate extra for different retina screens
  srcset.forEach(size => {
    dpiSizes.forEach(dpi => {
      newSizes.push(size * dpi);
    });
  });

  const dedupedSizes = [...new Set(newSizes)];
  const sortedSizes = dedupedSizes.sort((a, b) => a - b);
  
  return sortedSizes;
};

// const formats = ["webp", "jpeg", "avif","svg"];
const generateImages = (src, srcset, formats=["webp","jpeg"]) => {
  return image(src, {
      widths: srcset,
      formats,
      outputDir: "./dist/images/",
      urlPath: "/images/",
      cacheOptions: {
        duration: "1w",
      },
    });
};

const responsiveImageShortcode = async (src, alt, srcset=null, sizes, loading="lazy", className="", blurUp=false) => {
  if(!src) return null;
  
  const fullSrcset = generateSrcsetWidths(srcset);
  const resized = await generateImages(src, fullSrcset);

  const lowsrc = resized.jpeg[0];
  
  return `<picture>
      ${Object.values(resized).map(imageFormat => {
        return `  <source type="image/${imageFormat[0].format}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}" />`;
      }).join('')}
      <img src="${lowsrc.url}" width="${lowsrc.width}" height="${lowsrc.height}" loading="${loading}" alt="${alt}" class="image ${className}" decoding="async" />
    </picture>`;
};

const getRelatedPosts = async (idsToExclude = null, filter = null) => {
  const relatedPerGroup = 6;
  const posts = await api.posts
    .browse({
      filter: `${filter ? `${filter}+`: ''}id:-[${idsToExclude}]`,
      fields: ['id', 'title', 'url'],
      limit: relatedPerGroup,
    })
    .catch(err => {
      console.error(err);
    });

  const filteredPosts = posts.map(post => {
    return {
    ...post,
    url: stripDomain(post.url),
    };
  });
  
  return filteredPosts;
}

const templateHandler = (includePath, callback) => {
  try {
    const liquidEngine = new Liquid({
      cache: process.env.NODE_ENV === 'production',
      root: ['./src/_includes', '_includes'],
      extname: '.liquid',
      dynamicPartials: true,
      strict_filters: true,
    });
    const renderedMarkup = liquidEngine.renderFileSync(includePath)
    callback(null, renderedMarkup);
  } catch (e) {
    callback(e);
  }
};

const picture = () => {
  const promises = [];
  return transformer

  async function transformer(tree) {
    try {
      visit(tree, 'element', visitor);
      await Promise.all(promises);
    } catch(e) {
      throw(e);
    }
    return
  }

  function visitor(node, index, parent) {
    const supportedFileTypes = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'tiff', 'avif', 'svg'];
    const src = node.properties.src;
    let sizes = "(min-width: 575) 50vw, 90vw";
    let sizesArray = [270, 325, 360, 480, 690, 810];
    let extension;

    if (!parent || !is(node, 'img') || !src) {
      return
    }

    extension = extname(src).slice(1);

    if (!supportedFileTypes.includes(extension)) {
      return
    }

    if (parent.properties.className.includes('kg-width-full')) {
      sizes = "(min-width: 575) calc(100vw - 40px), calc(100vw - 10px)";
      sizesArray = [310, 365, 400, 728, 985, 1400, 1640];
    } else if (parent.properties.className.includes('kg-width-wide')) {
      sizes = "(min-width: 575) 75vw, 92vw";
      sizesArray = [290, 345, 380, 540, 735, 1045, 1225];
    }

    const srcsetSizes = generateSrcsetWidths(sizesArray);
    const promise = generateImages(node.properties.src, srcsetSizes).then(resized => {
      return parent.children[index] = {
        type: 'element',
        tagName: 'picture',
        properties: {},
        children: [
          ...sources(resized, sizes),
          fallbackImage(node, resized.jpeg[0]),
        ],
      }
    }).catch(e => { throw(e); });
    promises.push(promise);
  }

  function sources(images, sizes) {
    const nodes = [];
    
    Object.values(images).map(imageFormat => {
      nodes.push({
        type: 'element',
        tagName: 'source',
        properties: {
          type: imageFormat.sourceType,
          srcSet: imageFormat.map(entry => entry.srcset).join(", "),
          sizes,
        },  
        children: []
      });
    });
    return nodes;
  }

  function fallbackImage(originalNode, lowRes) {
    return {
      ...originalNode,
      properties: {
        className: [...originalNode.properties.className, "image"],
        alt: originalNode.properties.alt,
        loading: "lazy",
        width: lowRes.width,
        height: lowRes.height,
        src: lowRes.url,
      },
    };
  }
};

const formatHtml = html => {
  return rehype()
    .use(picture)
    .use(partials, { cwd: './src/_includes/', handle: templateHandler })
    .use(format)
    .process(html);
};

const formatPost = async post => {
  post.url = stripDomain(post.url);
  post.primary_author.url = stripDomain(post.primary_author.url);
  
  post.tags = post.tags?.map(tag => ({
    ...tag,
    url: stripDomain(tag.url),
  }));
  
  // Add in related content based on the primary tag
  post.related = await getRelatedPosts(post.id, `tag:${post.primary_tag?.slug}`);

  // Get latest posts, excluding the current post and any other related posts
  const postsToExclude = post.related.reduce((acc, cur) => `${acc}, ${cur.id}`, post.id);
  post.latest = await getRelatedPosts(postsToExclude);
  
  // Convert publish date into a Date object
  post.published_at = new Date(post.published_at);
  
  // Format HTML content
  post.html = await formatHtml(post.html);

  return post;
};

module.exports = function(config) {
  // Minify HTML
  config.addTransform("htmlmin", htmlMinTransform);

  config.addPlugin(eleventyHelmetPlugin);
  config.addPlugin(cacheBuster({ outputDirectory: './dist' }));

  // Assist RSS feed template
  config.addPlugin(pluginRSS);
  
  config.addFilter("stripDomain", url => {
    return stripDomain(url);
  });

  config.addFilter("getReadingTime", (text="") => {
    const wordsPerMinute = 200;
    const numberOfWords = text.toString().split(/\s/g).length;
    return `${Math.ceil(numberOfWords / wordsPerMinute)} min read`;
  });

  config.addFilter("getTags", tags => {
    return ghostHelpers.tags(tags);
  });

  config.addFilter("getRelativeTime", date => {
    return date;
  });

  config.addFilter("getFormattedTime", dateObj => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const date = new Date(dateObj);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  });

  // Date formatting filter
  config.addFilter("htmlDateString", dateObj => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Response image shortcode
  config.addShortcode("responsiveimage", responsiveImageShortcode);

  // Don't ignore the same files ignored in the git repo
  config.setUseGitIgnore(false);

  // Get all pages, called 'docs' to prevent
  // conflicting the eleventy page object
  config.addCollection("docs", async function(collection) {
    collection = await api.pages
      .browse({
        include: "authors",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    collection = await Promise.all(collection.map(formatPost));

    return collection;
  });

  // Get all posts
  config.addCollection("posts", async function(collection) {
    collection = await api.posts
      .browse({
        include: "tags,authors",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    collection = await Promise.all(collection.map(formatPost));

    // Bring featured post to the top of the list
    collection.sort((post, nextPost) => nextPost.featured - post.featured);

    return collection;
  });

  // Get all authors
  config.addCollection("authors", async function(collection) {
    collection = await api.authors
      .browse({
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    // Get all posts with their authors attached
    const posts = await api.posts
      .browse({
        include: "authors",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    // Attach posts to their respective authors
    collection.forEach(async author => {
      const authorsPosts = posts.filter(post => {
        post.url = stripDomain(post.url);
        return post.primary_author.id === author.id;
      });
      if (authorsPosts.length) author.posts = authorsPosts;

      author.url = stripDomain(author.url);
    });

    return collection;
  });

  // Get all tags
  config.addCollection("tags", async function(collection) {
    collection = await api.tags
      .browse({
        include: "count.posts",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    // Get all posts with their tags attached
    const posts = await api.posts
      .browse({
        include: "tags,authors",
        limit: "all"
      })
      .catch(err => {
        console.error(err);
      });

    // Attach posts to their respective tags
    collection.forEach(async tag => {
      const taggedPosts = posts.filter(post => {
        post.url = stripDomain(post.url);
        return post.primary_tag && post.primary_tag.slug === tag.slug;
      });
      if (taggedPosts.length) tag.posts = taggedPosts;

      tag.url = stripDomain(tag.url);
    });

    return collection;
  });

  // Display 404 page in BrowserSnyc
  config.setBrowserSyncConfig({
    callbacks: {
      ready: (err, bs) => {
        const content_404 = fs.readFileSync("dist/404.html");

        bs.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  config.setLiquidOptions({
    dynamicPartials: true,
    strict_filters: true
  });
  
  config.addPassthroughCopy("src/images");

  // Eleventy configuration
  return {
    dir: {
      input: "src",
      output: "dist"
    },

    // Files read by Eleventy, add as needed
    templateFormats: ["css", "njk", "liquid", "md", "html", "txt", "ico", "png", "scss"],
    htmlTemplateEngine: "liquid",
    markdownTemplateEngine: "liquid",
    passthroughFileCopy: true
  };
};