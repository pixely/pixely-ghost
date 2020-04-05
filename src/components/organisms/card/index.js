import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

import Image from '../../atoms/image';

import './_card.scss';

const Card = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    const MetaItem = ({children}) => (
        <span className="card__meta-item">
            {children}
        </span>
    )

    return (
        <Link to={url} className={`card${post.featured ? ' card--featured' : ''}`}>
            {post.feature_image &&
                <Image 
                    className="card__image"
                    src={post.feature_image}
                    alt={post.title}
                />
            }
            <div className="card__body">
                <h4 className={`card__title${post.featured ? ' text--inverted' : ''}`}>{post.title}</h4>
                <p className="card__meta">
                    {/* {post.featured && <MetaItem>Featured</MetaItem>} */}
                    <MetaItem>{post.published_at_pretty}</MetaItem>
                    <MetaItem>{readingTime}</MetaItem>
                    {/* <MetaItem key={`${post.id}-author`}>{post.primary_author.name}</MetaItem> */}
                    {post.tags.length > 0 && <MetaItem><Tags post={post} visibility="public" autolink={false} /></MetaItem>}
                </p>
                <p>{post.excerpt}</p>
            </div>
        </Link>
    )
}

Card.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
}

export default Card
