import React from 'react'
import PropTypes from 'prop-types'

import './_image.scss'

const Image = ({ className, ...props }) => (
    <img
        className={`${className ? `${className} ` : ``} image`}
        {...props}
    />
)

Image.defaultProps = {
    className: null,
    alt: null,
    loading: `lazy`,
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    lazy: PropTypes.string,
}
export default Image
