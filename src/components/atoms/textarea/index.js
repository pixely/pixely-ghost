import React from 'react'
import PropTypes from 'prop-types'

import './_textarea.scss'

const Textarea = ({ className, ...props }) => (
    <textarea
        className={`${className ? `${className} ` : ``} textarea`}
        {...props}
    />
)

Textarea.defaultProps = {
    className: null,
    type: 'text',
}

Textarea.propTypes = {
    className: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
}

export default Textarea
