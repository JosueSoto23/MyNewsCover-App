const error = (e) => console.log(e.target.responseText);

/** 
 * Remove the loading screen
*/
$(window).load(function () {
    $(".loader").fadeOut("slow");
});

/**
 * Get all users
 */
function loginGet() {
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = "http://localhost:3000/api/users";
    url = `${url}?email=${email}&password=${password}`;
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);
        validarCredenciales(userResponse);
    });

    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}

function sendMessage(phoneNumber) {
    console.log(phoneNumber)
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/sendMessage");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    const data = {
        'phoneNumber': phoneNumber
    }
    ajaxRequest.send(JSON.stringify(data));
}

function login() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", saveToken);
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/userAuth");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    const data = {
        'email': document.getElementById('username').value,
        'password': document.getElementById('password').value
    }
    ajaxRequest.send(JSON.stringify(data));
}

const saveToken = (e) => {
    const data = JSON.parse(e.target.responseText);
    console.log(data.token);
    if (data) {
        sessionStorage.setItem('sessionToken', data.token);
        loginGet();
    }
};

/**
 * Validate the user's credentials and create a sessionstorage
 * @param {*} user 
 */
function validarCredenciales(user) {
    let email = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    var bAcceso = false;
    for (const i of user) {
        if (email === i.email && pass === i.password === i.enable === true) {
            sendMessage(i.phoneNumber);
            bAcceso = true;
            sessionStorage.setItem("usuarioActivo", i._id);
        }
    }
    redirecionar(bAcceso);
}

/**
 * Redirect user to dashboard if correct credentials are 
 * entered or display a message if wrong credentials were entered
 * @param {*} bAcceso 
 */
function redirecionar(bAcceso) {
    var sign = window.prompt('Enter the code we have sent you')
    if (bAcceso == true && sign.toLowerCase() == "123") {
        window.location.href = "./dashboard.html";
    } else {
        sessionStorage.removeItem("sessionToken");
        alert("Sus credenciales son invalidas")
    }
}

function loginByEmail() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/sendMailLogin");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    const data = {
        'email': document.getElementById('username').value
    }
    ajaxRequest.send(JSON.stringify(data));
    alert("The email has been sent successfully, please check your email")
}
