import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../atoms/link';

import './_post-meta.scss';

const plur = (cur, tot) => {
    if(cur === tot - 1) {
        return ' and ';
    } else if (cur < tot) {
        return ', ';
    }
    return null;
};

const PostMeta = ({ author, publishDate, tags }) => (
  <aside className="post-meta">
      <p className="post-meta__row">{ publishDate }</p>
      <p className="post-meta__row">
        By <Link href={`/author/${author.slug}`}>{author.name}</Link>
      </p>
      {tags.length > 0 && <p className="post-meta__row">Posted in { tags.filter(tag => tag.visibility == "public").map((tag, index) => (
          <>
          <Link href={`/tag/${tag.slug}`}>{tag.name}</Link>
          {plur(index, tags.length-1)}
          </>
      ))} </p>}
  </aside>
)

PostMeta.defaultProps = {
    // navClass: `site-nav-item`,
}

PostMeta.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default PostMeta
