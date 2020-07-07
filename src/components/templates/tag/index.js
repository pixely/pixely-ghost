import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Hero from '../../atoms/hero'
import Title from '../../atoms/title'
import Feed from '../../organisms/feed'

import './_tag.scss'
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
                {tag.description && <p className="tag__description">{tag.description}</p> }
                <div className="tag__image">
                    {tag.feature_image && (
                        <Hero
                            alt={tag.name}
                            {...tag.featureImageSharp?.childImageSharp?.hero}
                            backgroundColor={tag.featureImageSharp?.colors?.muted}
                            sizes="(min-width: 575px) calc(100vw - 40px), calc(100vw - 10px)"
                        /> 
                    )}
                </div>
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
        ghostTag: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            feature_image: PropTypes.string,
            featureImageSharp: PropTypes.object,
        }),
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Tag