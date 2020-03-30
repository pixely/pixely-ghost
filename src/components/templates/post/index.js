import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../../common'
import { MetaData } from '../../common/meta'

import Title from '../../atoms/title';
import Hero from '../../atoms/hero';
import PostMeta from '../../molecules/post-meta';
import Content from '../../organisms/content';
import Author from '../../molecules/author';

import './_post.scss';

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost

    return (
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
                                src={ post.feature_image }
                                alt={ post.title }
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
                    <Content className="post__content" html={ post.html } />
                    
                    {/* Author bio */ }
                    <div className="post__footer">
                        <Author {...post.primary_author} />
                    </div>

                    {/* {console.log(post)} */}
                    
                </Layout>
            </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post;
