import React from 'react'
import PropTypes from 'prop-types'

import Logo from '../../atoms/logo';
import Nav from '../../molecules/nav';

import './_header.scss';

const Header = ({ html, className }) => (
  <header className={`${className ? `${className} ` : ''}header`}>
    <Logo className="header__logo" />
    <Nav className="header__nav" />
  </header>
)

Header.defaultProps = {
    // navClass: `site-nav-item`,
}

Header.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Header
