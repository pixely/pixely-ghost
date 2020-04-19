import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Image from '../../atoms/image';
import Title from '../../atoms/title';
import Link from '../../atoms/link';
import Feed from '../../organisms/feed';

import './_author.scss';
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
                            <Link href={`https://facebook.com/${author.facebook}`} className="author-bio__link">{author.facebook}</Link> 
                            {' '}
                            </>
                        )}
                        {author.twitter && (
                            <>
                            <Link href={`https://twitter.com/${author.twitter}`} className="author-bio__link">{author.twitter}</Link> 
                            {' '}
                            </>
                        )}
                        {author.website && (
                            <>
                            <Link href={author.website} className="author-bio__link">{author.website}</Link>
                            {' '}
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
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author