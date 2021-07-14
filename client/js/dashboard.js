const error = (e) => console.log(e.target.responseText);
let usuario = sessionStorage.getItem("usuarioActivo");
if(usuario === null){
  window.location.href = "./index.html";
}

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
        ${userResponse.firstName} </button>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button class="dropdown-item" onclick="removeSession()"/>Logout</button>
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

function removeSession(){
  sessionStorage.removeItem("usuarioActivo");
    window.location.href = "./index.html";
}
function renderCategory(Categories) {
  let html = `<div id = "categories">`;
  Categories.forEach(category => {
    html += `<button type='button' class='btn btn-outline-primary' href="" onclick="getNews('${category._id}')">${category.nameCategory}</button>`;
  });
  html += '</div>';
  document.getElementById('categories').innerHTML = html;
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

function getNews(filter) {
  let url = "http://localhost:3000/api/news";
  let ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const News = JSON.parse(response.target.responseText);
    let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
    News.forEach((news) => {
      if (news.user_id === usuario) {
        if (news.category_id === filter) {
          html += `<div class="col">
                    <div class="card h-100">
                        <div class="card-body">
                            <p class="card-text">${news.date}</p>
                        </div>
                        <!--<img class="card-img-top" src="" alt="Card image cap">-->
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</title></h5>
                            <h6 class="card-title">news.category_id</h6>
                            <p class="card-text">${news.short_description.slice(0, 400)}</p>
                        </div>
                        <div class="card-footer">
                            <a href="${news.permanlink}" class="card-link">Ver Noticia</a>
                        </div>
                        </div>
                    </div>`;
        } else if ("portada" === filter) {
          html += `<div class="col">
          <div class="card h-100">
              <div class="card-body">
                  <p class="card-text">${news.date}</p>
              </div>
              <!--<img class="card-img-top" src="" alt="Card image cap">-->
              <div class="card-body">
                  <h5 class="card-title">${news.title}</title></h5>
                  <h6 class="card-title">news.category_id</h6>
                  <p id="desc" class="card-text">${news.short_description.slice(0, 500)}</p>
              </div>
              <div class="card-footer">
                  <a href="${news.permanlink}" class="card-link">Ver Noticia</a>
              </div>
              </div>
          </div>`;
        }
      } else {
       // window.location.href="crudNewsSources.html";
      }
    });
    html += `</div>`;
    document.getElementById('card-columns').innerHTML = html;
  });

  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

getNews("portada");
get(usuario);
getCategories();
