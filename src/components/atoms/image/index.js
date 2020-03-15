import React from 'react'
import PropTypes from 'prop-types'

import './_image.scss';

const Image = ({ className, ...props }) => (
  <img
      className={`${className ? `${className} ` : ''} image`}
      {...props}
  />
)

Image.defaultProps = {
    // navClass: `site-nav-item`,
}

Image.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Image
