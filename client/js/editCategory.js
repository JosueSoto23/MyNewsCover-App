let url_string = window.location.href;
let url = new URL(url_string);
let newID = url.searchParams.get("id");
let usuario = sessionStorage.getItem("usuarioActivo");
if(usuario === null){
  window.location.href = "./index.html";
}

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

  function removeSession(){
    sessionStorage.removeItem("usuarioActivo");
      window.location.href = "./index.html";
  }

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
getUser(usuario);
