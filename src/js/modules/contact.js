const contact = (() => {
    const selectors = {
        triggers: {
            contactForm: '.contact-form',
        },
    };
    const contactForm = document.querySelector(selectors.triggers.contactForm);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formAction = e.target.action || '/';
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => window.location.assign(formAction))
            .catch(error => alert(error));
    };

    const setEvents = () => {
        contactForm?.addEventListener('submit', handleSubmit);
    };

    const init = () => {
        setEvents();
    };

    return {
        init,
    };
})();

export default contact;