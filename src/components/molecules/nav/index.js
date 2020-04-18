import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import GenericNav from './genericNav';

import './_nav.scss';

const Nav = ({ className, navItems }) => {
  const [menuActive, setMenu] = useState(false);

  return (
    <>
      <button
        className={`${className ? `${className} ` : ''}nav${menuActive ? ' is-open' : ''}`}
        onClick={() => setMenu(!menuActive)}
        aria-label="Open main menu"
      >
        <span className="nav__icon-bar"></span>
        <span className="nav__icon-bar"></span>
        <span className="nav__icon-bar"></span>
        <span className="nav__icon-bar"></span>
      </button>
      <nav className={`nav__menu${menuActive ? ' is-open' : ''}`}>
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
        <GenericNav navItems={navItems} navClass="nav__menu-item" />
      </nav>
    </>
  )
}

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
