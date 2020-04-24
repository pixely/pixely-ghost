import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from '../../organisms/header'

import './_base.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const Base = ({ data, children }) => {
    const site = data.allGhostSettings.edges[0].node
    
    return (
        <Fragment>
            <div className="base__inner">
                <Header className="base__header" navItems={site.navigation} />
                {children}
            </div>
        </Fragment>
    )
}

Base.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

export default Base
