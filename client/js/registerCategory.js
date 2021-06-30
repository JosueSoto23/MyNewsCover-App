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

function renderCourses(courses) {
    let html = `<table class="table table-responsive table-bordered">
      <tr>
        <th>Category</th>
        <th>Actions</th>
      </tr>`;
    courses.forEach(course => {
      html += `<thead class="thead-dark">
        </thead>
        <tbody>
          <tr>
            <td>${course.nameCategory}</td>
            <td>
              <button onclick="get('${course._id}')" type="button" class="btn btn-success">Edit</button>
              <button onclick="deleteCourse('${course._id}')" type="button" class="btn btn-danger">Delete</button>
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
 /* function renderCourse(course) {
    document.getElementById("title").value = course.name;
    document.getElementById("description").value = course.code;
    document.getElementById("career").value = course.career;
    document.getElementById("credits").value = course.credits;

    const html = `<button onclick="editCourse('${course._id}')" type="button" class="btn btn-success">Edit</button>`

    document.getElementById('tableList').innerHTML = html;
    document.getElementById("saveButton").style.visibility = "hidden";
  }*/

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