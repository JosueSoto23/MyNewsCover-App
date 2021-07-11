let url_string = window.location.href;
let url = new URL(url_string);
let newID = url.searchParams.get("id");
console.log(newID);

const error = (e) => console.log(e.target.responseText);

function get(id) {
    let url = "http://localhost:3000/api/categories";
    if (id) {
        url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
        const category = JSON.parse(response.target.responseText);
        document.getElementById("Category").value = category.nameCategory;
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
}


function editCategory(id) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("PATCH", `http://localhost:3000/api/categories?id=${newID}`);
    const data = {
      "nameCategory": document.getElementById('Category').value
    };
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify(data));

    window.location.href = "crudCategories.html"
}

get(newID);
