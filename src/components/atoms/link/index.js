import React from 'react'
import PropTypes from 'prop-types'

import './_link.scss';

const Link = ({ href, className, children, inverted }) => (
  <a
    className={`${className ? `${className} ` : ''} link ${inverted ? 'link--inverted' : null}`}
    href={href}
  >
    {children}
  </a>
)

Link.defaultProps = {
    // navClass: `site-nav-item`,
}

Link.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Link
