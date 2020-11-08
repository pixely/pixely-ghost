import React from 'react'
import PropTypes from 'prop-types'
import rehypeReact from 'rehype-react'
import ImgSharpInline from './contentImage'
import cn from 'classnames'

import ContactForm from '../../organisms/contact-form'

import './_content.scss'

const renderAst = new rehypeReact({
    Fragment: React.Fragment,
    createElement: React.createElement,
    components: { 
        'img-sharp-inline': ImgSharpInline,
        'contact-form': ContactForm,
    },
}).Compiler

const Content = ({ html, htmlAst, className }) => {
    const htmlProp = !htmlAst && { dangerouslySetInnerHTML: { __html: html } }
    return (
        <section
            className={cn(className, 'content')}
            { ...htmlProp }
        >
            { htmlAst && renderAst(htmlAst) }
        </section>
    )
}

Content.defaultProps = {
    className: null,
    htmlAst: null,
}

Content.propTypes = {
    className: PropTypes.string,
    html: PropTypes.string.isRequired,
    htmlAst: PropTypes.object,
}

export default Content
