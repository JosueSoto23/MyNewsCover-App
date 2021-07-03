const error = (e) => console.log(e.target.responseText);

function renderCourses(sources) {
    let html = `<table class="table table-responsive table-bordered">
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>`;
    sources.forEach(source => {
      html += `<thead class="thead-dark">
        </thead>
        <tbody>
          <tr>
            <td>${source.nameSource}</td>
            <td>${source.categoryID}</td>
            <a href="editCateg.html?id=${source._id}"><button type="button" class="btn btn-success">Edit</button></a>
              <button onclick="deletesource('${source._id}')" type="button" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>`;
    });
    html += '</table>';
    document.getElementById('tableList').innerHTML = html;
  }

  function deletesource(id) {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("DELETE", `http://localhost:3000/api/sources?id=${id}`);
    ajaxRequest.send();
    location.reload();
  }

  /**
   *  Get on or all
   */
  function get(id) {
    let url = "http://localhost:3000/api/newsSources";
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

    /*ajaxRequests.addEventListener("error", error);
    ajaxRequests.open("GET", url);
    ajaxRequests.setRequestHeader("Content-Type", "application/json");
    ajaxRequests.send();*/
  }

  get();

  /**
     *  Get on or all
     */
   /*function get(id) {
    let url = "http://localhost:3000/api/categories";
    if (id) {
      url = `${url}?id=${id}`;
    }
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("load", (response) => {
      const categories = JSON.parse(response.target.responseText);
      if (id) {
        renderCourse(categories);
      } else {
        renderCourses(categories);
      }
    });
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("GET", url);
    ajaxRequest.setRequestHeader("Content-Type", "application/json");
    ajaxRequest.send();
  }

  get();*/