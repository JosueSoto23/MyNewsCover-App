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
              <button onclick="get('${category._id}')" type="button" class="btn btn-success">Edit</button>
              <button onclick="deleteCategory('${category._id}')" type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>`;
            });
    html += '</table>';
    document.getElementById('tableList').innerHTML = html;
  }

  /**
   * Generates an HTML table with tasks
   */
  function renderCourse(category) {
    window.location.href = "addCategories.html";
    document.getElementById("Category").value = category.nameCategory;

    const html = `<button onclick="editCategory('${category._id}')" type="button" class="btn btn-success">Edit</button>`

    document.getElementById('saves').innerHTML = html;
    document.getElementById("save").style.visibility = "hidden";
  }

  function deleteCategory(id) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("DELETE", `http://localhost:3000/api/categories?id=${id}`);
    ajaxRequest.send();
    location.reload();
  }

  function editCategory(id) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("PUT", `http://localhost:3000/api/categories?id=${id}`);
    const data = {
      'nameCategory': document.getElementById('Category').value
    };
    console.log(data)
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    const enviar = ajaxRequest.send(JSON.stringify(data));
    console.log(enviar)
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