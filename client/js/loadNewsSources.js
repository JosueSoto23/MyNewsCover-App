const error = (e) => console.log(e.target.responseText);

function saveSources() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/newssourcesController");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
  
    const data = {
        'url': document.getElementById('url').value,
        'nameCategory': document.getElementById('name').value,
        'categoryID': document.getElementById('Category').value
    };
    const enviar = ajaxRequest.send(JSON.stringify(data));
    alert(data.url);
    redireccionar();
  }
  
  function redireccionar(){
      window.location.href = "crudCategories.html"
  }
  
  function renderCourses(Categories) {
      let html = `<select id="category" name="category" class="form-control" data-live-search="true">`;
      Categories.forEach(category => {
        html += `<option value="${category._id}">${category.nameCategory}</option>`;
              });
      html += '</select>';
      document.getElementById('category').innerHTML = html;
    }
  
    function deleteSources(id) {
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
  
    get();