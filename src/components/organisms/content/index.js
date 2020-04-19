import React from 'react'
import PropTypes from 'prop-types'

import './_content.scss';

const Content = ({ html, className }) => (
  <section
      className={`${className ? `${className} ` : ''} load-external-scripts content`}
      dangerouslySetInnerHTML={{ __html: html }}
  />
)

Content.defaultProps = {
    // navClass: `site-nav-item`,
}

Content.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Content
