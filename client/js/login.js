const error = (e) => console.log(e.target.responseText);

var listUsers = new Array();

$(window).load(function () {
    $(".loader").fadeOut("slow");
});

function logins(id) {
    let url = "http://localhost:3000/api/users";
    if (id) {
        url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);
        //listUsers.push(userResponse);
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}
/*login();*/
/*console.log(listUsers);
for (let variable of listUsers[0].user) {
    console.log(variable);
}*/

function validarCredenciales(email, password) {
    var bAcceso = false;
    ///for (let i = 0; i < listUsers.length; i++) {
        console.log(listUsers[i].email);
        /*if (email == user[i].email && password == user[i].password) {
            bAcceso = true;
            alert("Bienvenido");
        }*/
    //}
    for (let variable of listUsers[0].userResponse) {
        console.log(variable);
    }
    return bAcceso;
}

function iniciarSesion() {
    var bAcceso = false;
    var email = document.getElementById('username').value;
    var password = document.getElementById("password").value;

    bAcceso = validarCredenciales(email, password);
    //  console.log(bAcceso);

    /*if (bAcceso == true) {
        window.location.href = "./dashboard.html";
    } else {
        alert("Sus credenciales son invalidas")
    }*/
}

function login(id) {
    let url = "http://localhost:3000/api/users";
    if (id) {
        url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);
        console.log(userResponse)
        for (let i = 0; i < userResponse.length; i++) {
            if (userResponse[i].email == document.getElementById('username').value
                && userResponse[i].password == document.getElementById("password").value) {
                window.location.href = "dashboard.html";
            } else {
                alert("Credenciales invalidoss");
            }
        }

    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}