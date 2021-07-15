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

/**
 * Remove the session from the sessionstorage 
 * and redirect the user to login
 */
function removeSession(){
  sessionStorage.removeItem("usuarioActivo");
    window.location.href = "./index.html";
}

/**
 * Add categories
 */
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

  getUser(usuario);