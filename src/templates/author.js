// import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Author from '../components/templates/author'

export default Author

// Author.propTypes = {
//     data: PropTypes.shape({
//         ghostAuthor: PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             cover_image: PropTypes.string,
//             profile_image: PropTypes.string,
//             website: PropTypes.string,
//             bio: PropTypes.string,
//             location: PropTypes.string,
//             facebook: PropTypes.string,
//             twitter: PropTypes.string,
//         }),
//         allGhostPost: PropTypes.object.isRequired,
//     }).isRequired,
//     location: PropTypes.shape({
//         pathname: PropTypes.string.isRequired,
//     }).isRequired,
//     pageContext: PropTypes.object,
// }

// export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
