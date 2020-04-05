import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../atoms/link';

import './_author-bio.scss';

const AuthorBio = ({ profile_image, name, slug, bio, facebook, twitter, website, className }) => (
  <aside className={`${className ? `${className} ` : ''}author-bio`}>
        <img
            className="author-bio__image"
            src={profile_image} 
            alt ={name} 
        />
        <div class="author-bio__info">
            <h5 className="author-bio__name">By <Link to={`/author/${slug}`} inverted>{name}</Link></h5>
            <p className="text-s">{bio}</p>
            <p className="text-s">
              {facebook && (
                <>
                  <Link href={`https://facebook.com/${facebook}`} className="author-bio__link" inverted>{facebook}</Link> 
                  {' '}
                </>
              )}
              {twitter && (
                <>
                  <Link href={`https://twitter.com/${twitter}`} className="author-bio__link" inverted>{twitter}</Link> 
                  {' '}
                </>
              )}
              {website && (
                <>
                  <Link href={website} className="author-bio__link" inverted>{website}</Link>
                  {' '}
                </>
              )}
            </p>
        </div>
  </aside>
)

AuthorBio.defaultProps = {
    // navClass: `site-nav-item`,
}

AuthorBio.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default AuthorBio
