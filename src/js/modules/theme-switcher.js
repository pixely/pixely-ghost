import GA from './ga'

class ThemeSwitcher {
    constructor() {
        this.ga = new GA
        this.themeInputs = document.querySelectorAll('.js-theme-switcher')
        const currentTheme = this.currentTheme()
        
        Array.from(this.themeInputs).forEach((input) => {
            input.addEventListener('change', () => this.setTheme(input.value))
            input.checked = (input.value === currentTheme)
        })

        this.ga.setUserProperties({ active_theme: currentTheme })
    }

    currentTheme() {
        let theme = document.documentElement.dataset.theme
        if (theme) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = 'default-dark'
            } else {
                theme = 'default-light'
            }
        }
        return theme
    }

    setTheme(id) {
        document.documentElement.dataset.theme = id
        localStorage.setItem('theme', id)
        this.ga.setUserProperties({ active_theme: id })
        this.ga.sendCustomEvent('change_theme', { theme: id })
    }
}

export default ThemeSwitcher