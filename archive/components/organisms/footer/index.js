import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import GenericNav from '../../molecules/nav/genericNav'
import AuthorBio from '../../molecules/author-bio'

import './_footer.scss'

const Footer = ({ className, navItems, author }) => (
    <footer className={cn(className, 'footer')}>
        { author && <AuthorBio className="footer__bio" {...author} hideSocial box />}
        <nav className="footer__nav text">
            <GenericNav navItems={navItems} navClass="footer__nav-item" />
        </nav>
    </footer>
)

Footer.defaultProps = {
    className: null,
    author: null,
}

Footer.propTypes = {
    navItems: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    className: PropTypes.string,
    author: PropTypes.object,
}

export default Footer
