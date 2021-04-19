function validar() {
  //obteniendo el valor que se puso en campo text del formulario
  campoNombre = document.getElementById("name").value;
  campoEmail = document.getElementById("email").value;
  campoAsunto = document.getElementById("subject").value;
  campoMensaje = document.getElementById("message").value;
  //la condición
  if (campoNombre.length == 0) {
    alert("¡Rellene todos los campos!");
    return false;
  } else if (campoEmail.length == 0) {
    alert("¡Rellene todos los campos!");
    return false;
  } else if (campoAsunto.length == 0) {
    alert("¡Rellene todos los campos!");
    return false;
  } else if (campoMensaje.length == 0) {
    alert("¡Rellene todos los campos!");
    return false;
  } else {
    return true;
  }
}
