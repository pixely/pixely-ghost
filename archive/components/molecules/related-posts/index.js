import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Link from '../../atoms/link'

import './_related-posts.scss'

const RelatedPosts = ({ title, tag, posts, className }) => {
    const Title = title || (tag && <>Also on <Link to={`/tag/${tag.slug}`}>{tag.name}</Link></>)
    if (!posts) { 
        return null 
    }
    return (
        <aside className={cn(className, 'related-posts')}>
            {Title && (<h5 className="related-posts__title text">{Title}</h5>)}
            <ul className="related-posts__items">
                {posts.map(post => (
                    <li key={post.id} className="text-s related-posts__item">
                        <Link to={`/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul> 
        </aside>
    )
}

RelatedPosts.defaultProps = {
    className: null,
    tag: null,
    posts: null,
    title: null,
}

RelatedPosts.propTypes = {
    title: PropTypes.string,
    tag: PropTypes.object,
    posts: PropTypes.array,
    className: PropTypes.string,
}

export default RelatedPosts
