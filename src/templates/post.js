import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import PostComponent from '../components/templates/post/';

const Post = ({ data, location }) => {
    const post = data.ghostPost
    return <PostComponent post={post} data={data} location={location} />;
};

export default Post;

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
