document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('age-gate-form');
    const ageConfirm = document.getElementById('age-confirm');
    const rememberMe = document.getElementById('remember-me');
    const enterBtn = document.getElementById('enter-btn');
    const homeUrl = document.body.dataset.homeUrl;

    // Function to get cookie value
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Check if age is already verified via cookie
    if (getCookie('ageVerified') === 'true') {
        window.location.href = homeUrl;
    }

    // Enable/disable button based on checkbox
    ageConfirm.addEventListener('change', function() {
        enterBtn.disabled = !this.checked;
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (ageConfirm.checked) {
            if (rememberMe.checked) {
                // Set cookie to remember verification (expires in 30 days)
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30);
                document.cookie = `ageVerified=true; expires=${expiryDate.toUTCString()}; path=/`;
            }
            window.location.href = homeUrl;
        }
    });
});