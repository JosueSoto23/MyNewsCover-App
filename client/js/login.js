const error = (e) => console.log(e.target.responseText);

var listUsers = new Array();

$(window).load(function () {
    $(".loader").fadeOut("slow");
});

function renderCourses() {
    let html = `<button id="button" type="submit" class="btn btn-primary" onclick="login()">Login</button>`;
    document.getElementById('button').innerHTML = html;
}

function login() {

    let url = "http://localhost:3000/api/users";

    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);
        
        var email = document.getElementById("username").value;
        var pass = document.getElementById("password").value;

        console.log(userResponse);

        /*for (let i = 0; i < userResponse.length; i++) {
            console.log(userResponse);
            if (userResponse[0].email == email && userResponse[0].password == pass) {
                window.location.href = "dashboard.html";
            } else {
                //alert("Credenciales invalidos");
            }
        }*/
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}

login();
