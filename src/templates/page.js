import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single page (/:slug)
*
* This file renders a single page and loads all the content.
*
*/
import PostComponent from '../components/templates/post/';

const Page = ({ data, location }) => {
    const page = data.ghostPage
    return <PostComponent post={page} data={data} location={location} />;
};

Page.propTypes = {
    data: PropTypes.shape({
        ghostPage: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Page

export const postQuery = graphql`
    query($slug: String!) {
        ghostPage(slug: { eq: $slug }) {
            ...GhostPageFields
        }
    }
`
