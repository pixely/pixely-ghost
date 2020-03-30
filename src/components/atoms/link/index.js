import React from 'react';
import PropTypes from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';

import './_link.scss';

const Link = ({ href, to, className, children, inverted, ...props }) => {
  const linkProps = {
    className: `${className ? `${className} ` : ''}link${inverted ? ' link--inverted' : ''}`,
    ...props,
  };
  return (
    to ? 
    <GatsbyLink {...linkProps} to={to}>{children}</GatsbyLink> :
    <a {...linkProps} href={href}>{children}</a>
  );
}

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
