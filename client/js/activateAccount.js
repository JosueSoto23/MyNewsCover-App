const error = (e) => console.log(e.target.responseText);

let url_string = window.location.href;
let url = new URL(url_string);
let user = url.searchParams.get("id");
console.log(user);
function editCategory() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("PATCH", `http://localhost:3000/api/sessions?id=${user}`);
    const data = {
      "enable": true
    };
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify(data));
    alert("User activated");
    window.location.href = "index.html"
}