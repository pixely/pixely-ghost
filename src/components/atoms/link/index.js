import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

import './_link.scss';

const Link = ({ href, className, children, inverted }) => (
  <GatsbyLink
    className={`${className ? `${className} ` : ''} link ${inverted ? 'link--inverted' : null}`}
    to={href}
  >
    {children}
  </GatsbyLink>
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
