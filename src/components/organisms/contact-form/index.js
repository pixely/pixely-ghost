import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby-link'
import Button from '../../atoms/button'
import Input from '../../atoms/input'
import Textarea from '../../atoms/textarea'

import './_contact-form.scss'

const encode = data => Object
    .keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&')

const ContactForm = ({ className }) => {
    const [state, setState] = useState({})

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch(error => alert(error))
    }

    return (
        <form
            name="contact"
            method="post"
            action="/contact-thanks/"
            className={`${className ? `${className} ` : ``} contact-form`}
            data-netlify="true"
            data-netlify-honeypot="bot"
            onSubmit={handleSubmit}
        >
            <Input type="hidden" name="contact-form" value="contact" />
            <div hidden>
                <label htmlFor="bot">Ignore</label>
                <Input id="bot" name="bot" onChange={handleChange} />
            </div>
            <div className="contact-form__field contact-form__field--narrow">
                <label htmlFor="name" className="contact-form__label text-s">Name</label>
                <Input id="name" name="name" onChange={handleChange} required />
            </div>
            <div className="contact-form__field contact-form__field--narrow">
                <label htmlFor="email" className="contact-form__label text-s">Email address</label>
                <Input id="email" name="email" type="email" onChange={handleChange} required />
            </div>
            <div className="contact-form__field">
                <label htmlFor="message" className="contact-form__label text-s">Message</label>
                <Textarea id="message" name="message" onChange={handleChange} required spellCheck />
            </div>
            <div className="contact-form__field contact-form__field--narrow">
                <Button type="submit">Send Message</Button>
            </div>
        </form>
    )
}

ContactForm.defaultProps = {
    className: null,
    tags: null,
}

ContactForm.propTypes = {
    className: PropTypes.string,
}

export default ContactForm
