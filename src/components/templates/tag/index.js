import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Image from '../../atoms/image';
import Title from '../../atoms/title';
import Feed from '../../organisms/feed';

import './_tag.scss';
/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Tag = ({ data, location, pageContext }) => {
    const tag = data.ghostTag
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout bodyClass="tag">
                <Title className="tag__title">{tag.name}</Title>
                {tag.description ? <p className="tag__description">{tag.description}</p> : null }
                {tag.feature_image && <Image src={tag.feature_image} alt={tag.name} className="tag__image" /> }
                <div className="tag__feed">
                    <Feed posts={posts} pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Tag