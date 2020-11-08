import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './_button.scss'

const Button = ({ children, className, ...props }) => (
    <button
        className={cn(className, 'button', 'text-s')}
        {...props}
    >
        {children}
    </button>
)

Button.defaultProps = {
    className: null,
    type: 'button',
}

Button.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
}

export default Button
