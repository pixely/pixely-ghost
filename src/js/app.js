import nav from './modules/nav.js'

nav.init()

// Import contact form module when required
if (document.querySelectorAll('[data-js-module="contact"]').length) {
    import(`./modules/contact`).then(function (contact) {
        contact.default.init()
    })
}