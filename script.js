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
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
}

function registerMember(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;

    let memberList = document.getElementById("memberList");

    let member = document.createElement("div");
    member.className = "card";

    member.innerHTML = `
        <h3>${name}</h3>
        <p><strong>Department:</strong> ${department}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;

    memberList.appendChild(member);

    alert("✅ Member Registered Successfully!");

    document.querySelector("form").reset();
}
