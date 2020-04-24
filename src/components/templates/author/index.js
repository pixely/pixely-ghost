import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Image from '../../atoms/image'
import Title from '../../atoms/title'
import Link from '../../atoms/link'
import Feed from '../../organisms/feed'

import './_author.scss'
/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges
    const twitterUrl = author.twitter ? `https://twitter.com/${author.twitter.replace(/^@/, ``)}` : null
    const facebookUrl = author.facebook ? `https://www.facebook.com/${author.facebook.replace(/^\//, ``)}` : null
    
    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="series"
            />
            <Layout bodyClass="author">
                <Title className="author__title">{author.name}</Title>
                {author.bio && <div className="author__bio">
                    {author.profile_image && <Image src={author.profile_image} alt={author.name} className="author__profile-image" />}
                    {author.bio && <p className="text">{author.bio}</p>}
                    <p className="text-s">
                        {author.facebook && (
                            <>
                                <Link href={facebookUrl} className="author-bio__link">{author.facebook}</Link> 
                                {` `}
                            </>
                        )}
                        {author.twitter && (
                            <>
                                <Link href={twitterUrl} className="author-bio__link">{author.twitter}</Link> 
                                {` `}
                            </>
                        )}
                        {author.website && (
                            <>
                                <Link href={author.website} className="author-bio__link">{author.website}</Link>
                                {` `}
                            </>
                        )}
                    </p>
                </div> }
                {author.cover_image ? <Image src={author.cover_image} alt={author.name} className="author__image" /> : <div className="author__image" /> }
                <div className="author__feed">
                    <Feed posts={posts} pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string,
            profile_image: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
            website: PropTypes.string,
            cover_image: PropTypes.string,
        }),
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author