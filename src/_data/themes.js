const tokens = require('../../.tokens/js/tokens')

module.exports = function () {
    const defaultTheme = {
        name: 'default',
        displayName: 'Device Default',
        default: true,
        properties: [],
    }
    const allThemes = Object
        .entries(tokens.color.theme)
        .map((theme) => {
            return {
                name: theme[0],
                displayName: theme[0].split('-').join(' '),
                properties: theme[1],
            }
        })

    return [
        defaultTheme,
        ...allThemes,
    ]
}