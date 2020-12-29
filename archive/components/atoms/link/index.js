import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import cn from 'classnames'

import './_link.scss'

const Link = ({ href, to, className, children, inverted, ...props }) => {
    const linkProps = {
        className: cn(className, 'link', { 'link--inverted': inverted }),
        ...props,
    }
    return (
        to ? 
            <GatsbyLink {...linkProps} to={to}>{children}</GatsbyLink> :
            <a {...linkProps} href={href}>{children}</a>
    )
}

Link.defaultProps = {
    href: null,
    to: null,
    className: null,
    inverted: false,
}

Link.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    className: PropTypes.string,
    inverted: PropTypes.bool,
}

export default Link
