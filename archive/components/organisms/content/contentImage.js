import React from 'react'
import PropTypes from 'prop-types'
import Image from '../../atoms/image'

const ImgSharpInline = ({ parentClassName, fluidImg, alt }) => {
    const fluid = fluidImg && JSON.parse(fluidImg)
    const sizes = {
        normal: '(min-width: 575px) calc(50vw - 40px), 100vw',
        wide: '(min-width: 575px) calc(75vw - 40px), 100vw',
        full: '(min-width: 575px) calc(100vw - 40px), 100vw',
    }
    let width = 'normal'
    width = parentClassName.includes('kg-width-full') ? 'full' : width
    width = parentClassName.includes('kg-width-wide') ? 'wide' : width
    const imageProps = {
        src: fluid?.src,
        srcSet: fluid?.srcSet,
        srcSetWebp: fluid?.srcSetWebp,
        sizes: sizes[width],
        width: fluid?.presentationWidth,
        height: fluid?.presentationHeight,
        alt,
    }
    return (
        <Image { ...imageProps } />
    )
}

ImgSharpInline.defaultProps = {
    parentClassName: null,
    alt: null,
}

ImgSharpInline.propTypes = {
    parentClassName: PropTypes.string,
    fluidImg: PropTypes.string,
    alt: PropTypes.string,
}

export default ImgSharpInline