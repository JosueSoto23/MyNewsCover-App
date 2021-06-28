const error = (e) => console.log(e.target.responseText);

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
        'Address1': document.getElementById('Address').value,
        'Address2': document.getElementById('Address2').value,
        'country': document.getElementById('pais').value,
        'city': document.getElementById('city').value,
        'postalCode': document.getElementById('PostalCode').value,
        'phoneNumber': document.getElementById('Phone').value
    };
    const enviar = ajaxRequest.send(JSON.stringify(data));
}