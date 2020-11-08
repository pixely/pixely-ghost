import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Link from '../../atoms/link'
import Image from '../../atoms/image'

import './_author-bio.scss'

// eslint-disable-next-line camelcase
const AuthorBio = ({ profileImageSharp, name, slug, bio, facebook, twitter, website, className, box, hideSocial }) => {
    const twitterUrl = twitter ? `https://twitter.com/${twitter.replace(/^@/, ``)}` : null
    const facebookUrl = facebook ? `https://www.facebook.com/${facebook.replace(/^\//, ``)}` : null
    
    return (
        <aside className={cn(className, 'author-bio', { 'author-bio--boxed': box })}>
            <Image
                className="author-bio__image"
                alt={name}
                {...profileImageSharp?.childImageSharp?.authorCard} // eslint-disable-line camelcase
                backgroundColor={profileImageSharp?.colors?.muted} // eslint-disable-line camelcase
                sizes="(min-width: 575px) 10vw, calc(18vw - 10px)"
            />
            <div className="author-bio__info">
                <h5 className="author-bio__name">By <Link to={`/author/${slug}`} inverted={box}>{name}</Link></h5>
                <p className="text-s">{bio}</p>
                {!hideSocial && (
                    <p className="text-s">
                        {facebook && (
                            <>
                                <Link href={facebookUrl} className="author-bio__link" inverted={box}>{facebook}</Link> 
                                {` `}
                            </>
                        )}
                        {twitter && (
                            <>
                                <Link href={twitterUrl} className="author-bio__link" inverted={box}>{twitter}</Link> 
                                {` `}
                            </>
                        )}
                        {website && (
                            <>
                                <Link href={website} className="author-bio__link" inverted={box}>{website}</Link>
                                {` `}
                            </>
                        )}
                    </p>
                )}
            </div>
        </aside>
    )
}

AuthorBio.defaultProps = {
    profileImageSharp: {},
    bio: null, 
    facebook: null, 
    twitter: null, 
    website: null, 
    className: null,
    box: false,
    hideSocial: false,
}

AuthorBio.propTypes = {
    profileImageSharp: PropTypes.object, 
    name: PropTypes.string.isRequired, 
    slug: PropTypes.string.isRequired, 
    bio: PropTypes.string, 
    facebook: PropTypes.string, 
    twitter: PropTypes.string, 
    website: PropTypes.string, 
    className: PropTypes.string,
    box: PropTypes.bool,
    hideSocial: PropTypes.bool,
}

export default AuthorBio
