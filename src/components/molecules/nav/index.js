import React from 'react'
import PropTypes from 'prop-types'

import './_nav.scss';

const Nav = ({ className }) => (
  <a
    className={`${className ? `${className} ` : ''}nav`}
    href="#"
  >
    <svg className="nav__icon" viewBox="0 0 100 80" width="40" height="30">
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
  </a>
)

Nav.defaultProps = {
    // navClass: `site-nav-item`,
}

Nav.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Nav
