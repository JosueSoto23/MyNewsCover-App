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
function login() {
    let url = "http://localhost:3000/api/users";
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
    let email = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    var bAcceso = false;
    for (const i of user) {
        if (email === i.email && pass === i.password) {
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
