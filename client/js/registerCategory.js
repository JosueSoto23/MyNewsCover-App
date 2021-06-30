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
   * Generates an HTML table with tasks
   */
     function renderCourse(category) {
        window.location.href = "addCategories.html";
        document.getElementById("Category").value = category.name;
    
        const html = `<button onclick="editCategory('${category._id}')" type="button" class="btn btn-success">Edit</button>`
    
        document.getElementById('saves').innerHTML = html;
        document.getElementById("save").style.visibility = "hidden";
      }