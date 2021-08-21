const error = (e) => console.log(e.target.responseText);
let url_string = window.location.href;
let url = new URL(url_string);  
let email = url.searchParams.get("email");
console.log(email)

function loginGet(email) {
    let url = "http://localhost:3000/api/userGetbyEmail";
    url = `${url}?email=${email}`;
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

/**
 * Validate the user's credentials and create a sessionstorage
 * @param {*} user 
 */
 function validarCredenciales(user) {
    var bAcceso = false;
    for (const i of user) {
        if (email === i.email) {
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
    if (bAcceso == true) {
        window.location.href = "./dashboard.html";
    } else {
        alert("Sus credenciales son invalidas")
    }
}

loginGet(email);