import React from 'react'
import PropTypes from 'prop-types'

import './_content.scss'

const Content = ({ html, className }) => (
    <section
        className={`${className ? `${className} ` : ``} load-external-scripts content`}
        dangerouslySetInnerHTML={{ __html: html }}
    />
)

Content.defaultProps = {
    className: null,
}

Content.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string.isRequired,
}

export default Content
