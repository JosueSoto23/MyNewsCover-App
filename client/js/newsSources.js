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
        ${userResponse.firstName} </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="index.html">Logout</a>
        <a class="dropdown-item" href="dashboard.html">Dashboard</a>`;
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

function renderSources(sources) {
  let url = "http://localhost:3000/api/categories";
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    let html = `<table class="table table-responsive table-bordered">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>`;
    sources.forEach(source => {
      taskResponse.forEach(categories => {

        if (source.userID === usuario) {
          if (source.categoryID === categories._id) {
            html += `<thead class="thead-dark">
            </thead>
            <tbody>
              <tr>
                <td>${source.nameSource}</td>
                <td id="cat">${categories.nameCategory}</td>
                <td><a href="editnews.html?id=${source._id}">
                <button type="button" class="btn btn-success">Edit</button></a>
                <button onclick="deletesource('${source._id}')" type="button" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>`;
          }
        } else {

        }
      });
    });
    html += '</table>';
    document.getElementById('tableList').innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

function deletesource(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/newsSources?id=${id}`);
  ajaxRequest.send();
  location.reload();
}

/**
 *  Get on or all
 */
function get(id) {
  let url = "http://localhost:3000/api/newsSources";
  if (id) {
    url = `${url}?id=${id}`;
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    if (id) {
      renderCourse(taskResponse);
    } else {
      renderSources(taskResponse);
    }
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

get();

/**
   *  Get on or all
   */
function getCategories(id) {
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
      renderSources(taskResponse);
    }
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

var toType = function (obj) {
  return ({}).toString.call(obj).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
}

getUser(usuario);
