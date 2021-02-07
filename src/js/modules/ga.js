/* global gtag */

class GA {
    sendCustomEvent(eventName = null, propertiesObject = {}) {
        if (typeof eventName === 'string' && typeof gtag === 'function') {
            gtag('event', eventName, propertiesObject)
        }
    }

    setUserProperties(propertiesObject = {}) {
        if (typeof gtag === 'function') {
            gtag('set', 'user_properties', propertiesObject)
        }
    }
}

export default GA