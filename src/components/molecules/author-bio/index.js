import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../atoms/link'

import './_author-bio.scss'

// eslint-disable-next-line camelcase
const AuthorBio = ({ profile_image, name, slug, bio, facebook, twitter, website, className }) => {
    const twitterUrl = twitter ? `https://twitter.com/${twitter.replace(/^@/, ``)}` : null
    const facebookUrl = facebook ? `https://www.facebook.com/${facebook.replace(/^\//, ``)}` : null
    
    return (
        <aside className={`${className ? `${className} ` : ``}author-bio`}>
            <img
                className="author-bio__image"
                src={profile_image} // eslint-disable-line camelcase
                alt ={name} 
            />
            <div className="author-bio__info">
                <h5 className="author-bio__name">By <Link to={`/author/${slug}`} inverted>{name}</Link></h5>
                <p className="text-s">{bio}</p>
                <p className="text-s">
                    {facebook && (
                        <>
                            <Link href={facebookUrl} className="author-bio__link" inverted>{facebook}</Link> 
                            {` `}
                        </>
                    )}
                    {twitter && (
                        <>
                            <Link href={twitterUrl} className="author-bio__link" inverted>{twitter}</Link> 
                            {` `}
                        </>
                    )}
                    {website && (
                        <>
                            <Link href={website} className="author-bio__link" inverted>{website}</Link>
                            {` `}
                        </>
                    )}
                </p>
            </div>
        </aside>
    )
}

AuthorBio.defaultProps = {
    profile_image: null, 
    bio: null, 
    facebook: null, 
    twitter: null, 
    website: null, 
    className: null,
}

AuthorBio.propTypes = {
    profile_image: PropTypes.string, 
    name: PropTypes.string.isRequired, 
    slug: PropTypes.string.isRequired, 
    bio: PropTypes.string, 
    facebook: PropTypes.string, 
    twitter: PropTypes.string, 
    website: PropTypes.string, 
    className: PropTypes.string,
}

export default AuthorBio
