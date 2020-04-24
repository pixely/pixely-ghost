import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './_logo.scss'

const Logo = ({ className }) => (
    <h1 className={`${className ? `${className} ` : ``}logo`}>
        <Link to="/" className="logo__link">
        pixely
        </Link>
    </h1>
)

Logo.defaultProps = {
    className: null,
}

Logo.propTypes = {
    className: PropTypes.string,
}

export default Logo
