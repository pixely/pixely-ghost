import React from 'react'
import PropTypes from 'prop-types'

import { Layout, Pagination } from '../../common'
import { MetaData } from '../../common/meta'

import Card from '../../organisms/card';

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
            <Layout className="home" isHome={true}>
                <section className="home__feed">
                    {posts.map(({ node }) => (
                        <Card key={node.id} post={node} />
                    ))}
                </section>
                <div class="home__pagination">
                    <Pagination pageContext={pageContext} />
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