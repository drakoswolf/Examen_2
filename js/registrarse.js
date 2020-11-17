function registrarse() {   
    var email = document.getElementById('email').value;    
    var password = document.getElementById('password').value;    
    var nombre = document.getElementById('nombre').value;    
    var apellido = document.getElementById('apellido').value;     

    localStorage.setItem(email, password, nombre, apellido);
    alert("Su cuenta ha sido registrada");   
    document.getElementById("registrarse").reset();
     
}
