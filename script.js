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
