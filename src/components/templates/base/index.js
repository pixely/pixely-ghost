import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from '../../organisms/header'
import Footer from '../../organisms/footer'

import './_base.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const Base = ({ config, children }) => (
    <Fragment>
        <div className="base__inner">
            <Header className="base__header" navItems={config.navigation} />
            {children}
            <Footer className="base__footer" navItems={config.secondary_navigation} author={config.author} />
        </div>
    </Fragment>
)

Base.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    config: PropTypes.shape({
        navigation: PropTypes.array.isRequired,
        secondary_navigation: PropTypes.array.isRequired,
        author: PropTypes.object.isRequired,
    }).isRequired,
}

export default Base
