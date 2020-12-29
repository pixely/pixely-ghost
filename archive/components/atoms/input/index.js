import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './_input.scss'

const Input = ({ className, ...props }) => (
    <input
        className={cn(className, 'input')}
        {...props}
    />
)

Input.defaultProps = {
    className: null,
    type: 'text',
}

Input.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default Input
