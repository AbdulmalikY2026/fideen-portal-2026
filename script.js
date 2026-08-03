// ==========================
// LOGIN
// ==========================

function login(event){
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if(username === "admin" && password === "1234"){
        localStorage.setItem("adminLogin","true");
        alert("✅ Login Successful");
        window.location.href = "admin.html";
    }else{
        alert("❌ Incorrect Username or Password");
    }
}

function logout(){
    localStorage.removeItem("adminLogin");
    window.location.href = "login.html";
}


// ==========================
// MEMBER REGISTRATION
// ==========================

function registerMember(event){

    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let department = document.getElementById("department").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let photo = document.getElementById("photo").files[0];

    if(!photo){
        alert("Please select a photo.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let pendingMembers =
            JSON.parse(localStorage.getItem("pendingMembers")) || [];

        pendingMembers.push({
            name:name,
            department:department,
            phone:phone,
            email:email,
            photo:e.target.result
        });

        localStorage.setItem(
            "pendingMembers",
            JSON.stringify(pendingMembers)
        );

        alert("✅ Registration Submitted Successfully!\nWaiting for Admin Approval.");

        document.querySelector("form").reset();
    };

    reader.readAsDataURL(photo);
}


// ==========================
// SEARCH MEMBERS
// ==========================

function searchMembers(){

    let input = document.getElementById("searchMember");

    if(!input) return;

    let filter = input.value.toLowerCase();

    let cards = document.querySelectorAll(".card");

    cards.forEach(function(card){

        let title = card.querySelector("h3");

        if(!title) return;

        if(title.innerText.toLowerCase().includes(filter)){
            card.style.display = "";
        }else{
            card.style.display = "none";
        }

    });

          }
// ==========================
// DISPLAY MEMBERS
// ==========================

function displayMembers(){

    let memberList = document.getElementById("memberList");

    if(!memberList) return;

    memberList.innerHTML = "";

    let members = JSON.parse(localStorage.getItem("members")) || [];

    members.forEach(function(member,index){

        memberList.innerHTML += `

        <div class="card">

            <img src="${member.photo}" width="100" height="100" style="border-radius:50%;">

            <h3>${member.name}</h3>

            <p><strong>Department:</strong> ${member.department}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p><strong>Email:</strong> ${member.email}</p>

            <p><strong>Member ID:</strong> ${member.id || "Not Assigned"}</p>

            <button onclick="editMember(${index})">✏ Edit</button>

            <button onclick="deleteMember(${index})">🗑 Delete</button>

        </div>

        `;

    });

    let totalMembers = document.getElementById("totalMembers");

    if(totalMembers){
        totalMembers.innerText = members.length;
    }

}


// ==========================
// EDIT MEMBER
// ==========================

function editMember(index){

    let members = JSON.parse(localStorage.getItem("members")) || [];

    if(index < 0 || index >= members.length){
        alert("Member not found.");
        return;
    }

    let member = members[index];

    let newName = prompt("Edit Name:", member.name);
    if(newName === null) return;

    let newDepartment = prompt("Edit Department:", member.department);
    if(newDepartment === null) return;

    let newPhone = prompt("Edit Phone:", member.phone);
    if(newPhone === null) return;

    let newEmail = prompt("Edit Email:", member.email);
    if(newEmail === null) return;

    member.name = newName;
    member.department = newDepartment;
    member.phone = newPhone;
    member.email = newEmail;

    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();

    alert("✅ Member Updated Successfully!");

}


// ==========================
// DELETE MEMBER
// ==========================

function deleteMember(index){

    let members = JSON.parse(localStorage.getItem("members")) || [];

    if(index < 0 || index >= members.length){
        alert("Member not found.");
        return;
    }

    if(confirm("Delete this member?")){

        members.splice(index,1);

        localStorage.setItem("members", JSON.stringify(members));

        displayMembers();

        alert("🗑
