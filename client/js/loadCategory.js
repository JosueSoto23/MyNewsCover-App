const error = (e) => console.log(e.target.responseText);

function saveCategory() {
  const ajaxRequest = new XMLHttpRequest();
  ajaxRequest.addEventListener("error", error);
  ajaxRequest.open("POST", "http://localhost:3000/api/categories");
  ajaxRequest.setRequestHeader("Content-Type", "application/json");

  const data = {
      'nameCategory': document.getElementById('Category').value
  };
  const enviar = ajaxRequest.send(JSON.stringify(data));
  alert();
  redireccionar();
}

function redireccionar(){
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

if(location.toString() === "file:///C:/Users/geber/Documents/Web/MyNewsCover-App/client/crudCategories.html"){
  get();
}