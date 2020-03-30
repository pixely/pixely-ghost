import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '../../molecules/pagination';
import Card from '../../organisms/card';

import './_feed.scss';
/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Feed = ({ posts, pageContext }) => (
        <section className="feed">
            {posts.map(({ node }) => (
                <div class="feed__card">
                    <Card key={node.id} post={node} />
                </div>
            ))}
            <div className="feed__pagination">
                <Pagination pageContext={pageContext} />
            </div>
        </section>
);

Feed.propTypes = {
    // data: PropTypes.shape({
    //     allGhostPost: PropTypes.object.isRequired,
    // }).isRequired,
    // location: PropTypes.shape({
    //     pathname: PropTypes.string.isRequired,
    // }).isRequired,
    // pageContext: PropTypes.object,
}

export default Feed