const error = (e) => console.log(e.target.responseText);
let usuario = sessionStorage.getItem("usuarioActivo");

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
        ${userResponse.firstName}
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="logica/cerrarSesion.php">Logout</a>
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

function saveCategory() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3000/api/categories");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");

  const data = {
    'nameCategory': document.getElementById('Category').value
  };
  const enviar = ajaxRequest.send(JSON.stringify(data));
  window.location.href = "crudCategories.html"
}

function redireccionar() {
  window.location.href = "crudCategories.html"
}

function renderCourses(Categories) {
  let html = `<table class="table table-responsive table-bordered">
      <tr>
        <th>Category</th>
        <th>Actions</th>
      </tr>`;
  Categories.forEach(category => {
    html += `<thead class="thead-dark">
        </thead>
        <tbody>
          <tr>
            <td>${category.nameCategory}</td>
            <td>
            <a href="editCateg.html?id=${category._id}"><button type="button" class="btn btn-success">Edit</button></a>
              <button onclick="deleteCategory('${category._id}')" type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>`;
  });
  html += '</table>';
  document.getElementById('tableList').innerHTML = html;
}

function deleteCategory(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/categories?id=${id}`);
  ajaxRequest.send();
  location.reload();
}

/**
 *  Get on or all
 */
function get(id) {
  let url = "http://localhost:3000/api/categories";
  if (id) {
    url = `${url}?id=${id}`;
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    if (id) {
      renderCourse(taskResponse);
    } else {
      renderCourses(taskResponse);
    }
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

get();
getUser();