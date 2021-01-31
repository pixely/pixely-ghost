import nav from './modules/nav.js'
import ThemeSwitcher from './modules/theme-switcher.js';

nav.init()

new ThemeSwitcher()

// Import contact form module when required
if (document.querySelectorAll('[data-js-module="contact"]').length) {
    import(`./modules/contact`).then(function (contact) {
        contact.default.init()
    })
}