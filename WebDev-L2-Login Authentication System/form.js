async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}

const regButton = document.getElementById("regButton");

if (regButton) {
    regButton.addEventListener("click", registerUser);
}

function registerUser() {

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const cPassword =
        document.getElementById("cPassword").value;

    // Empty fields
    if (!username || !email || !password || !cPassword) {
        alert("Please fill all fields");
        return;
    }

    // Password match
    if (password !== cPassword) {
        alert("Passwords do not match");
        return;
    }

    // Password validation
    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(password)) {
        alert(
            "Password must contain:\n" +
            "- At least 8 characters\n" +
            "- One uppercase letter\n" +
            "- One lowercase letter\n" +
            "- One number"
        );
        return;
    }

    // Existing users
    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
        user =>
            user.username === username ||
            user.email === email
    );

    if (existingUser) {
        alert("Username or Email already exists");
        return;
    }

    // Create user
    const newUser = {
        username,
        email,
        password
    };

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    // Auto login after registration
    sessionStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
    );

    // alert("Registration Successful");

    window.location.href = "dashboard.html";
}



// =========================
// LOGIN
// =========================

const loginBtn =
    document.getElementById("loginBtn");

if (loginBtn) {
    loginBtn.addEventListener("click", loginUser);
}

function loginUser() {

    const username =
        document.getElementById("loginUser").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
        user =>
            (user.username === username ||
                user.email === username) &&
            user.password === password
    );

    if (!foundUser) {
        alert("Invalid credentials");
        return;
    }

    sessionStorage.setItem(
        "currentUser",
        JSON.stringify(foundUser)
    );

    // alert("Login Successful");

    window.location.href = "dashboard.html";
}



// =========================
// DASHBOARD PROTECTION
// =========================

if (window.location.pathname.includes("dashboard.html")) {

    const currentUser =
        JSON.parse(
            sessionStorage.getItem("currentUser")
        );

    if (!currentUser) {
        window.location.href = "login.html";
    }

    const welcome =
        document.getElementById("welcome");

    if (welcome) {
        welcome.textContent =
            `Welcome ${currentUser.username}`;
    }
    const profName =
        document.getElementById("profName");

    if (profName) {
        profName.textContent = currentUser.username;
    }
    const profEmail =
        document.getElementById("profEmail");

    if (profEmail) {
        profEmail.textContent = currentUser.email;
    }
}



// =========================
// LOGOUT
// =========================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem("currentUser");

        window.location.href = "register.html";
    });
}



// =========================
// DELETE ACCOUNT
// =========================

const deleteBtn = document.getElementById("deleteBtn");

if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {

        const currentUser =
            JSON.parse(sessionStorage.getItem("currentUser"));

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        users = users.filter(user =>
            user.email !== currentUser.email
        );

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        sessionStorage.removeItem("currentUser");

        alert("Account Deleted");

        window.location.href = "register.html";
    });
}