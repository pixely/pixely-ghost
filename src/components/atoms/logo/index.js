import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './_logo.scss';

const Logo = ({ className }) => (
  <h1 className={`${className ? `${className} ` : ''}logo`}>
    <Link to="/" className="logo__link">
      pixely
    </Link>
  </h1>
);

Logo.defaultProps = {
    // navClass: `site-nav-item`,
}

Logo.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Logo
