// Dashboard JavaScript

document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("employeeLoggedIn") === "true";
    if (!isLoggedIn) {
        // Redirect to login page if not logged in
        window.location.href = "login.html";
        return;
    }

    // Get username and display welcome message
    const username = localStorage.getItem("employeeUsername") || "User";
    const welcomeMessage = document.querySelector(".page-header p");
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome, ${username}! Here's your pharmacy overview.`;
    }

    // Handle logout
    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // Clear login status
        localStorage.removeItem("employeeLoggedIn");
        localStorage.removeItem("employeeUsername");

        // Redirect to login page
        window.location.href = "login.html";
    });

    // In a real application, this would fetch real-time data from a backend API
    // For this prototype, we're using static data displayed in the HTML
});
