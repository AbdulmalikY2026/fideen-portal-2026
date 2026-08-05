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
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let photo = document.getElementById("photo").files[0];

    if(password !== confirmPassword){
        alert("❌ Passwords do not match.");
        return;
    }

    if(!photo){
        alert("Please select a photo.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let pendingMembers =
            JSON.parse(localStorage.getItem("pendingMembers")) || [];

        pendingMembers.push({
            name: name,
            department: department,
            phone: phone,
            email: email,
            password: password,
            photo: e.target.result
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

            <button onclick="viewMember(${index})">👤 View Profile</button>

<button onclick="sendMemberWhatsApp(${index})">💬 WhatsApp</button>

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

    // Assign Member ID
    member.id = "FDN-" + String(members.length + 1).padStart(4,"0");

    // Move member to approved list
    members.push(member);
    pendingMembers.splice(index,1);

    try{

        localStorage.setItem("members", JSON.stringify(members));
        localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));

        displayPending();
        displayMembers();

        alert("✅ Member Approved Successfully!");

        // WhatsApp congratulatory message
        let phone = member.phone.replace(/^0/, "234");

        let message =
`*Assalamu Alaikum Warahmatullahi Wabarakatuh*

🎉 Congratulations *${member.name}!*

Your registration as a member of *FITHYATUD-DEENIL-ISLAMY (FIDEEN), Offa Branch* has been approved.

🆔 Member ID: ${member.id}

You can now log in to the FIDEEN Members Portal using:

👤 Member ID: ${member.id}
🔒 Password: (The password you created during registration)

Please keep your password safe and do not share it with anyone.

Welcome to the FIDEEN family.

*Allah is Our Strength.*

Signed:
Abdulmalik Yusuf
PRO, FIDEEN Offa Branch`;

        window.location.href =
        "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

    }catch(e){

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

// VIEW MEMBER PROFILE

function viewMember(index){
    
  alert("View button working");
    
    let members = JSON.parse(localStorage.getItem("members")) || [];

    let member = members[index];

    if(!member){
        alert("Member not found");
        return;
    }

    alert(
`👤 FIDEEN MEMBER PROFILE

Name: ${member.name}

Member ID: ${member.id}

Department: ${member.department}

Phone: ${member.phone}

Email: ${member.email}`
    );

}


// SEND WHATSAPP MESSAGE

function sendMemberWhatsApp(index){

    alert("WhatsApp button working");
    
    let members = JSON.parse(localStorage.getItem("members")) || [];

    let member = members[index];

    if(!member){
        alert("Member not found");
        return;
    }


    let phone = member.phone.replace(/^0/, "234");


    let message =
`Assalamu Alaikum ${member.name},

This is a message from *FITHYATUD-DEENIL-ISLAMY (FIDEEN), Offa Branch.*

We hope you are doing well.

🆔 Member ID: ${member.id}

Allah is Our Strength.`;


    window.location.href =
    "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

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
// MEMBER LOGIN
// ==========================

function memberLogin(event){

    event.preventDefault();

    let memberId = document.getElementById("loginId").value.trim();
    let password = document.getElementById("loginPassword").value;

    let members = JSON.parse(localStorage.getItem("members")) || [];

    let member = members.find(function(m){

        return m.id === memberId && m.password === password;

    });

    if(!member){

        alert("❌ Invalid Member ID or Password.");
        return;

    }

    localStorage.setItem("loggedInMember", JSON.stringify(member));

    alert("✅ Login Successful!");

    window.location.href = "member-dashboard.html";

}


// ==========================
// MEMBER LOGOUT
// ==========================

function memberLogout(){

    localStorage.removeItem("loggedInMember");

    window.location.href = "member-login.html";

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
// ADD EXECUTIVE
// ==========================

function addExecutive(event){

    event.preventDefault();

    let name = document.getElementById("executiveName").value.trim();
    let position = document.getElementById("executivePosition").value.trim();
    let phone = document.getElementById("executivePhone").value.trim();
    let photo = document.getElementById("executivePhoto").files[0];

    if(!photo){
        alert("Please select a photo.");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){

        let executives =
        JSON.parse(localStorage.getItem("executives")) || [];

        executives.push({
            name:name,
            position:position,
            phone:phone,
            photo:e.target.result
        });

        localStorage.setItem(
            "executives",
            JSON.stringify(executives)
        );

        alert("✅ Executive Added Successfully!");

        document.querySelector("form").reset();

    };

    reader.readAsDataURL(photo);

}


function displayExecutives(){

    let executiveList = document.getElementById("executiveList");

    if(!executiveList) return;

    executiveList.innerHTML = "";

    let executives = JSON.parse(localStorage.getItem("executives")) || [];

    executives.forEach(function(executive,index){

        executiveList.innerHTML += `

        <div class="card">

            <img src="${executive.photo}" width="120" height="120" style="border-radius:50%;">

            <h3>${executive.name}</h3>

            <p><strong>${executive.position}</strong></p>

            <p>${executive.phone}</p>

            <button onclick="executiveWhatsApp(${index})">💬 WhatsApp</button>

            <button onclick="editExecutive(${index})">✏ Edit</button>

            <button onclick="deleteExecutive(${index})">🗑 Delete</button>

        </div>

        `;

    });

}

function deleteExecutive(index){

    let executives = JSON.parse(localStorage.getItem("executives")) || [];

    if(confirm("Delete this executive?")){

        executives.splice(index,1);

        localStorage.setItem("executives",JSON.stringify(executives));

        displayExecutives();

    }

}

function editExecutive(index){

    let executives = JSON.parse(localStorage.getItem("executives")) || [];

    let executive = executives[index];

    let name = prompt("Full Name", executive.name);

    if(name===null) return;

    let position = prompt("Position", executive.position);

    if(position===null) return;

    let phone = prompt("Phone Number", executive.phone);

    if(phone===null) return;

    executive.name = name;

    executive.position = position;

    executive.phone = phone;

    localStorage.setItem("executives",JSON.stringify(executives));

    displayExecutives();

    alert("✅ Executive Updated");

}

function executiveWhatsApp(index){

    let executives = JSON.parse(localStorage.getItem("executives")) || [];
    let executive = executives[index];

    alert(executive.phone);

    let phone = executive.phone.replace(/\D/g,"");

    if(phone.startsWith("0")){
        phone = "234" + phone.substring(1);
    }

    alert(phone);

    window.open("https://wa.me/" + phone, "_blank");

}

// ==========================
// CAST VOTE
// ==========================

function castVote(){

    let option = document.getElementById("voteOption").value;

    if(option === ""){
        alert("Please choose an option.");
        return;
    }

    let votes = JSON.parse(localStorage.getItem("votes")) || {};

    if(votes[option]){
        votes[option]++;
    }else{
        votes[option] = 1;
    }

    localStorage.setItem("votes", JSON.stringify(votes));

    alert("✅ Vote submitted successfully!");

    displayVotes();

}


// ==========================
// DISPLAY VOTES
// ==========================

function displayVotes(){

    let voteResults = document.getElementById("voteResults");

    if(!voteResults) return;

    voteResults.innerHTML = "";

    let votes = JSON.parse(localStorage.getItem("votes")) || {};

    for(let option in votes){

        voteResults.innerHTML += `
            <p><strong>${option}</strong>: ${votes[option]} vote(s)</p>
        `;

    }

}

// ==========================
// LOAD ACTIVE VOTE
// ==========================

function loadVote(){

    let poll = JSON.parse(localStorage.getItem("activePoll"));

    if(!poll) return;

    let title = document.getElementById("voteTitle");
    let options = document.getElementById("voteOptions");

    if(!title || !options) return;

    title.innerHTML = poll.title;

    options.innerHTML = "";

    poll.options.forEach(function(option){

        options.innerHTML += `
        <label>
        <input type="radio" name="vote" value="${option}">
        ${option}
        </label><br><br>
        `;

    });

}

// ==========================
// CAST VOTE
// ==========================

function castVote(){

    let member = JSON.parse(localStorage.getItem("loggedInMember"));

    if(!member){
        alert("Please login first.");
        return;
    }

    let selected = document.querySelector('input[name="vote"]:checked');

    if(!selected){
        alert("Select one option.");
        return;
    }

    let poll = JSON.parse(localStorage.getItem("activePoll"));

    if(!poll){
        alert("No active vote.");
        return;
    }

    if(!poll.results){
        poll.results = {};
    }

    if(!poll.voters){
        poll.voters = [];
    }

    if(poll.voters.includes(member.id)){
        alert("❌ You have already voted.");
        return;
    }

    let option = selected.value;

    poll.results[option] = (poll.results[option] || 0) + 1;

    poll.voters.push(member.id);

    localStorage.setItem("activePoll", JSON.stringify(poll));

    alert("✅ Vote submitted successfully.");

}

// ==========================
// PAGE LOAD
// ==========================

window.onload = function(){

    displayMembers();
    displayPending();
    displayExecutives();
    loadMembers();
    displayAttendance();
    loadDashboardStats();
    displayVotes();
    loadVote();
    showDateTime();

};

function toggleMenu() {
    const menu = document.getElementById("menu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
