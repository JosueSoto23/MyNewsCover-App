const error = (e) => console.log(e.target.responseText);
/**
 * Variable that gets the sessionstorage
 */
let usuario = sessionStorage.getItem("usuarioActivo");
if(usuario === null){
  window.location.href = "./index.html";
}

/**
 * Gets the logged in user and display it in the dropdown
 * @param {*} id 
 */
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
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 90px;"><img class="icon" src="Images/user_50px.png" alt="x"/>
        ${userResponse.firstName} </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <button class="dropdown-item" onclick="removeSession()"/>Logout</button>
        <a class="dropdown-item" href="dashboard.html">Dashboard</a>
        <a class="dropdown-item" href="crudNewsSources.html">News Sources</a></div>`;
    document.getElementById('dropdown').innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

/**
 * Remove the session from the sessionstorage 
 * and redirect the user to login
 */
function removeSession(){
  sessionStorage.removeItem("usuarioActivo");
    window.location.href = "./index.html";
}

/**
 * Redirect the user to crudCategories
 */
function redireccionar() {
  window.location.href = "crudCategories.html"
}

/**
 * Render categories on table
 * @param {*} Categories 
 */
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

/**
 * Delete categories by ID
 * @param {*} id 
 */
function deleteCategory(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/categories?id=${id}`);
  ajaxRequest.send();
  location.reload();
}

/**
 *  Get all categories
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
getUser(usuario);