import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '../../common/.'
import Header from '../../organisms/header';

import './_base.scss';

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
const Base = ({ config, data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node;
    
    const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null;
    const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null;
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

export default Base;
