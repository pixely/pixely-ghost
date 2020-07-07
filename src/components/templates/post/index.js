import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Title from '../../atoms/title'
import Hero from '../../atoms/hero'
import PostMeta from '../../molecules/post-meta'
import AuthorBio from '../../molecules/author-bio'
import Content from '../../organisms/content'

import './_post.scss'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ post, data, location }) => (
    <>
        <MetaData
            data={data}
            location={location}
            type="article"
        />
        <Helmet>
            <style type="text/css">{`${post.codeinjection_styles}`}</style>
        </Helmet>
        <Layout bodyClass="post">
            {/* Post title */}
            <Title className="post__title">{post.title}</Title>
                    
            {/* Post Hero */}
            <div className="post__hero">
                {post.feature_image ?
                    <Hero 
                        alt={ post.title }
                        {...post.featureImageSharp?.childImageSharp?.card}
                        backgroundColor={post.featureImageSharp?.colors.muted}
                        sizes="(min-width: 575px) calc(75vw), calc(100vw - 50px)"
                    /> : 
                    null 
                }
            </div>

            {/* Post meta */}
            <div className="post__meta post__meta--cosmetic" />
            <div className="post__meta">
                <PostMeta 
                    author={post.primary_author}
                    publishDate={post.updated_at_pretty}
                    tags={post.tags}
                />
            </div>

            {/* Main post content */ }
            <Content className="post__content" html={ post.html } htmlAst={ post.childHtmlRehype?.htmlAst } />

            {/* Author bio */ }
            <div className="post__footer">
                <AuthorBio {...post.primary_author} />
            </div>
                    
        </Layout>
    </>
)

Post.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featureImageSharp: PropTypes.object,
        primary_author: PropTypes.object.isRequired,
        updated_at_pretty: PropTypes.string.isRequired,
        html: PropTypes.string.isRequired,
        childHtmlRehype: PropTypes.object,
        tags: PropTypes.array,
        codeinjection_styles: PropTypes.string,
    }).isRequired,
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post
