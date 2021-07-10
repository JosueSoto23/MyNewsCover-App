const error = (e) => console.log(e.target.responseText);

$(window).load(function () {
    $(".loader").fadeOut("slow");
});

function login() {
    let email = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    alert(email);
    alert(pass);
    
    let url = "http://localhost:3000/api/users";
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);

        for (let i = 0; i < userResponse.length; i++) {
            if (userResponse[i].email === email && userResponse[i].password === pass) {
                window.location.href = "dashboard.html";
            } else {
                alert("Credenciales invalidos");
            }
        }
    });

    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}
