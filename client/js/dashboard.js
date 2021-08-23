const error = (e) => console.log(e.target.responseText);

/**
 * Variable that gets the sessionstorage
 */
let usuario = sessionStorage.getItem("usuarioActivo");
if (usuario === null) {
  window.location.href = "./index.html";
}

function getToken() {
  const ajaxRequest = new XMLHttpRequest();
  //ajaxRequest.addEventListener("load", saveToken);
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3000/api/posts");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('sessionToken')}`);
}
getToken();

/**
 * Gets the logged in user and display it in the dropdown
 * @param {*} id 
 */ 
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
    document.getElementById("dropdown").innerHTML = html;
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('sessionToken')}`);
  ajaxRequest.send();
}
/**
 * Remove the session from the sessionstorage 
 * and redirect the user to login
 */
function removeSession() {
  sessionStorage.removeItem("usuarioActivo");
  window.location.href = "./index.html";
}

/**
 * Render categories into buttons
 * @param {*} Categories 
 */
function renderCategory(Categories) {
  let html = `<div id = "categories">`;
  Categories.forEach((category) => {
    html += `<button type='button' class='btn btn-outline-primary' href="" onclick="getNews('${category._id}')">${category.nameCategory}</button>`;
  });
  html += "</div>";
  document.getElementById("categories").innerHTML = html;
}

/**
 * Get all categories
 * @param {*} id 
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
      renderCategory(taskResponse);
    } else {
      renderCategory(taskResponse);
    }
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

/**
 * Render categories into buttons
 * @param {*} Categories 
 */
 function renderTags(Tags) {
  let html = `<div id = "tags">`;
  Tags.forEach((tags) => {
    html += `<button type='button' class='btn btn-outline-primary' href="" onclick="tagsFliter('${tags.name}')">${tags.name}</button>`;
  });
  html += "</div>";
  document.getElementById("tags").innerHTML = html;
}

/**
 * Get all categories
 * @param {*} id 
 */
 function getTags(id) {
  let url = "http://localhost:3000/api/tags";
  if (id) {
    url = `${url}?id=${id}`;
  }
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const taskResponse = JSON.parse(response.target.responseText);
    if (id) {
      renderTags(taskResponse);
    } else {
      
    }
  });
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("GET", url);
  ajaxRequest.setRequestHeader("Content-Type", "application/json");
  ajaxRequest.send();
}

window.onload = (function(){
  try{
      $("input").on('keyup', function(){
        let newsSearch = document.getElementById('FirtsName').value
          //var value = $(this).val().length;
            searchNews(newsSearch);
          //$("p").html(value);
      }).keyup();
  }catch(e){}});

function searchNews(value){
  let url = `http://localhost:4000/graphql`;
  let ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const news = JSON.parse(response.target.responseText);
    let News = news.data.searchNews;
    console.log(News);
    let urls = "http://localhost:3000/api/categories";
    const ajaxRequest1 = new XMLHttpRequest();
    ajaxRequest1.addEventListener("load", (response) => {
      const categories = JSON.parse(response.target.responseText);
      let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
      News.forEach((news) => {
        categories.forEach((category) => {
            if (news.category_id === category._id) {
                html += `<div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="card-text">${news.date}</p>
                            </div>
                            <!--<img class="card-img-top" src="" alt="Card image cap">-->
                            <div class="card-body">
                                <h5 class="card-title">${
                                  news.title
                                }</title></h5>
                                <h6 class="card-title">${
                                  category.nameCategory
                                }</h6>
                                <p class="card-text">${news.short_description.slice(
                                  0,
                                  500
                                )}</p>
                            </div>
                            <div class="card-footer">
                                <a href="${
                                  news.permanlink
                                }" class="card-link">Ver Noticia</a>
                            </div>
                            </div>
                        </div>`;   
            }
        });
      });
      html += `</div>`;
      document.getElementById("card-columns").innerHTML = html;
    });
    ajaxRequest1.addEventListener("error", error);
    ajaxRequest1.open("GET", urls);
    ajaxRequest1.setRequestHeader("Content-Type", "application/json");
    ajaxRequest1.send();
  });
  ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify({
        query: `{
          searchNews(user_id: "${usuario}", title: "${value}"){
            title
            short_description
            permanlink
            date
            news_source_id
            user_id
            category_id
            tags
          }
        }`
      }));
}

