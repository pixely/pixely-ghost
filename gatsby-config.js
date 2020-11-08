const path = require(`path`)

const config = require(`./src/utils/siteConfig`)
const generateRSSFeed = require(`./src/utils/rss/generate-feed`)

let ghostConfig

try {
    ghostConfig = require(`./.ghost`)
} catch (e) {
    ghostConfig = {
        production: {
            apiUrl: process.env.GHOST_API_URL,
            contentApiKey: process.env.GHOST_CONTENT_API_KEY,
        },
    }
} finally {
    const { apiUrl, contentApiKey } = process.env.NODE_ENV === `development` ? ghostConfig.development : ghostConfig.production

    if (!apiUrl || !contentApiKey || contentApiKey.match(/<key>/)) {
        throw new Error(`GHOST_API_URL and GHOST_CONTENT_API_KEY are required to build. Check the README.`) // eslint-disable-line
    }
}

/**
* This is the place where you can tell Gatsby which plugins to use
* and set them up the way you want.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/gatsby-config/
*
*/
module.exports = {
    siteMetadata: {
        siteUrl: config.siteUrl,
    },
    plugins: [
        /**
         *  Content Plugins
         */
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: path.join(__dirname, `src`, `pages`),
                name: `pages`,
            },
        },
        {
            resolve: `jamify-source-ghost`,
            options: {
                ghostConfig: process.env.NODE_ENV === `development`
                    ? ghostConfig.development
                    : ghostConfig.production,
                cacheResponse: false,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-extract-image-colors`,
        {
            resolve: `gatsby-plugin-ghost-images`,
            options: {
                // An array of node types and image fields per node
                // Image fields must contain a valid absolute path to the image to be downloaded
                lookup: [
                    {
                        type: `GhostPost`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostPage`,
                        imgTags: [`feature_image`],
                    },
                    {
                        type: `GhostSettings`,
                        imgTags: [`cover_image`],
                    },
                    {
                        type: `GhostAuthor`,
                        imgTags: [`cover_image`, `profile_image`],
                    },
                    {
                        type: `GhostTag`,
                        imgTags: [`feature_image`],
                    },
                ],
                // Additional condition to exclude nodes
                // Takes precedence over lookup
                exclude: node => (
                    node.ghostId === undefined
                ),
                // Additional information messages useful for debugging
                verbose: false,
                // Option to disable the module (default: false)
                disable: false,
            },
        },
        {
            resolve: `gatsby-transformer-rehype`,
            options: {
                filter: node => (
                    node.internal.type === `GhostPost` || node.internal.type === `GhostPage`
                ),
                plugins: [
                    {
                        resolve: `gatsby-rehype-ghost-links`,
                    },
                    {
                        resolve: `gatsby-rehype-inline-images`,
                        // all options are optional and can be omitted
                        options: {
                            // all images larger are scaled down to maxWidth (default: maxWidth = imageWidth)
                            maxWidth: 4000,
                            srcSetBreakpoints: [365, 750, 810, 1225, 1620, 1640, 2450, 3300],
                            withWebp: true,
                            // disable, if you need to save memory
                            useImageCache: true,
                        },
                    },
                ],
            },
        },
        /**
         *  Utility Plugins
         */
        {
            resolve: `gatsby-plugin-ghost-manifest`,
            options: {
                short_name: config.shortTitle,
                start_url: `/`,
                background_color: config.backgroundColor,
                theme_color: config.themeColor,
                display: `minimal-ui`,
                icon: `static/${config.siteIcon}`,
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                query: `
                {
                    allGhostSettings {
                        edges {
                            node {
                                title
                                description
                            }
                        }
                    }
                }
              `,
                feeds: [
                    {
                        title: `Pixely`,
                        ...generateRSSFeed(config),
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-advanced-sitemap`,
            options: {
                query: `
                {
                    allGhostPost {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostPage {
                        edges {
                            node {
                                id
                                slug
                                updated_at
                                created_at
                                feature_image
                            }
                        }
                    }
                    allGhostTag {
                        edges {
                            node {
                                id
                                slug
                                feature_image
                            }
                        }
                    }
                    allGhostAuthor {
                        edges {
                            node {
                                id
                                slug
                                profile_image
                            }
                        }
                    }
                }`,
                mapping: {
                    allGhostPost: {
                        sitemap: `posts`,
                    },
                    allGhostTag: {
                        sitemap: `tags`,
                    },
                    allGhostAuthor: {
                        sitemap: `authors`,
                    },
                    allGhostPage: {
                        sitemap: `pages`,
                    },
                },
                exclude: [
                    `/dev-404-page`,
                    `/404`,
                    `/404.html`,
                    `/offline-plugin-app-shell-fallback`,
                ],
                createLinkInHead: true,
            },
        },
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-force-trailing-slashes`,
        `gatsby-plugin-offline`,
        `gatsby-plugin-sass`,
        ...(process.env.NODE_ENV === 'development' ?
            [
                `gatsby-plugin-eslint`,
                {
                    resolve: `@danbruegge/gatsby-plugin-stylelint`,
                    options: { files: [`**/**.scss`] },
                },
            ] : []),
    ],
}
