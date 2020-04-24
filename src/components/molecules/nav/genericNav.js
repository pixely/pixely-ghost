import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const GenericNav = ({ navItems, navClass }) => (
    <>
        {navItems.map((navItem, i) => {
            if (navItem.url.match(/^\s?http(s?)/gi)) {
                return <a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
            } else {
                return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>
            }
        })}
    </>
)

GenericNav.defaultProps = {
    navClass: null,
}

GenericNav.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    navClass: PropTypes.string,
}

export default GenericNav
