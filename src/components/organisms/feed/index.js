import React from 'react'
import PropTypes from 'prop-types'

import Pagination from '../../molecules/pagination'
import Card from '../../organisms/card'

import './_feed.scss'
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
            <div key={node.id} className="feed__card">
                <Card post={node} />
            </div>
        ))}
        <div className="feed__pagination">
            <Pagination pageContext={pageContext} />
        </div>
    </section>
)

Feed.defaultProps = {
    posts: [],
}
Feed.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
        }),
    ),
    pageContext: PropTypes.object.isRequired,
}

export default Feed