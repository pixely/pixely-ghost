import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../atoms/link'

import './_pagination.scss'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            {previousPagePath && (
                <p className="pagination__prev">
                    <Link to={previousPagePath} rel="prev">
                        &larr; Previous
                    </Link>
                </p>
            )}
            {numberOfPages > 1 && <span className="pagination__count text-s">{humanPageNumber} of {numberOfPages}</span>}
            {nextPagePath && (
                <p className="pagination__next">
                    <Link to={nextPagePath} rel="next">
                        Next &rarr;
                    </Link>
                </p>
            )}
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
