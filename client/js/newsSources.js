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
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 90px;"><img class="icon" src="Images/user_50px.png" alt="x" />
        ${userResponse.firstName} </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <button class="dropdown-item" onclick="removeSession()"/>Logout</button>
        <a class="dropdown-item" href="dashboard.html">Dashboard</a>`;
    if (userResponse.role === "admin") {
      html += `<a class="dropdown-item" href="crudCategories.html">Categories</a></div>`;
    }
    document.getElementById("dropdown").innerHTML = html;
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
 * Render sources by userID
 * @param {*} sources 
 */
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
    sources.forEach((source) => {
      taskResponse.forEach((categories) => {
        if (source.userID === usuario) {
          if (source.categoryID === categories._id) {
            html += `<thead class="thead-dark">
            </thead>
            <tbody>
              <tr>
                <td>${source.nameSource}</td>
                <td id="cat">${categories.nameCategory}</td>
                <td><a href="editnews.html?id=${source._id}&idCategory=${source.categoryID}">
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
    html += "</table>";
    document.getElementById("tableList").innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

/**
 * Delete sources by ID
 * @param {*} id 
 */
function deletesource(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/newsSources?id=${id}`);
  ajaxRequest.send();
  location.reload();
}

/**
 *  Get all sources
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
 *  Get all categories
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

/**
 * Check the type of variable
 * @param {*} obj 
 * @returns 
 */
var toType = function (obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-z|A-Z]+)/)[1]
    .toLowerCase();
};

/**
 * Get news by userID 
 * @param {*} id 
 */
function getNewsDelete(id) {
  let url = "http://localhost:3000/api/news";
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    taskResponse.forEach(news => {
      if(news.user_id === usuario){
      deleteNews(news._id);
      }
    });
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

/**
 * Delete news by id
 * @param {*} id 
 */
function deleteNews(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/news?id=${id}`);
  ajaxRequest.send();
  console.log("Removing News...")
}

function deleteTags(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/tags?user_id=${id}`);
  ajaxRequest.send();
  console.log("Removing Tags...")
}

/** 
 * Remove the loading screen
*/
$(window).load(function() {
    $(".loader").fadeOut("slow");
});

/**
 * Get news sources by user ID and save news by userID
 * @param {*} id 
 */
function getNews() {
  let url = "http://localhost:3000/newss";
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}
getNewsDelete();
getUser(usuario);
getNews();
