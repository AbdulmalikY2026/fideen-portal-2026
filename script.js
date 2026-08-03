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

function registerMember(event){

    event.preventDefault();

    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let photo = document.getElementById("photo").files[0];

    if(!photo){
        alert("Please choose a photo.");
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

        alert("✅ Registration submitted successfully.\nWaiting for Admin Approval.");

        document.querySelector("form").reset();

    };

    reader.readAsDataURL(photo);

}


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

    




window.addEventListener("load", displayExecutives);
function showDateTime(){

    let now = new Date();

    let date = now.toLocaleDateString();

    let time = now.toLocaleTimeString();

    let currentDate = document.getElementById("currentDate");
    let currentTime = document.getElementById("currentTime");

    if(currentDate){
        currentDate.innerHTML = "📅 " + date;
    }

    if(currentTime){
        currentTime.innerHTML = "🕒 " + time;
    }

}

setInterval(showDateTime,1000);
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



function approveMember(index){

    alert("1");

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];
    alert("2");

    let members = JSON.parse(localStorage.getItem("members")) || [];
    alert("3");

    alert("Pending members: " + pendingMembers.length);
alert("Index: " + index);

let member = pendingMembers[index];

if (!member) {
    alert("Error: Member not found.");
    return;
}

alert("4");

    member.id = "FDN-" + String(members.length + 1).padStart(4,"0");
    alert("5");

    members.push(member);
alert("6");

try {
    localStorage.setItem("members", JSON.stringify(members));
    alert("7");
} catch (e) {
    alert("ERROR: " + e.message);
}

    pendingMembers.splice(index,1);
    alert("8");

    localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));
    alert("9");

    displayPending();
    alert("10");
}


function rejectMember(index){

    let pendingMembers = JSON.parse(localStorage.getItem("pendingMembers")) || [];


    if(confirm("Reject this application?")){


        pendingMembers.splice(index,1);


        localStorage.setItem("pendingMembers", JSON.stringify(pendingMembers));


        alert("❌ Application rejected.");


        displayPending();

    }

}
