/* global gtag */

class GA {
    sendCustomEvent(eventName = null, propertiesObject = {}) {
        console.log(eventName, propertiesObject)
        if (typeof eventName === 'string' && typeof gtag === 'function') {
            console.log('gtag exists')
            gtag('event', eventName, propertiesObject)
        }
    }

    setUserProperties(propertiesObject = {}) {
        console.log(propertiesObject)
        if (typeof gtag === 'function') {
            console.log('gtag exists')
            gtag('set', 'user_properties', propertiesObject)
        }
    }
}

export default GA