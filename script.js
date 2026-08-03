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
    let photo = document.getElementById("photo").files[0];

    if (!photo) {
        alert("Please select a photo.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {
        let members = JSON.parse(localStorage.getItem("members")) || [];

        let member = {
            name: name,
            department: department,
            phone: phone,
            email: email,
            photo: e.target.result
        };

        members.push(member);

        localStorage.setItem("members", JSON.stringify(members));

        displayMembers();

        alert("✅ Member Registered Successfully!");

        document.querySelector("form").reset();
    };

    reader.readAsDataURL(photo);
}

function displayMembers() {
    let memberList = document.getElementById("memberList");

    if (!memberList) return;

    memberList.innerHTML = "";

    let members = JSON.parse(localStorage.getItem("members")) || [];

    members.forEach(function(member) {

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${member.photo}" width="100" height="100" style="border-radius:50%;"><br><br>
            <h3>${member.name}</h3>
            <p><strong>Department:</strong> ${member.department}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Email:</strong> ${member.email}</p>
        `;

        memberList.appendChild(card);
    });
}

window.onload = function() {
    displayMembers();
};
