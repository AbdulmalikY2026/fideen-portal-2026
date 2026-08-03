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


    members.forEach(function(member,index){


        let card = document.createElement("div");


        card.className = "card";


        card.innerHTML = `

        <img src="${member.photo}" width="100" height="100" style="border-radius:50%;">

        <h3>${member.name}</h3>

        <p><strong>Department:</strong> ${member.department}</p>

        <p><strong>Phone:</strong> ${member.phone}</p>

        <p><strong>Email:</strong> ${member.email}</p>


        <button onclick="editMember(${index})">✏ Edit</button>

        <button onclick="deleteMember(${index})">🗑 Delete</button>

        `;


        memberList.appendChild(card);


    });



    let total = document.getElementById("totalMembers");


    if(total){

        total.innerText = members.length;

    }

}




function editMember(index){


    let members = JSON.parse(localStorage.getItem("members")) || [];


    let member = members[index];


    let newName = prompt("Edit Name:", member.name);

    if(newName === null) return;


    let newDepartment = prompt("Edit Department:", member.department);

    if(newDepartment === null) return;


    let newPhone = prompt("Edit Phone:", member.phone);

    if(newPhone === null) return;


    let newEmail = prompt("Edit Email:", member.email);

    if(newEmail === null) return;



    members[index].name = newName;

    members[index].department = newDepartment;

    members[index].phone = newPhone;

    members[index].email = newEmail;



    localStorage.setItem("members", JSON.stringify(members));


    displayMembers();


    alert("✅ Member Updated Successfully!");

}





function deleteMember(index){


    let members = JSON.parse(localStorage.getItem("members")) || [];


    if(confirm("Delete this member?")){


        members.splice(index,1);


        localStorage.setItem("members", JSON.stringify(members));


        displayMembers();


        alert("🗑 Member Deleted Successfully!");

    }

}





function loadMembers(){


    let attendanceName = document.getElementById("attendanceName");


    if(!attendanceName) return;


    attendanceName.innerHTML = '<option value="">Choose Member</option>';


    let members = JSON.parse(localStorage.getItem("members")) || [];


    members.forEach(function(member){


        let option = document.createElement("option");


        option.value = member.name;


        option.textContent = member.name;


        attendanceName.appendChild(option);


    });

}





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



    localStorage.setItem("attendance",JSON.stringify(attendance));


    displayAttendance();


    alert("✅ Attendance Marked Successfully!");


    document.querySelector("form").reset();

}





function displayAttendance(){


    let attendanceList = document.getElementById("attendanceList");


    if(!attendanceList) return;


    attendanceList.innerHTML = "";


    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];


    attendance.forEach(function(record){


        let card = document.createElement("div");


        card.className="card";


        card.innerHTML=`

        <h3>${record.name}</h3>

        <p><strong>Date:</strong> ${record.date}</p>

        <p><strong>Status:</strong> ${record.status}</p>

        `;


        attendanceList.appendChild(card);


    });

}





// ATTENDANCE REPORT

function showAttendanceReport(){


    let reportList = document.getElementById("reportList");


    if(!reportList) return;



    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];



    if(attendance.length === 0){


        reportList.innerHTML = "<p>No attendance record found.</p>";

        return;

    }




    let table = `

    <table border="1" width="100%">

    <tr>

    <th>S/N</th>

    <th>Name</th>

    <th>Date</th>

    <th>Status</th>

    </tr>

    `;




    attendance.forEach(function(record,index){


        table += `

        <tr>

        <td>${index + 1}</td>

        <td>${record.name}</td>

        <td>${record.date}</td>

        <td>${record.status}</td>

        </tr>

        `;


    });



    table += "</table>";



    reportList.innerHTML = table;

}





window.onload = function(){

    displayMembers();

    loadMembers();

    displayAttendance();

    showAttendanceReport();

    loadDashboardStats();

};
function loadDashboardStats(){

    let members = JSON.parse(localStorage.getItem("members")) || [];

    let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

    let announcements = JSON.parse(localStorage.getItem("announcements")) || [];


    let totalMembers = document.getElementById("totalMembers");

    let totalAttendance = document.getElementById("totalAttendance");

    let totalAnnouncements = document.getElementById("totalAnnouncements");


    if(totalMembers){
        totalMembers.innerText = members.length;
    }


    if(totalAttendance){
        totalAttendance.innerText = attendance.length;
    }


    if(totalAnnouncements){
        totalAnnouncements.innerText = announcements.length;
    }

}
