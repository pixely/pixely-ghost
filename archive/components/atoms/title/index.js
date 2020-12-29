import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './_title.scss'

const Title = ({ children, className }) => (
    <h2 className={cn(className, 'title')}>
        {children}
    </h2>
)

Title.defaultProps = {
    className: null,
}

Title.propTypes = {
    className: PropTypes.string,
}

export default Title
