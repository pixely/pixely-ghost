import React, { Fragment } from 'react'

import './_masthead.scss'

/**
* Navigation component
*
* The Navigation component takes an array of your Ghost
* navigation property that is fetched from the settings.
* It differentiates between absolute (external) and relative link (internal).
* You can pass it a custom class for your own styles, but it will always fallback
* to a `site-nav-item` class.
*
*/

const Masthead = () => (
    <Fragment>
        <header className="masthead">
            <h1 className="masthead__logo"><a href="/">pixely</a></h1>
        </header>
        <div className="masthead masthead--background" />
        <div className="masthead masthead--shadows" />
    </Fragment>
)

export default Masthead
