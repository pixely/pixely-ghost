const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formAction = e.target.action || "/";
    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(() => window.location.assign(formAction))
    .catch(error => alert(error))
}

document.querySelector(".contact-form")?.addEventListener("submit", handleSubmit);