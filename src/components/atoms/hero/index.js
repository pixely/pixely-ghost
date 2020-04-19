import React from 'react'
import PropTypes from 'prop-types'

import Image from '../image';

import './_hero.scss';

const Hero = ({ className, ...props }) => (
      <Image
      className={`${className ? `${className} ` : ''}hero`}
      {...props}
  />
)

Hero.defaultProps = {
    // navClass: `site-nav-item`,
}

Hero.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Hero
