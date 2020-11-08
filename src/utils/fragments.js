import { graphql } from 'gatsby'

/**
* These so called fragments are the fields we query on each template.
* A fragment make queries a bit more reuseable, so instead of typing and
* remembering every possible field, you can just use
*   ...GhostPostFields
* for example to load all post fields into your GraphQL query.
*
* Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
*
*/

// Used for tag archive pages
export const ghostTagFields = graphql`
    fragment GhostTagFields on GhostTag {
        slug
        name
        visibility
        feature_image
        featureImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                hero: fluid(maxWidth: 4000 srcSetBreakpoints: [350, 415, 730, 780, 1240, 1400, 1640, 2500, 4000]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        description
        meta_title
        meta_description
    }
`

// Used for author pages
export const ghostAuthorFields = graphql`
    fragment GhostAuthorFields on GhostAuthor {
        slug
        name
        bio
        cover_image
        coverImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                hero: fluid(maxWidth: 4000 srcSetBreakpoints: [350, 415, 730, 780, 1240, 1400, 1640, 2500, 4000]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        profile_image
        profileImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                authorCard: fluid(maxWidth: 500, srcSetBreakpoints: [70, 150, 300]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        location
        website
        twitter
        facebook
    }
`

// Used for single posts
export const ghostPostFields = graphql`
    fragment GhostPostFields on GhostPost {
        # Main fields
        id
        title
        slug
        featured
        feature_image
        featureImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                card: fluid(maxWidth: 525) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
                hero: fluid(maxWidth: 3000, srcSetBreakpoints: [350, 415, 730, 780, 1240, 1400, 2500]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        excerpt
        custom_excerpt

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        meta_title
        meta_description
        og_description
        og_image
        og_title
        twitter_description
        twitter_image
        twitter_title

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            profileImageSharp {
                colors {
                    ...GatsbyImageColors
                } 
                childImageSharp {
                    authorCard: fluid(maxWidth: 500, srcSetBreakpoints: [70, 150, 300]) {
                        ...GatsbyImageSharpFluid_withWebp
                        width: presentationWidth
                        height: presentationHeight
                    }
                }
            }
            twitter
            facebook
            website
        }

        # Tags
        primary_tag {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }
        tags {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }

        # Content
        plaintext
        html
        childHtmlRehype {
            htmlAst
        }

        # Additional fields
        url
        uuid
        codeinjection_foot
        codeinjection_head
        codeinjection_styles
        comment_id
    }
`

// Used for single pages
export const ghostPageFields = graphql`
    fragment GhostPageFields on GhostPage {
        # Main fields
        title
        slug
        featured
        feature_image
        featureImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                card: fluid(maxWidth: 525) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
                hero: fluid(maxWidth: 3000, srcSetBreakpoints: [350, 415, 730, 780, 1240, 1400, 2500]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        excerpt
        custom_excerpt

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        meta_title
        meta_description
        og_description
        og_image
        og_title
        twitter_description
        twitter_image
        twitter_title

        # Authors
        authors {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }
        primary_author {
            name
            slug
            bio
            # email
            profileImageSharp {
                colors {
                    ...GatsbyImageColors
                } 
                childImageSharp {
                    authorCard: fluid(maxWidth: 500, srcSetBreakpoints: [70, 150, 300]) {
                        ...GatsbyImageSharpFluid_withWebp
                        width: presentationWidth
                        height: presentationHeight
                    }
                }
            }
            twitter
            facebook
            website
        }

        # Tags
        primary_tag {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }
        tags {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }

        # Content
        plaintext
        html
        childHtmlRehype {
            htmlAst
        }

        # Additional fields
        url
        uuid
        page
        codeinjection_foot
        codeinjection_head
        codeinjection_styles
        comment_id
    }
`

// Used for settings
export const ghostSettingsFields = graphql`
    fragment GhostSettingsFields on GhostSettings {
        title
        description
        logo
        icon
        cover_image
        facebook
        twitter
        lang
        timezone
        codeinjection_head
        codeinjection_foot
        codeinjection_styles
        navigation {
            label
            url
        }
        secondary_navigation {
            label
            url
        }
    }
`
// Used for global author
export const ghostSiteAuthorFields = graphql`
    fragment GhostSiteAuthorFields on GhostAuthor {
        name
        slug
        bio
        # email
        profile_image
        profileImageSharp {
            colors {
                ...GatsbyImageColors
            } 
            childImageSharp {
                authorCard: fluid(maxWidth: 500, srcSetBreakpoints: [70, 150, 300]) {
                    ...GatsbyImageSharpFluid_withWebp
                    width: presentationWidth
                    height: presentationHeight
                }
            }
        }
        twitter
        facebook
        website
    }
`
