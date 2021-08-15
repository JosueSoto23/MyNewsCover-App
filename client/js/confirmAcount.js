const error = (e) => console.log(e.target.responseText);

function get(id) {
    let url = "http://localhost:3000/api/users";
    if (id) {
        url = `${url}?id=${id}`;
    }
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}

function editCategory(id) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("PATCH", `http://localhost:3000/api/users?id=${id}`);
    const data = {
      "enable": true
    };
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify(data));

    window.location.href = "crudCategories.html"
}