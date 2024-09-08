document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const department = document.getElementById('department').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsLogin = document.getElementById('terms-login').checked;

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    if (!termsLogin) {
        alert('You must accept the terms and conditions to sign in.');
    } else if (age > 30) {
        alert('You are not eligible to participate in the election.');
    } else {
        alert('Sign in successful!');
        // Here you would typically send this data to your server and proceed to the next step
    }
});
