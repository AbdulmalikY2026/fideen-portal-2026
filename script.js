// ==========================
// LOGIN
// ==========================

function login(event){
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

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
    window.location.href="login.html";
}


// ==========================
// MEMBER REGISTRATION
// ==========================




// ==========================
// SEARCH MEMBERS
// ==========================

function searchMembers(){

    let input=document.getElementById("searchMember");

    if(!input) return;

    let filter=input.value.toLowerCase();

    let cards=document.querySelectorAll(".card");

    cards.forEach(function(card){

        let name=card.querySelector("h3");

        if(!name) return;

        if(name.innerText.toLowerCase().includes(filter)){

            card.style.display="";

        }else{

            card.style.display="none";

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

            <p><strong>Member ID:</strong> ${member.id}</p>

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

    let member = members[index];

    member.name = prompt("Edit Name", member.name);
    member.department = prompt("Edit Department", member.department);
    member.phone = prompt("Edit Phone", member.phone);
    member.email = prompt("Edit Email", member.email);

    localStorage.setItem("members", JSON.stringify(members));

    displayMembers();

    alert("✅ Member Updated Successfully");

}


// ==========================
// DELETE MEMBER
// ==========================

function deleteMember(index){

    let members = JSON.parse(localStorage.getItem("members")) || [];

    if(confirm("Delete this member?")){

        members.splice(index,1);

        localStorage.setItem("members", JSON.stringify(members));

        displayMembers();

        alert("🗑 Member Deleted");

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

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    attendance.push({
        name:name,
        date:date,
        status:"Present"
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    alert("✅ Attendance Marked Successfully");

    displayAttendance();

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

    if(document.getElementById("totalMembers")){
        document.getElementById("totalMembers").innerText = members.length;
    }

    if(document.getElementById("totalAttendance")){
        document.getElementById("totalAttendance").innerText = attendance.length;
    }

    if(document.getElementById("totalPending")){
        document.getElementById("totalPending").innerText = pendingMembers.length;
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

            <button onclick="approveMember(${index})">
                ✅ Approve
            </button>

            <button onclick="rejectMember(${index})">
                ❌ Reject
            </button>

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
        alert("Member not found.");
        return;
    }

    member.id = "FDN-" + String(members.length + 1).padStart(4,"0");

    members.push(member);

    localStorage.setItem("members", JSON.stringify(members));

    pendingMembers.splice(index,1);

    localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));

    alert(
        "🎉 Congratulations!\n\n" +
        "Your membership has been approved.\n\n" +
        "Member ID: " + member.id
    );

    displayPending();
    displayMembers();
    loadDashboardStats();

}


// ==========================
// REJECT MEMBER
// ==========================

function rejectMember(index){

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];

    if(confirm("Reject this application?")){

        pendingMembers.splice(index,1);

        localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));

        alert("Application Rejected.");

        displayPending();
        loadDashboardStats();

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
    loadMembers();
    displayAttendance();
    displayPending();
    loadDashboardStats();
    showDateTime();

};
