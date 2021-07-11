const error = (e) => console.log(e.target.responseText);
let usuario = sessionStorage.getItem("usuarioActivo");

function get(id) {
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

function renderUser(user) {
  html += `<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      ${user.firstName}
      </button>`;
  document.getElementById('dropdownMenuButton').innerHTML = html;
}

get(usuario);