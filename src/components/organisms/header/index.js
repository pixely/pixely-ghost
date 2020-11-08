import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Logo from '../../atoms/logo'
import Nav from '../../molecules/nav'

import './_header.scss'

const Header = ({ className, navItems }) => (
    <header className={cn(className, 'header')}>
        <Logo className="header__logo" />
        <Nav className="header__nav" navItems={navItems} />
    </header>
)

Header.defaultProps = {
    className: null,
}

Header.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
}

export default Header
