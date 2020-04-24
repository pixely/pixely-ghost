import React from 'react'
import PropTypes from 'prop-types'

import Image from '../image'

import './_hero.scss'

const Hero = ({ className, ...props }) => (
    <Image
        className={`${className ? `${className} ` : ``}hero`}
        {...props}
    />
)

Hero.defaultProps = {
    className: null,
}

Hero.propTypes = {
    className: PropTypes.string,
}

export default Hero
