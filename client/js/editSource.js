let url_string = window.location.href;
let url = new URL(url_string);
let newID = url.searchParams.get("id");
let name = url.searchParams.get("nameSource");
let link = url.searchParams.get("url");
let category_ID = url.searchParams.get("categoryID");
let user_id = url.searchParams.get("userID");

/*let boton = document.getElementById("boton");

document.getElementById("noticias").href = `Noticias.html?id=${idUsuario}`
document.getElementById("categorias").href = `Categorias.html?id=${idUsuario}`*/

const error = (e) => console.log(e.target.responseText);

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
    'userID': "1"
  };
  console.log(ajaxRequest.send(JSON.stringify(data)));
  console.log(data);
  //ajaxRequest.setRequestHeader("Content-Type", "application/json");
  //ajaxRequest.send(JSON.stringify(data));

  window.location.href = "../crudCategories.html"
}

getCategories();
get(newID);
