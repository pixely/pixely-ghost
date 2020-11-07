import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Base from '../templates/base'

import config from '../../utils/siteConfig'

// Styles
import '../../styles/main.scss'

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node

    return (
        <Fragment>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <script>{`${site.codeinjection_head}`}</script>
                <body className={`base${bodyClass ? ` base--${bodyClass}` : ``} ${bodyClass}`} />
                <link href="https://fonts.googleapis.com/css2?family=Anonymous+Pro&family=Karla:ital,wght@0,400;0,700;1,400&family=Rubik:ital,wght@0,700;1,400;1,700&display=swap" rel="stylesheet"></link>
            </Helmet>
            <Base data={data} config={config} isHome={isHome}>
                {children}
            </Base>
        </Fragment>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
