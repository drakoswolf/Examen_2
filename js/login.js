function login() {
    var userEmail = document.getElementById('email').value;
    var userPassword = document.getElementById('password').value;
    if(!localStorage.hasOwnProperty(userEmail)) {
        alert("Cuenta no registrada");
    } else if(localStorage.getItem(userEmail) == userPassword) {
        alert("Ha ingresado usuario " + userEmail);
        location.href = 'principal.html';
    } else {
        alert("Contraseña equivocada");
    }     
}