document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const email = document.getElementById('email').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const terms = document.getElementById('terms').checked;

    if (terms) {
        alert('Registration successful!');
        // Here you would typically send this data to your server
    } else {
        alert('You must accept the terms and conditions to register.');
    }
});