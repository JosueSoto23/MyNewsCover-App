const error = (e) => console.log(e.target.responseText);

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
