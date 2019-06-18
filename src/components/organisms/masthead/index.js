import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import './masthead.scss';

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
// const Masthead = ({ data, navClass }) => (
//     <>
//         {data.map((navItem, i) => {
//             if (navItem.url.match(/^\s?http(s?)/gi)) {
//                 return <a className={navClass} href={navItem.url} key={i} target="_blank" rel="noopener noreferrer">{navItem.label}</a>
//             } else {
//                 return <Link className={navClass} to={navItem.url} key={i}>{navItem.label}</Link>
//             }
//         })}
//     </>
// )

const Masthead = () => (
  <Fragment>
    <header class="masthead">
      <h1 class="masthead__logo"><a href="/">pixely</a></h1>
    </header>
    <div class="masthead masthead--background" />
    <div class="masthead masthead--shadows" />
  </Fragment>
)

Masthead.defaultProps = {
    // navClass: `site-nav-item`,
}

Masthead.propTypes = {
    // data: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string.isRequired,
    //         url: PropTypes.string.isRequired,
    //     }).isRequired,
    // ).isRequired,
    // navClass: PropTypes.string,
}

export default Masthead
