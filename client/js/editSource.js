let url_string = window.location.href;
let url = new URL(url_string);
let newID = url.searchParams.get("id");
let usuario = sessionStorage.getItem("usuarioActivo");

const error = (e) => console.log(e.target.responseText);

function getUser(id) {
  let url = "http://localhost:3000/api/users";
  if (id) {
    url = `${url}?id=${id}`;
  }
  let ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const userResponse = JSON.parse(response.target.responseText);
    let html = "";
    html += `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 90px;"><img class="icon" src="Images/user_50px.png" alt="x" />
        ${userResponse.firstName} </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="index.html">Logout</a>
        <a class="dropdown-item" href="crudNewsSources.html">News Sources</a>`;
    if (userResponse.role === "admin") {
      html += `<a class="dropdown-item" href="crudCategories.html">Categories</a></div>`;
    }
    document.getElementById('dropdown').innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

function renderCategory(Categories) {
  let html = `<select id="category" name="category" class="form-control" data-live-search="true">`;
  Categories.forEach(category => {
    html += `<option value="${category._id}">${category.nameCategory}</option>`;
  });
  html += '</select>';
  document.getElementById('category').innerHTML = html;
}

function getCategories(id) {
  let url = "http://localhost:3000/api/categories";
  if (id) {
    url = `${url}?id=${id}`;
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    if (id) {
      renderCategory(taskResponse);
    }
    else {
      renderCategory(taskResponse);
    }

  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

function get(id) {
  let url = "http://localhost:3000/api/newsSources";
  if (id) {
    url = `${url}?id=${id}`;
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const source = JSON.parse(response.target.responseText);
    document.getElementById('url').value = source.url;
    document.getElementById('name').value = source.nameSource;
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

function editSource(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("PATCH", `http://localhost:3000/api/newsSources?id=${newID}`);
  const data = {
    'url': document.getElementById('url').value,
    'nameSource': document.getElementById('name').value,
    'categoryID': document.getElementById('category').value,
    'userID': usuario
  };
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send(JSON.stringify(data));

  window.location.href = "crudNewsSources.html"
}

getCategories();
get(newID);
getUser(usuario);
