// This is front-end only. Replace with backend/database for real security.

function signup() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const msg = document.getElementById("signup-msg");

    if (!name || !email || !password) {
        msg.textContent = "All fields are required!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("lecGPTUsers") || "[]");

    if (users.find(u => u.email === email)) {
        msg.textContent = "Email already exists!";
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("lecGPTUsers", JSON.stringify(users));
    msg.style.color = "green";
    msg.textContent = "Account created! Redirecting to login...";
    setTimeout(() => window.location.href = "login.html", 1500);
}

function login() {
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const msg = document.getElementById("login-msg");

    let users = JSON.parse(localStorage.getItem("lecGPTUsers") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        msg.style.color = "red";
        msg.textContent = "Invalid email or password!";
        return;
    }

    sessionStorage.setItem("lecGPTLoggedIn", JSON.stringify(user));
    msg.style.color = "green";
    msg.textContent = "Login successful! Redirecting to LecGPT...";
    setTimeout(() => window.location.href = "index.html", 1500);
}

// Optional: redirect if already logged in
if (window.location.pathname.includes("index.html")) {
    const loggedIn = sessionStorage.getItem("lecGPTLoggedIn");
    if (!loggedIn) window.location.href = "login.html";
}
