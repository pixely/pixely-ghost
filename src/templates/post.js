import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PostComponent from '../components/templates/post/'

const Post = ({ data, location }) => {
    const post = data.ghostPost
    return <PostComponent post={post} data={data} location={location} displayAuthor displayMeta />
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
