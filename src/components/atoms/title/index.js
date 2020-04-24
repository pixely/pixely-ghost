import React from 'react'
import PropTypes from 'prop-types'

import './_title.scss'

const Title = ({ children, className }) => (
    <h2 className={`${className ? `${className} ` : ``} title`}>
        {children}
    </h2>
)

Title.defaultProps = {
    className: null,
}

Title.propTypes = {
    className: PropTypes.string,
    children: PropTypes.nodeList.isRequired,
}

export default Title
