class ThemeSwitcher {
    constructor() {
        this.themeInputs = document.querySelectorAll('.js-theme-switcher')
        const currentTheme = document.documentElement.dataset.theme
        
        Array.from(this.themeInputs).forEach(input => {
            input.addEventListener('change', () => this.setTheme(input.value))
            input.checked = (input.value === currentTheme)
        })
    }

    setTheme(id) {
        document.documentElement.dataset.theme = id
        localStorage.setItem("theme", id)
    }
}

export default ThemeSwitcher