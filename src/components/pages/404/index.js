import React from 'react'
import { Layout } from '../../common'

import Title from '../../atoms/title'
import Link from '../../atoms/link'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/

const PageNotFound = () => (
    <Layout bodyClass="tag">
        <Title className="tag__title">404: Page not found</Title>
        <p className="tag__description">Sorry, this page couldn&apos;t be found. Perhaps try returning <Link to="/">home</Link>?</p>
        <div className="tag__image" />
    </Layout>
)

export default PageNotFound
