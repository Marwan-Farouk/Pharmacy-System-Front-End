// Employee Login JavaScript

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // Handle form submission
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // In a real application, this would be an API call to authenticate
        // For this prototype, we'll simulate a successful login
        if (username && password) {
            // Store login status (in a real app, this would be a JWT token or similar)
            localStorage.setItem("employeeLoggedIn", "true");
            localStorage.setItem("employeeUsername", username);

            // Redirect to dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Please enter both username and password");
        }
    });

    // Handle Google login
    const googleBtn = document.querySelector(".google-btn");
    googleBtn.addEventListener("click", () => {
        // In a real application, this would integrate with Google OAuth
        // For this prototype, we'll simulate a successful login
        localStorage.setItem("employeeLoggedIn", "true");
        localStorage.setItem("employeeUsername", "google_user");

        // Redirect to dashboard
        window.location.href = "dashboard.html";
    });

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (isLoggedIn) {
        window.location.href = "dashboard.html";
    }
});
