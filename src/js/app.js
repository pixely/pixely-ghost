import nav from './modules/nav'
import ThemeSwitcher from './modules/theme-switcher'

nav.init()

new ThemeSwitcher()

// Import contact form module when required
if (document.querySelectorAll('[data-js-module="contact"]').length) {
    import(`./modules/contact`).then(function (contact) {
        contact.default.init()
    })
}