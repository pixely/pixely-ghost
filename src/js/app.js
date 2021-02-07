import Nav from './modules/nav'
import ThemeSwitcher from './modules/theme-switcher'

// Main Menu/Theme drawer combo menu
new Nav()

new ThemeSwitcher()

// Import contact form module when required
if (document.querySelectorAll('[data-js-module="contact"]').length) {
    import(`./modules/contact`).then(function (contact) {
        contact.default.init()
    })
}