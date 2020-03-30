import React, { Children } from 'react'
import PropTypes from 'prop-types'

import './_title.scss';

const Title = ({ children, className }) => (
  <h2 className={`${className ? `${className} ` : ''} title`}>
    {children}
  </h2>
)

Title.defaultProps = {
    // navClass: `site-nav-item`,
}

Title.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Title
