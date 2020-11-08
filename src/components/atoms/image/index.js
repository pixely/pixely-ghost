import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import './_image.scss'

const Image = ({
    className,
    src,
    srcSet,
    srcSetWebp,
    sizes,
    height,
    width,
    loading,
    alt,
    base64,
    blurUp,
    backgroundColor,
}) => (
    <picture>
        {blurUp && base64 && (
            <div style={{ backgroundImage: `url(${base64})` }} />
        )}
        {srcSetWebp && (
            <>
                <source
                    type="image/webp"
                    srcSet={srcSetWebp}
                    sizes={sizes}
                />
                <source
                    type="image/jpeg"
                    srcSet={srcSet}
                    sizes={sizes}
                />
            </>
        )}
        <img
            className={cn(className, 'image')}
            {...{
                src,
                srcSet,
                sizes,
                loading,
                height,
                width,
                alt,
                style: (backgroundColor && { backgroundColor }),
            }}
        />
    </picture>
)

Image.defaultProps = {
    className: null,
    alt: null,
    loading: `lazy`,
    srcSet: null,
    srcSetWebp: null,
    sizes: null,
    height: null,
    width: null,
    base64: null,
    blurUp: false,
    backgroundColor: null,
}

Image.propTypes = {
    className: PropTypes.string,
    src: PropTypes.string.isRequired,
    srcSet: PropTypes.string,
    srcSetWebp: PropTypes.string,
    sizes: PropTypes.string,
    alt: PropTypes.string,
    loading: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    base64: PropTypes.string,
    blurUp: PropTypes.bool,
    backgroundColor: PropTypes.string,
}

export default Image
