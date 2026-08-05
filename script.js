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

        alert("🗑 Member Deleted Successfully!");

    }
}

              // ==========================
// PENDING APPLICATIONS
// ==========================

function displayPending(){

    let pendingList = document.getElementById("pendingList");

    if(!pendingList) return;

    pendingList.innerHTML = "";

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];

    if(pendingMembers.length === 0){
        pendingList.innerHTML = "<p>No pending applications.</p>";
        return;
    }

    pendingMembers.forEach(function(member,index){

        pendingList.innerHTML += `

        <div class="card">

            <img src="${member.photo}" width="100" height="100" style="border-radius:50%;">

            <h3>${member.name}</h3>

            <p><strong>Department:</strong> ${member.department}</p>

            <p><strong>Phone:</strong> ${member.phone}</p>

            <p><strong>Email:</strong> ${member.email}</p>

            <button onclick="approveMember(${index})">✅ Approve</button>

            <button onclick="rejectMember(${index})">❌ Reject</button>

        </div>

        `;

    });

}


// ==========================
// APPROVE MEMBER
// ==========================

function approveMember(index){

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];
    let members = JSON.parse(localStorage.getItem("members")) || [];

    let member = pendingMembers[index];

    if(!member){
        alert("Member not found");
        return;
    }

    // Give the member an ID
    member.id = "FDN-" + String(members.length + 1).padStart(4,"0");

    // Move member to approved list
    members.push(member);
    pendingMembers.splice(index,1);

    try {

        localStorage.setItem("members", JSON.stringify(members));
        localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));

        displayPending();
        displayMembers();

        alert("✅ Member Approved Successfully!");

        // WhatsApp congratulatory message
        let phone = member.phone.replace(/^0/, "234");

        let message =
`Assalamu Alaikum ${member.name},

🎉 Congratulations!

Your registration as a member of *FITHYATUD-DEENIL-ISLAMY (FIDEEN), Offa Branch* has been approved.

🆔 Member ID: ${member.id}

We warmly welcome you to the FIDEEN family.

May Allah bless you and grant you the strength to serve Islam sincerely.

*Allah is Our Strength.*`;

        window.open(
            "https://wa.me/" + phone + "?text=" + encodeURIComponent(message),
            "_blank"
        );

    } catch (e) {

        alert("Error: " + e.message);

    }
}


// ==========================
// REJECT MEMBER
// ==========================

function rejectMember(index){

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];

    if(index < 0 || index >= pendingMembers.length){
        alert("❌ Member not found.");
        return;
    }

    if(confirm("Reject this application?")){

        pendingMembers.splice(index,1);

        localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));

        displayPending();
        loadDashboardStats();

        alert("❌ Application Rejected.");

    }

    }

    // ==========================
// LOAD MEMBERS INTO ATTENDANCE
// ==========================

function loadMembers(){

    let attendanceName = document.getElementById("attendanceName");

    if(!attendanceName) return;

    attendanceName.innerHTML = '<option value="">Choose Member</option>';

    let members = JSON.parse(localStorage.getItem("members")) || [];

    members.forEach(function(member){

        attendanceName.innerHTML += `
            <option value="${member.name}">
                ${member.name}
            </option>
        `;

    });

}


// ==========================
// MARK ATTENDANCE
// ==========================

function markAttendance(event){

    event.preventDefault();

    let name = document.getElementById("attendanceName").value;
    let date = document.getElementById("attendanceDate").value;

    if(name === ""){
        alert("Please choose a member.");
        return;
    }

    if(date === ""){
        alert("Please select a date.");
        return;
    }

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    attendance.push({
        name: name,
        date: date,
        status: "Present"
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    displayAttendance();
    loadDashboardStats();

    alert("✅ Attendance Marked Successfully!");

    document.querySelector("form").reset();

}


// ==========================
// DISPLAY ATTENDANCE
// ==========================

function displayAttendance(){

    let attendanceList = document.getElementById("attendanceList");

    if(!attendanceList) return;

    attendanceList.innerHTML = "";

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    attendance.forEach(function(record){

        attendanceList.innerHTML += `

        <div class="card">

            <h3>${record.name}</h3>

            <p><strong>Date:</strong> ${record.date}</p>

            <p><strong>Status:</strong> ${record.status}</p>

        </div>

        `;

    });

        }

    // ==========================
// DASHBOARD STATISTICS
// ==========================

function loadDashboardStats(){

    let members = JSON.parse(localStorage.getItem("members")) || [];
    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];
    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];

    let totalMembers = document.getElementById("totalMembers");
    let totalAttendance = document.getElementById("totalAttendance");
    let totalPending = document.getElementById("totalPending");

    if(totalMembers){
        totalMembers.innerText = members.length;
    }

    if(totalAttendance){
        totalAttendance.innerText = attendance.length;
    }

    if(totalPending){
        totalPending.innerText = pendingMembers.length;
    }

}


// ==========================
// DATE & TIME
// ==========================

function showDateTime(){

    let now = new Date();

    let currentDate = document.getElementById("currentDate");
    let currentTime = document.getElementById("currentTime");

    if(currentDate){
        currentDate.innerHTML = "📅 " + now.toLocaleDateString();
    }

    if(currentTime){
        currentTime.innerHTML = "🕒 " + now.toLocaleTimeString();
    }

}

setInterval(showDateTime,1000);


// ==========================
// PAGE LOAD
// ==========================

window.onload = function(){

    displayMembers();
    displayPending();
    loadMembers();
    displayAttendance();
    loadDashboardStats();
    showDateTime();

};
