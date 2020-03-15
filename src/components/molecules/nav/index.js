import React from 'react'
import PropTypes from 'prop-types'

import './_nav.scss';

const Nav = ({ className }) => (
  <a
    className={`${className ? `${className} ` : ''}nav`}
    href="#"
  >
    ☰
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
