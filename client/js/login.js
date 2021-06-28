const error = (e) => console.log(e.target.responseText);

function login(id) {
    let url = "http://localhost:3000/api/users";
    if (id) {
        url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const userResponse = JSON.parse(response.target.responseText);
        for (let i = 0; i < userResponse.length; i++) {
            if (userResponse[i].email === document.getElementById('username').value
                && userResponse[i].password === document.getElementById("password").value) {
                window.location.href = "registro.html";
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
