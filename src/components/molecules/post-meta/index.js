import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from '../../atoms/link'

import './_post-meta.scss'

const plur = (cur, tot) => {
    if (cur === tot - 1) {
        return ` and `
    } else if (cur < tot) {
        return `, `
    }
    return null
}

const PostMeta = ({ author, publishDate, tags }) => (
    <aside className="post-meta">
        <p className="post-meta__row">{ publishDate }</p>
        <p className="post-meta__row">
        By <Link to={`/author/${author.slug}`}>{author.name}</Link>
        </p>
        {tags.length > 0 && <p className="post-meta__row">Posted in { tags.filter(tag => tag.visibility === `public`).map((tag, index) => (
            <Fragment key={`tag-${tag.id}`}>
                <Link to={`/tag/${tag.slug}`}>{tag.name}</Link>
                {plur(index, tags.length - 1)}
            </Fragment>
        ))} </p>}
    </aside>
)

PostMeta.defaultProps = {
    tags: [],
}

PostMeta.propTypes = {
    publishDate: PropTypes.string.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        slug: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            visibility: PropTypes.string.isRequired,
        })
    ),
}

export default PostMeta
