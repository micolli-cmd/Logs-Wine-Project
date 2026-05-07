document.addEventListener('DOMContentLoaded', () => {
    const homeUrl = document.body.dataset.homeUrl;  // or .getAttribute('data-home-url') — both work
    const dobInput = document.getElementById('dob');
    const enterBtn = document.getElementById('enter-btn');
    const errorMsg = document.getElementById('age-error');
    const rememberMe = document.getElementById('remember-me');

    // ────────────────────────────────────────────────
    // 1. Auto-redirect if already verified
    // ────────────────────────────────────────────────
    if (localStorage.getItem('ageVerified') === 'true') {
        window.location.href = homeUrl;
        return;  // stop further execution
    }

    // ────────────────────────────────────────────────
    // 2. Set sensible min & max on the date input
    // ────────────────────────────────────────────────
    const today = new Date();

    // Oldest allowed birth year: 1960 (as you requested)
    const minYear = 1960;
    const minDate = new Date(minYear, 0, 1);           // Jan 1, 1960
    const minDateString = minDate.toISOString().split('T')[0];

    // Youngest allowed: today (but we'll still enforce 18+ in logic)
    // Some sites set min to 18 years ago — but you want to let people select younger
    // and show error — that's fine and more user-friendly
    const maxDateString = today.toISOString().split('T')[0];

    dobInput.setAttribute('min', minDateString);
    dobInput.setAttribute('max', maxDateString);

    // Optional: placeholder to guide user
    dobInput.placeholder = "YYYY-MM-DD";

    // ────────────────────────────────────────────────
    // 3. Real-time age validation + button enable/disable
    // ────────────────────────────────────────────────
    function validateAge() {
        if (!dobInput.value) {
            enterBtn.disabled = true;
            errorMsg.style.display = 'none';
            return;
        }

        const dob = new Date(dobInput.value);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }

        if (age >= 18) {
            enterBtn.disabled = false;
            errorMsg.style.display = 'none';
        } else {
            enterBtn.disabled = true;
            errorMsg.style.display = 'block';
        }
    }

    dobInput.addEventListener('change', validateAge);
    // Optional: validate on every input (better UX on mobile)
    dobInput.addEventListener('input', validateAge);

    // Initial check (in case browser pre-fills something)
    validateAge();

    // ────────────────────────────────────────────────
    // 4. Form submission
    // ────────────────────────────────────────────────
    document.getElementById('age-gate-form').addEventListener('submit', (e) => {
        e.preventDefault();

        // Double-check (defense in depth)
        if (!enterBtn.disabled) {
            if (rememberMe.checked) {
                localStorage.setItem('ageVerified', 'true');
            }
            window.location.href = homeUrl;
        }
    });
});