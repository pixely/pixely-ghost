import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PostComponent from '../components/templates/post/'

const Post = ({ data, location }) => {
    const post = data.ghostPost
    const related = data.related.edges.map(relatedPost => relatedPost.node)
    const latest = data.latest.edges.map(latestPost => latestPost.node)
    return <PostComponent post={post} related={related} latest={latest} data={data} location={location} displayAuthor displayMeta />
}

Post.defaultProps = {
    related: {
        edges: [],
    },
    latest: {
        edges: [],
    },
}
Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
        related: PropTypes.shape({
            edges: PropTypes.array.isRequired,
        }),
        latest: PropTypes.shape({
            edges: PropTypes.array.isRequired,
        }),
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!, $tag: String) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
        related: allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: { 
                tags: { 
                    elemMatch: {
                        slug: {
                            eq: $tag 
                        }
                    }
                }
                slug: { ne: $slug }
            },
            limit: 6,
            skip: 0,
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
        latest: allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: { 
                tags: { elemMatch: { slug: { ne: $tag }}}
                slug: { ne: $slug }
            },
            limit: 6,
            skip: 0,
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
