document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('supportForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent page reload

            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (name === '' || email === '' || message === '') {
                alert('Please fill in all fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate successful sending
            alert(`Thanks for reaching out, ${name}! We've received your message and will get back to you at ${email} within 24 hours.`);
            
            // Optionally reset form
            form.reset();
        });
    }

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});