const error = (e) => console.log(e.target.responseText);

/**
 * Register users
 */
function saveCourse() {
    const ajaxRequest = new XMLHttpRequest();
    ajaxRequest.addEventListener("error", error);
    ajaxRequest.open("POST", "http://localhost:3000/api/users");
    ajaxRequest.setRequestHeader("Content-Type", "application/json");

    const data = {
        'firstName': document.getElementById('FirtsName').value,
        'lastName': document.getElementById('LastName').value,
        'email': document.getElementById('Email').value,
        'password': document.getElementById('Password').value,
        'country': document.getElementById('pais').value,
        'city': document.getElementById('city').value,
        'postalCode': document.getElementById('PostalCode').value,
        'phoneNumber': document.getElementById('Phone').value,
        'role': "user",
        'enable': false
    };
    const enviar = ajaxRequest.send(JSON.stringify(data));
    window.location.href = "./index.html";
}
