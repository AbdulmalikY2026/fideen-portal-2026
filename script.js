function login(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("adminLogin", "true");
        alert("✅ Login Successful!");
        window.location.href = "admin.html";
    } else {
        alert("❌ Incorrect Username or Password");
    }
}

function logout() {
    localStorage.removeItem("adminLogin");
    alert("Logged out successfully!");
    window.location.href = "login.html";
}
