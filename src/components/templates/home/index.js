import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Feed from '../../organisms/feed';

import './_home.scss';
/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Home = ({ data, location, pageContext }) => {
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData location={location} />
            <Layout bodyClass="home" isHome={true}>
                <div className="home__feed">
                    <Feed posts={posts} pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Home.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Home