function tagsFliter(tags){
  let url = `http://localhost:4000/graphql`;
  let ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const news = JSON.parse(response.target.responseText);
    let News = news.data.tagsNews;
    console.log(News);
    let urls = "http://localhost:3000/api/categories";
    const ajaxRequest1 = new XMLHttpRequest();
    ajaxRequest1.addEventListener("load", (response) => {
      const categories = JSON.parse(response.target.responseText);
      let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
      News.forEach((news) => {
        categories.forEach((category) => {
            if (news.category_id === category._id) {
                html += `<div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="card-text">${news.date}</p>
                            </div>
                            <!--<img class="card-img-top" src="" alt="Card image cap">-->
                            <div class="card-body">
                                <h5 class="card-title">${
                                  news.title
                                }</title></h5>
                                <h6 class="card-title">${
                                  category.nameCategory
                                }</h6>
                                <p class="card-text">${news.short_description.slice(
                                  0,
                                  500
                                )}</p>
                            </div>
                            <div class="card-footer">
                                <a href="${
                                  news.permanlink
                                }" class="card-link">Ver Noticia</a>
                            </div>
                            </div>
                        </div>`;   
            }
        });
      });
      html += `</div>`;
      document.getElementById("card-columns").innerHTML = html;
    });
    ajaxRequest1.addEventListener("error", error);
    ajaxRequest1.open("GET", urls);
    ajaxRequest1.setRequestHeader("Content-Type", "application/json");
    ajaxRequest1.send();
  });
  ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify({
        query: `{
          tagsNews(user_id: "${usuario}", tags: "${tags}"){
            title
            short_description
            permanlink
            date
            news_source_id
            user_id
            category_id
            tags
          }
        }`
      }));
}

/**
 * Get the news of the logged-in user and filter 
 * the news by the ID of the categories
 * @param {*} filter 
 */
function getNews(filter) {
  let url = `http://localhost:4000/graphql`;
  let ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("load", (response) => {
    const news = JSON.parse(response.target.responseText);
    let News = news.data.news;
    console.log(News);
    redireccionar(News);
    let urls = "http://localhost:3000/api/categories";
    const ajaxRequest1 = new XMLHttpRequest();
    ajaxRequest1.addEventListener("load", (response) => {
      const categories = JSON.parse(response.target.responseText);
      let html = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
      News.forEach((news) => {
        categories.forEach((category) => {
            if (news.category_id === category._id) {
              if (news.category_id === filter) {
                html += `<div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <p class="card-text">${news.date}</p>
                            </div>
                            <!--<img class="card-img-top" src="" alt="Card image cap">-->
                            <div class="card-body">
                                <h5 class="card-title">${
                                  news.title
                                }</title></h5>
                                <h6 class="card-title">${
                                  category.nameCategory
                                }</h6>
                                <p class="card-text">${news.short_description.slice(
                                  0,
                                  500
                                )}</p>
                            </div>
                            <div class="card-footer">
                                <a href="${
                                  news.permanlink
                                }" class="card-link">Ver Noticia</a>
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
                      <h6 class="card-title">${category.nameCategory}</h6>
                      <p id="desc" class="card-text">${news.short_description.slice(
                        0,
                        500
                      )}</p>
                  </div>
                  <div class="card-footer">
                      <a href="${
                        news.permanlink
                      }" class="card-link">Ver Noticia</a>
                  </div>
                  </div>
              </div>`;
              }
            }
        });
      });
      html += `</div>`;
      document.getElementById("card-columns").innerHTML = html;
    });
    ajaxRequest1.addEventListener("error", error);
    ajaxRequest1.open("GET", urls);
    ajaxRequest1.setRequestHeader("Content-Type", "application/json");
    ajaxRequest1.send();
  });
  ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send(JSON.stringify({
        query: `{
          news(user_id: "${usuario}"){
            title
            short_description
            permanlink
            date
            news_source_id
            user_id
            category_id
            tags
          }
        }`
      }));
}

/**
 * Verify that the user does not have news sources and news
 * @param {*} news 
 */
function redireccionar(news){
  var bAcceso = false;
  for (const i of news) {
    if (usuario === i.user_id) {
        bAcceso = true;
    }
}
redi(bAcceso);
}

/**
 * If the user does not have a news feed and it 
 * redirects him to the news feed CRUD to add a feed
 * @param {*} bAcceso 
 */
function redi(bAcceso) {
  if (bAcceso == true) {  
  } else {
    window.location.href = "./crudNewsSources.html";
  }
}
function deletecodes(id) {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("DELETE", `http://localhost:3000/api/Code?user_id=${id}`);
  ajaxRequest.send();
}
deletecodes(usuario);
getNews("portada");
get(usuario);
getCategories();
getTags(usuario);